import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import middleware from './middleware';
import CssBaseline from "@material-ui/core/CssBaseline";
import './index.css';
import App from './components/App';

const store = createStore(reducers, middleware);
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <CssBaseline />
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);


