import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from 'react-redux-loading-bar';
import { handelInitialData } from '../actions/shared';
import Home from './Home';


class App extends Component {

  componentDidMount() {
    this.props.dispatch(handelInitialData());
  }

  render() {
    return (
      <div>
        <Loading />
        {this.props.authedUser ?
          null :
          <Home />
        }

      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return { loading: authedUser === null }
}

export default connect(mapStateToProps)(App);
