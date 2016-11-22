import React from 'react';
import { render } from 'react-dom';

import Main from './components/Main';
import QuizGrid from './components/QuizGrid';
import Header from './components/Header';
import Footer from './components/Footer';


// Render the main component into the dom
const rootId = document.getElementById('app');
render(<Main/>, rootId);
