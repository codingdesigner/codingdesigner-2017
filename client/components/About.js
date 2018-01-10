import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
const ReactMarkdown = require('react-markdown');
const aboutMD = require('../data/about-page.md');

const importAllImages = (files) => {
  let images = {};
  files.keys().map((item, index) => { images[item.replace('./', '').replace(/\.[^/.]+$/, '')] = files(item); });
  return images;
};
const allImages = importAllImages(require.context('../assets/images/headshots', false, /\.(png|jpe?g|mov|mp4)$/));

class About extends React.Component {
  constructor(props) {
    super(props);
    this.randomheaderRange = this.randomheaderRange.bind(this);
    this.randomizeHeader = this.randomizeHeader.bind(this);

    this.state = {
      'randomPhoto': this.randomheaderRange()
    };
  }

  randomheaderRange(min = 1, max = 10) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  randomizeHeader() {
    const random = this.randomheaderRange();
    this.setState({'randomPhoto': random});
  }

  render() {
    return (
      <div className="full-page">
        <Header headerImage={this.state.randomPhoto} randomizeHeader={this.randomizeHeader}/>
        <div className="page--posts-page page-content">
          <h1 className="page-title">About Mason Wendell</h1>
          <article className="page">
            <div className="feature-image organic">
              <img src={allImages['sassconf-podium']} alt="Mason Wendell podium" />
            </div>
            <ReactMarkdown source={aboutMD}/>
          </article>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default About;
