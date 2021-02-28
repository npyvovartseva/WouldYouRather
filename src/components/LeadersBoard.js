import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatUserStats } from '../utils/helpers';
import { Paper, Box } from '@material-ui/core';
import Leader from './Leader';

export class LeadersBoard extends Component {

    render() {
        let leaders = Object.values(this.props.users)
            .map(user => formatUserStats(user, this.props.authedUser))
            .sort((a, b) => b.total - a.total)
            .map(user => (
                <Leader user={user} key={user.id} />
            ));

        return (
            <Paper square>
                <Box p={1}>
                    {leaders}
                </Box>
            </Paper >
        )
    }
}

const mapStateToProps = ({ authedUser, users }) => {
    return {
        users,
        authedUser
    }
};

export default connect(mapStateToProps)(LeadersBoard);
