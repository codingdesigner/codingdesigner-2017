import React from 'react';
import LazyLoad from 'react-lazyload';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import SpeakingIntro from './SpeakingIntro/SpeakingIntro';
import Talk from './Talk/Talk';
import {talks} from '../data/speaking';

const importAllImages = (files) => {
  let images = {};
  files.keys().map((item, index) => { images[item.replace('./', '').replace(/\.[^/.]+$/, '')] = files(item); });
  return images;
};
const allImages = importAllImages(require.context('../assets/images/speaking', false, /\.(png|jpe?g|mov|mp4)$/));

class Speaking extends React.Component {
  constructor(props) {
    super(props);
    this.randomheaderRange = this.randomheaderRange.bind(this);
    this.randomizeHeader = this.randomizeHeader.bind(this);
    this.loadTalks = this.loadTalks.bind(this);

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
    return (
      <div>
        <Header headerImage={this.state.randomPhoto} randomizeHeader={this.randomizeHeader}/>
        <div className="page--speaking page-content">
          <SpeakingIntro allImages={allImages}/>
          {Object.keys(talks).map(this.loadTalks)}
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Speaking;
