import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import middleware from './middleware';
import './index.css';
import App from './components/App';

const store = createStore(reducers, middleware);
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);


