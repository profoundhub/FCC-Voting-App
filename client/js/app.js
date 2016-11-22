import React from 'react';
import { render } from 'react-dom';

// Render the main component into the dom
const rootId = document.getElementById('main');

// ReactDOM.render(<App />, rootId);
// render(<p>Hello App User: React Works!</p>, rootId);
render(<div>Hello App User: React Works!</div>, document.getElementById('main'));
