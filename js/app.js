/*
 * styles
 */

require('../sass/app.scss');


/*
 * js
 */

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App.jsx';
import './modernizr.js';


ReactDOM.render(<App />, document.getElementById('content'));
