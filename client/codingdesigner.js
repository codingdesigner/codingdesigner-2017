import React from 'react';
import {render} from 'react-dom';
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import scss from './styles/style.scss';

// import components
import Home from './components/Home';
import Portfolio from './components/Portfolio';
import Speaking from './components/Speaking';
import Photos from './components/Photos';
import PostsTeasers from './components/PostsTeasers';
import Post from './components/Post';
import About from './components/About';
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
        <Route path="/photos" component={Photos} />
        <Route path="/posts/:postId" component={Post} />
        <Route path="/posts" component={PostsTeasers} />
        <Route path="/about" component={About} />
        <Route component={NotFound}/>
      </Switch>
    </Router>
  )
};

render(<Root/>, document.getElementById('root'));
