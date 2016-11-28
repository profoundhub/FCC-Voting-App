import React from 'react';
import { render } from 'react-dom';

import Main     from './components/Main';
import Header   from './components/Header';
import Single   from './components/Single';
import QuizGrid from './components/QuizGrid';
import Footer   from './components/Footer';

import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import storage, { history } from './storage';
import { Provider } from 'react-redux';

const router = (
  <Provider store = { storage }>
    <Router history = { history }>
        <Route path = "/client" component={ Main }>
            <IndexRoute component = { QuizGrid }></IndexRoute>
            <Route path = "/view/:postId" component={ Single }></Route>
        </Route>
    </Router>
  </Provider>
)

// Render the main component into the dom
const rootId = document.getElementById('app');
render(router, rootId);
