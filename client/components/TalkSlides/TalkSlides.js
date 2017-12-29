import React from 'react';
import PropTypes from 'prop-types';

class TalkSlides extends React.Component {

  slideImage(talkSampleSlide) {
    if (typeof talkSampleSlide.slide_url === 'undefined') {
      return (
        <img src={this.props.allImages[talkSampleSlide.slide_img_src]} alt={talkSampleSlide.slide_img_alt}/>
      )
    } else {
      return (
        <a href={talkSampleSlide.slide_url}>
          <img src={this.props.allImages[talkSampleSlide.slide_img_src]} alt={talkSampleSlide.slide_img_alt}/>
        </a>
      )
    }
  }

  slideSlideshare(talkSampleSlide) {
    if (typeof talkSampleSlide.slides_slideshare !== 'undefined') {
      const slideshareBool = JSON.parse(talkSampleSlide.slides_slideshare);
      if (slideshareBool === true) {
        return (
          <div className="slideshare" dangerouslySetInnerHTML={{__html: talkSampleSlide.slides_slideshare_embed}}/>
        );
      }
    }
  }

  slideLink(talkSampleSlide) {
    if (typeof talkSampleSlide.slide_url !== 'undefined') {
      return (
        <div className="talk--slides-link">
          <a href={talkSampleSlide.slide_url}>View slides online</a>
        </div>
      )
    }
  }

  slideCaption(talkSampleSlide) {
    if (typeof talkSampleSlide.slide_figcaption !== 'undefined') {
      return (
        <figcaption>
          {talkSampleSlide.slide_figcaption}
          {this.slideLink(talkSampleSlide)}
        </figcaption>
      )
    }
  }

  render() {
    return (
      <figure className="talk--sample-slide">
        {this.slideImage(this.props.talkSampleSlide)}
        {this.slideSlideshare(this.props.talkSampleSlide)}
        {this.slideCaption(this.props.talkSampleSlide)}
      </figure>
    );
  }
}

TalkSlides.propTypes = {
  allImages: PropTypes.object.isRequired,
  talkSampleSlide: PropTypes.object.isRequired
};

export default TalkSlides;
