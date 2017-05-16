import React from 'react';
import {render} from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import scss from './styles/style.scss';

// import components
import Home from './components/Home';


// console.log(browserHistory)
const router = (
  <Router>
    <Route path="/" component={Home}>
    </Route>
  </Router>
);

render(router, document.getElementById('root'));
