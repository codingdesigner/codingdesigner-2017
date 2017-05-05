import React from 'react';
import {Link} from 'react-router';
import Header from './Header';

const Main = React.createClass({
  render() {
    return (
      <div>
        <Header/>
        <h1>
          <Link to="/">The Coding Designer</Link>
        </h1>
      </div>
    )
  }
});

export default Main;