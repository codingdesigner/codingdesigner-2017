import React from 'react';
import LazyLoad from 'react-lazyload';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import SpeakingIntro from './SpeakingIntro/SpeakingIntro';
import Talk from './Talk/Talk';
import {talks} from '../data/speaking';
const randomHeader = require('./Header/randomHeader');
import CustomProperties from 'react-custom-properties';

const importAllImages = (files) => {
  let images = {};
  files.keys().map((item, index) => { images[item.replace('./', '').replace(/\.[^/.]+$/, '')] = files(item); });
  return images;
};
const allImages = importAllImages(require.context('../assets/images/speaking', false, /\.(png|jpe?g|mov|mp4)$/));

class Speaking extends React.Component {
  constructor(props) {
    super(props);
    this.loadTalks = this.loadTalks.bind(this);

    this.state = {
      'randomPhotoObject': {}
    };
  }

  componentWillMount() {
    randomHeader.randomizeHeader(this);
  }

  loadTalks(key) {
    return (
      <LazyLoad height={800} offset={100} key={key}>
        <Talk
          talk={talks[key]}
          allImages={allImages}/>
      </LazyLoad>
    );
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
      <a href="#maincontent" className="skip-link">Skip to main content</a>
      <div className="full-page">
        <Header randomizeHeader={() => randomHeader.randomizeHeader(this)}/>
        <div className="page--speaking page-content" id="maincontent">
          {/* <SpeakingIntro allImages={allImages}/> */}
          {Object.keys(talks).map(this.loadTalks)}
        </div>
        <Footer/>
      </div>
      </CustomProperties>
    )
  }
}

export default Speaking;
