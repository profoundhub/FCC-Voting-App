import React from 'react';
import { render } from 'react-dom';

import App     from './components/App';
import Header   from './components/Header';
import Single   from './components/Single';
import QuizGrid from './components/QuizGrid';
import Footer   from './components/Footer';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import storage, { history } from './storage';
import { Provider } from 'react-redux';

const rootId = document.getElementById('app');

const router = (
  <Provider store={ storage }>
    <Router history={ history }>
        <Route path="/" component={ App }>
            <IndexRoute component={ QuizGrid }></IndexRoute>
            <Route path="/view/:postId" component={ Single }></Route>
        </Route>
    </Router>
  </Provider>
)

render(router, rootId);
