import { createStore, compose } from 'redux';
import { syncHistoryWithStore} from 'react-router-redux';
import { browserHistory } from 'react-router';
import rootReducer from './reducers/index';

import comments from './data/comments';
import posts from './data/posts';

const defaultState = {
    posts,
    comments
};

const storage = createStore( rootReducer, defaultState );

export const history = syncHistoryWithStore( browserHistory, storage );

export default storage;
