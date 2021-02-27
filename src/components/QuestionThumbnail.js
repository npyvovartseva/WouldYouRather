import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { formatQuestionShort, getBaseURL } from '../utils/helpers';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

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

class QuestionThumbnail extends Component {
    handleButtonClick = id => {
        const pageURL = `/questions/${id}` + (this.props.answered === 'yes' ? '/voting':'');
        this.props.history.push(pageURL);
    };
    render() {
        const { question } = this.props;
        const { classes } = this.props;
        const basePath = getBaseURL();

        if (!question) {
            return <p>This question does not exist</p>
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
                                <Typography component='div' variant='body1' >
                                    ...{question.text}...
                                </Typography>
                                <CardActions disableSpacing>
                                    <Button variant="contained" color="primary" onClick={() => this.handleButtonClick(question.id)}>
                                        View Poll
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

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
    const question = questions[id];

    return {
        authedUser,
        question: question ? formatQuestionShort(question, users[question.author]) : null
    }
}

const QuestionStyled = withStyles(styles)(QuestionThumbnail);
const Connected = connect(mapStateToProps)(QuestionStyled);

export default withRouter(Connected);
