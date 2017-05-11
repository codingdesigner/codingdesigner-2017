import React from 'react';
var ReactDOM = require('react-dom');
var ReactMarkdown = require('react-markdown');
import Header from './header/Header';

// var input = '# This is a header\n\nAnd this is a paragraph';

import homeIntro from '../data/home--intro.md';

class Main extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <ReactMarkdown source={homeIntro} />
        {/*<ReactMarkdown source={input} />*/}
      </div>
    )
  }
};

export default Main;
