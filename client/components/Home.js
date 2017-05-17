import React from 'react';
import TweetEmbed from 'react-tweet-embed'
import Header from './Header/Header';
import Footer from './Footer/Footer';
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
          <PortfolioOverview/>
          <TweetEmbed id='182147993800159232'/>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Main;
