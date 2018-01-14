import React from 'react';
import Header from './Header/Header';
import HomeIntro from './HomeIntro/HomeIntro';
import PortfolioOverview from './PortfolioOverview/PortfolioOverview';
import TweetEmbed from 'react-tweet-embed'
import Footer from './Footer/Footer';
const randomHeader = require('./Header/randomHeader');
import CustomProperties from 'react-custom-properties';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      'randomPhotoObject': {}
    };
  }

  componentWillMount() {
    randomHeader.randomizeHeader(this);
  }

  render() {
    const headerStyles = {
      '--header-image': 'url(' + this.state.randomPhotoObject.image + ')',
      '--header-color': this.state.randomPhotoObject.color,
      '--header-background-color': this.state.randomPhotoObject.backgroundColor,
      '--header-blend': this.state.randomPhotoObject.blend,
      '--header-link-color': this.state.randomPhotoObject.linkColor
    };

    return (
      <CustomProperties className="full-page" properties={headerStyles} >
      <div className="full-page">

        <Header randomizeHeader={() => randomHeader.randomizeHeader}/>
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
      </CustomProperties>
    )
  }
}

export default Home;
