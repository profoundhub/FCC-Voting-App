import React from 'react';
import { render } from 'react-dom';

import App from './components/main';

// Render the main component into the dom
const rootId = document.getElementById('app');
render(<App />, rootId);
