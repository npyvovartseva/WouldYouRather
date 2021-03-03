import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom'
import Loading from 'react-redux-loading-bar';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { handelInitialData } from '../actions/shared';

import Login from './Login';
import Protected from './Protected';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#263238',
    }
  }
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
          <Switch>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path="/">
              {!this.props.authedUser ? <Redirect push to='/login' /> : <Protected />}
            </Route>
          </Switch>
        </div>
      </ThemeProvider>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    loading: authedUser === null,
    authedUser: authedUser,
    users: users
  }
}

export default connect(mapStateToProps)(App);
