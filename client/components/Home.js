import React from 'react';
import Header from './Header/Header';
import HomeIntro from './HomeIntro/HomeIntro';
import PortfolioOverview from './PortfolioOverview/PortfolioOverview';
import TweetEmbed from 'react-tweet-embed'
import Footer from './Footer/Footer';
import {headerLayouts} from '../data/header-layouts';
import CustomProperties from 'react-custom-properties';

const importHeaderImages = (files) => {
  let images = {};
  files.keys().map((item, index) => { images[item.replace('./', '').replace(/\.[^/.]+$/, '')] = files(item); });
  return images;
};
const allHeaderImages = importHeaderImages(require.context('../assets/images/headers', false, /\.(png|jpe?g)$/));

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.randomheaderRange = this.randomheaderRange.bind(this);
    this.randomizeHeader = this.randomizeHeader.bind(this);
    this.randomizeHeaderObject = this.randomizeHeaderObject.bind(this);

    this.state = {
      'randomPhoto': this.randomheaderRange(),
      'randomPhotoObject': {}
    };
  }

  componentDidMount() {
    this.randomizeHeaderObject();
  }

  randomheaderRange(min = 1, max = 10) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomizeHeader() {
    const random = this.randomheaderRange();
    this.setState({'randomPhoto': random});
  }

  randomizeHeaderObject() {
    const randomPhotoObject = {...this.state.randomPhotoObject};
    const random = this.randomheaderRange();
    const headerLayout = headerLayouts[random];
    const headerImage = allHeaderImages[headerLayout.image];
    randomPhotoObject.image = headerImage;
    randomPhotoObject.color = headerLayout.color;
    randomPhotoObject.backgroundColor = headerLayout.backgroundColor;
    randomPhotoObject.blend = headerLayout.blend;
    randomPhotoObject.linkColor = headerLayout.linkColor;
    this.setState({randomPhotoObject});
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
      <div className="full-page">
        <CustomProperties
          global
          properties={headerStyles}
        />
        <Header randomizeHeader={this.randomizeHeaderObject}/>
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
