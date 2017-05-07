import React from 'react';
// import {Link} from 'react-router';
import Header from './header/Header';

class Main extends React.Component {
  constructor() {
    super();

    // initial state
    this.state = {
      menuVisible: true
    }
  }

  render() {
    return (
      <div>
        <Header menuVisible={this.state.menuVisible}/>
        <h1>
          {/*<Link to="/">The Coding Designer</Link>*/}
        </h1>
      </div>
    )
  }
};

export default Main;