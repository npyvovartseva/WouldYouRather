import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestionShort } from '../utils/helpers';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

const styles = (theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
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
        padding: theme.spacing(1),
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
    render() {
        const { question } = this.props;
        const { classes } = this.props;
        const basePath = process.env.PUBLIC_URL

        if (!question) {
            return <p>This question does not exist</p>
        }
        return (
            <Card className={classes.root} elevation={1}>
                <CardHeader
                    title={`${question.name} asks:`}
                />
                <div className={classes.body}>

                    <div className={classes.avatar}>
                        <Avatar variant="square" className={classes.large} src={`${basePath}/${question.avatar}`}></Avatar>
                    </div>
                    
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography variant="h6" color="textSecondary" component="p">
                                Would you rather
                        </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                ...{question.text}...
                        </Typography>
                            <CardActions disableSpacing>
                                <Button variant="contained" color="primary">
                                    View Poll
                        </Button>
                            </CardActions>
                        </CardContent>
                    </div>
                </div>
            </Card>
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

const QuestionStyled = withStyles(styles)(Question)

export default connect(mapStateToProps)(QuestionStyled)
