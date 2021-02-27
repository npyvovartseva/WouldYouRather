import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab, Paper, Box } from "@material-ui/core";

import QuestionThumbnail from './QuestionThumbnail';
import { getAnsweredQuestions } from '../utils/helpers';
import { getUnansweredQuestions } from '../utils/helpers';

class Home extends React.Component {

    state = {
        selectedTab: 0
    }

    tabNameToIndex = {
        0: "unanswered",
        1: "unswered"
    };

    indexToTabName = {
        unanswered: 0,
        answered: 1
    };

    handleChange = (event, newValue) => {
        //history.push(`/home/${tabNameToIndex[newValue]}`);
        this.setState({ selectedTab: newValue });
    };

    render() {
        return (
            <>
                <Paper square>
                    <Box p={1}>

                        <Tabs
                            value={this.state.selectedTab}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary">

                            <Tab label="Unanswered" />
                            <Tab label="Unswered" />

                        </Tabs>
                        {this.state.selectedTab === 0 &&
                            this.props.questionsUnansweredIds.map(id => (
                                <QuestionThumbnail key={id} id={id} answered='no' />
                            ))
                        }
                        {this.state.selectedTab === 1 &&
                            this.props.questionsAnsweredIds.map(id => (
                                <QuestionThumbnail key={id} id={id} answered='yes'/>
                            ))
                        }
                    </Box>
                </Paper>
            </>
        )
    }
}

function mapStateToProps({ questions, users, authedUser }) {
    const questionsAnswered = getAnsweredQuestions(questions, users, authedUser);
    const questionsUnanswered = getUnansweredQuestions(questions, users, authedUser);

    return {
        questionsAnsweredIds: Object.keys(questionsAnswered).sort((a, b) => questions[a].timestamp - questions[b].timestamp),
        questionsUnansweredIds: Object.keys(questionsUnanswered).sort((a, b) => questions[a].timestamp - questions[b].timestamp)
    }
}

export default connect(mapStateToProps)(Home)