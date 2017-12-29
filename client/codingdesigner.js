import React from 'react';
import {render} from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import scss from './styles/style.scss';

// import components
import Home from './components/Home';
import Portfolio from './components/Portfolio';
import Speaking from './components/Speaking';
import PostsFeed from './components/PostsFeed';
import NotFound from './components/NotFound';


// console.log(browserHistory)
const Root = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/portfolio/:portfolioId" component={Portfolio} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/speaking" component={Speaking} />
        <Route path="/posts" component={PostsFeed} />
        <Route component={NotFound}/>
      </Switch>
    </Router>
  )
};

render(<Root/>, document.getElementById('root'));
