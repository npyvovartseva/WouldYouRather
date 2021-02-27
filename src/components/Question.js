import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { handleAnswerQuestion } from '../actions/questions';
import { formatQuestion, getBaseURL } from '../utils/helpers';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const styles = (theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid black'
    },
    body: {
        display: 'flex',
        flexDirection: 'row'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    avatar: {
        paddingLeft: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10)
    }
});

class Question extends Component {
    state = {
        toHome: false,
        answer: ''

    };

    handleChange = (e) => {
        this.setState({ answer: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { dispatch, question } = this.props;
        const { answer } = this.state;

        dispatch(handleAnswerQuestion(question.id, answer));

        this.setState({ toHome: true })

    }
    render() {
        const { question } = this.props;
        const { classes } = this.props;
        const { toHome } = this.state;
        const basePath = getBaseURL();

        if (!question) {
            return <p>This question does not exist</p>
        }
        if (toHome) {
            return <Redirect to={`/questions/${question.id}/voting`} />
        }
        return (
            <Box m={1}>
                <Card className={classes.root} elevation={0}>
                    <div className={classes.body}>
                        <div className={classes.avatar}>
                            <Avatar variant='square' className={classes.large} src={`${basePath}/${question.avatar}`}></Avatar>
                        </div>
                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                <Typography component='h6' variant='h6'>
                                    {question.name} asks:
                                </Typography>
                                <Typography component='div' variant='body1'>
                                    Would you rather
                                </Typography>
                                <FormControl component="fieldset">
                                    <RadioGroup aria-label="options" name="options" >
                                        <FormControlLabel value="optionOne" control={<Radio />} label={question.optionOne.text} onChange={this.handleChange} />
                                        <FormControlLabel value="optionTwo" control={<Radio />} label={question.optionTwo.text} onChange={this.handleChange} />
                                    </RadioGroup>
                                </FormControl>
                                <CardActions disableSpacing>
                                    <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                                        Submit
                        </Button>
                                </CardActions>
                            </CardContent>
                        </div>
                    </div>
                </Card>
            </Box>
        )
    }
}

const mapStateToProps = ({ questions, users }, props) => {
    const { id } = props.match.params;
    const question = questions[id];
    return {
        question: question ? formatQuestion(question, users[question.author]) : null
    }
}

const QuestionStyled = withStyles(styles)(Question);
const Connected = connect(mapStateToProps)(QuestionStyled);

export default withRouter(Connected);