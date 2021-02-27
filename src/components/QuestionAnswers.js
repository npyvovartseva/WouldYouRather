import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { formatQuestion, getBaseURL } from '../utils/helpers';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress';


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
    caption: {
        textAlign: 'center'
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

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 20,
        borderRadius: 5
    },
    colorPrimary: {
        backgroundColor:
            theme.palette.grey[theme.palette.type === "light" ? 200 : 700]
    },
    bar: {
        borderRadius: 5,
        backgroundColor: "#1a90ff"
    }
}))(LinearProgress);

class QuestionAnswers extends Component {
    getRange = (totalVotes, votes) => {
        return 100 - 100 * (totalVotes - votes) / totalVotes;
    }

    getAuthUserVote = () => {
        return this.props.question.optionOne.votes.includes(this.props.authedUser)
    }

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
                                    Asked by {question.name}
                                </Typography>
                                <Typography component='h6' variant='h6'>
                                    Results:
                                    </Typography>
                                <Box mt={1} mb={1}>
                                    {this.getAuthUserVote()
                                        ? <Typography component='div' variant='body1'>
                                            Your vote:
                                    </Typography>
                                        : null}
                                    <Typography component='div' variant='body1'>
                                        Would you rather {question.optionOne.text}?
                                    </Typography>
                                    <div>
                                        <BorderLinearProgress variant="determinate" value={this.getRange(question.totalVotes, question.optionOne.votes.length)} />
                                    </div>
                                    <Typography component='div' variant='caption' className={classes.caption}>
                                        {question.optionOne.votes.length} out of {question.totalVotes} votes
                                    </Typography>
                                </Box>
                                <Box mb={1} mt={1}>
                                    {!this.getAuthUserVote()
                                        ? <Typography component='div' variant='body1'>
                                            Your vote:
                                    </Typography>
                                        : null
                                    }
                                    <Typography component='div' variant='body1'>
                                        Would you rather {question.optionTwo.text}?
                                    </Typography>
                                    <div>
                                        <BorderLinearProgress variant="determinate" value={this.getRange(question.totalVotes, question.optionTwo.votes.length)} />
                                    </div>
                                    <Typography component='div' variant='caption' className={classes.caption}>
                                        {question.optionTwo.votes.length} out of {question.totalVotes} votes
                                    </Typography>
                                </Box>
                            </CardContent>
                        </div>
                    </div>
                </Card>
            </Box>
        )
    }
}

const mapStateToProps = ({ questions, users, authedUser }, props) => {
    const { id } = props.match.params;
    const question = questions[id];
    return {
        question: question ? formatQuestion(question, users[question.author]) : null,
        authedUser: authedUser ? authedUser : null

    }
}

const QuestionStyled = withStyles(styles)(QuestionAnswers);
const Connected = connect(mapStateToProps)(QuestionStyled);

export default withRouter(Connected);
