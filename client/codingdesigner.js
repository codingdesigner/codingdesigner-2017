import React from 'react';
import {render} from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import scss from './styles/style.scss';

// import components
import Main from './components/Main';


// console.log(browserHistory)
const router = (
    <Router>
      <Route path="/" component={Main}>
      </Route>
    </Router>
);

render(router, document.getElementById('root'));