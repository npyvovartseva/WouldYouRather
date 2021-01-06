import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handelInitialData } from '../actions/shared';
import Home from './Home';


class App extends Component {

  componentDidMount() {
    this.props.dispatch(handelInitialData());
  }

  render() {
    return (
      <div>
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
