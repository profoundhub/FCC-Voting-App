import React from 'react';
import { render } from 'react-dom';

import App from './components/Main';
import Quiz from './components/Quiz';

// Render the main component into the dom
const rootId = document.getElementById('app');
render(<Quiz />, rootId);
