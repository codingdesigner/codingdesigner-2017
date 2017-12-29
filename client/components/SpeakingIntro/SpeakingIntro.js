import React from 'react';
import {intro} from '../../data/speaking';
import PropTypes from 'prop-types';

class SpeakingIntro extends React.Component {
  render() {
    return (
        <div className="intro">
          <div className="intro--text">
            <div className="intro-graphs" dangerouslySetInnerHTML={{__html: intro.intro_graphs}}/>
            <div className="intro-graphs-caption" dangerouslySetInnerHTML={{__html: intro.intro_graphs_caption}}/>
          </div>
          <figure className="intro-image">
            <img src={this.props.allImages[intro.intro_image.src]} alt={intro.intro_image.alt}/>
            <figcaption dangerouslySetInnerHTML={{__html: intro.intro_image.caption}}/>
          </figure>
        </div>
    )
  }
}

SpeakingIntro.propTypes = {
  allImages: PropTypes.object.isRequired
};

export default SpeakingIntro;
