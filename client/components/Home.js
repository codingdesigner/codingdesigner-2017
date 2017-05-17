import React from 'react';
// const ReactDOM = require('react-dom');
import Header from './Header/Header';
import HomeIntro from './HomeIntro/HomeIntro';
import PortfolioOverview from './PortfolioOverview/PortfolioOverview';



class Main extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <div className="page--home page-content">
          <h1 className="page-title">
            Hi. <span className="my-name">I’m <span className="no-break">Mason Wendell.</span></span>
          </h1>
          <HomeIntro/>
        </div>
        <PortfolioOverview/>

          {/*{{>molecules-tweet-rwd-hard}}*/}

        {/*<ReactMarkdown source={input} />*/}
      </div>
    )
  }
}
;

export default Main;
