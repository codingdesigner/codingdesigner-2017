import React from 'react';
const ReactMarkdown = require('react-markdown');
const homeIntro = require('../../data/home--intro.md');
import introImage from '../../data/home--intro-image';

class HomeIntro extends React.Component {
  render() {
    return (

        <div className="intro">
          <div className="intro--text">
            <div className="intro-graphs">
              <ReactMarkdown source={homeIntro}/>
            </div>
          </div>
          <figure className="intro-image">
            <img src={introImage.src} alt={introImage.alt}/>
            <figcaption>{introImage.caption}</figcaption>
          </figure>
        </div>

    )
  }
}

export default HomeIntro;
