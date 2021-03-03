import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Nav from './Nav';
import Home from './Home';
import NewQuestion from './NewQuestion';
import LeadersBoard from './LeadersBoard';
import Question from './Question';
import QuestionAnswers from './QuestionAnswers';
import NoMatch from './NoMatch';

export class Protected extends Component {
    render() {
        return (
            <>
                <Nav />
                <Grid container>
                    <Grid item xs sm></Grid>
                    <Grid item xs={10} sm={4}>
                        <Switch>
                            <Route exact path='/'>
                                <Home />
                            </Route>
                            <Route path='/leaders'>
                                <LeadersBoard />
                            </Route>
                            <Route path='/new'>
                                <NewQuestion />
                            </Route>
                            <Route path='/questions/:id' exact>
                                <Question />
                            </Route>
                            <Route path='/questions/:id/voting' >
                                <QuestionAnswers />
                            </Route>
                            <Route path='*'>
                                <NoMatch />
                            </Route>
                        </Switch>
                    </Grid>
                    <Grid item xs sm></Grid>
                </Grid>
            </>
        )
    }
}

export default Protected;
