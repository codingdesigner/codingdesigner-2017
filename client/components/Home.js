import React from 'react';
import Header from './Header/Header';
import HomeIntro from './HomeIntro/HomeIntro';
import PortfolioOverview from './PortfolioOverview/PortfolioOverview';
import TweetEmbed from 'react-tweet-embed'
import Footer from './Footer/Footer';



class Home extends React.Component {
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

export default Home;
