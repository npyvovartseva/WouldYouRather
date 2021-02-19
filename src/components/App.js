import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import Loading from 'react-redux-loading-bar';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { handelInitialData } from '../actions/shared';

import Nav from './Nav';
import Home from './Home';
import NewQuestion from './NewQuestion';
import Question from './Question';



const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#263238',
    },
    secondary: {
      main: '#263238',
    }
  },
});

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handelInitialData());
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Loading />
          <Nav />
          {this.props.authedUser ?
            null :
            <Grid container>
              <Grid item xs sm></Grid>
              <Grid item xs={10} sm={4}>

                <Switch>
                  <Route exact path='/'>
                    <Home />
                  </Route>
                  <Route path='/leaders'>
                    <Question />
                  </Route>
                  <Route path='/new'>
                    <NewQuestion />
                  </Route>
                </Switch>

              </Grid>
              <Grid item xs sm></Grid>
            </Grid>
          }

        </div>
      </ThemeProvider>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return { loading: authedUser === null }
}

export default connect(mapStateToProps)(App);
