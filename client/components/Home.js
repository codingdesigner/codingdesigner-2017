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
      'randomPhotoObject': {},
      'expandHeader': true
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

    const pageClass = 'full-page ' + ((this.state.expandHeader === true)? 'large-header' : '');

    return (
      <CustomProperties className="full-page" properties={headerStyles} >
      <a href="#maincontent" className="skip-link">Skip to main content</a>
      <div className={pageClass}>
        <Header randomizeHeader={() => randomHeader.randomizeHeader} expandHeader={this.state.expandHeader}/>
        <div className="page--home page-content" id="maincontent">
          <h1 className="page-title">
            Hi. <span className="my-name">I’m <span className="no-break">Mae Wendell.</span></span>
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
