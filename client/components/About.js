import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
const ReactMarkdown = require('react-markdown');
const aboutMD = require('../data/about-page.md');
const randomHeader = require('./Header/randomHeader');
import CustomProperties from 'react-custom-properties';

const importAllImages = (files) => {
  let images = {};
  files.keys().map((item, index) => { images[item.replace('./', '').replace(/\.[^/.]+$/, '')] = files(item); });
  return images;
};
const allImages = importAllImages(require.context('../assets/images/headshots', false, /\.(png|jpe?g|mov|mp4)$/));

class About extends React.Component {
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
      <a href="#maincontent" className="skip-link">Skip to main content</a>
      <div className="full-page">
        <Header randomizeHeader={() => randomHeader.randomizeHeader(this)}/>
        <div className="page--posts-page page-content" id="maincontent">
          <h1 className="page-title">About Mae Wendell</h1>
          <article className="page">
            <div className="feature-image organic">
              <img src={allImages['sassconf-podium']} alt="Mae Wendell podium" />
            </div>
            <ReactMarkdown source={aboutMD}/>
          </article>
        </div>
        <Footer/>
      </div>
      </CustomProperties>
    )
  }
}

export default About;
