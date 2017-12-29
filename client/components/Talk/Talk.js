import React from 'react';
import PropTypes from 'prop-types';
import TalkEvent from '../TalkEvent/TalkEvent';
import TalkSlides from '../TalkSlides/TalkSlides';
import TalkVideo from '../TalkVideo/TalkVideo';
import TalkReaction from '../TalkReacton/TalkReaction';
import 'eq.js';

class Talk extends React.Component {
  constructor(props) {
    super(props);
    this.talkEvents = this.talkEvents.bind(this);
    this.talkReactions = this.talkReactions.bind(this);
  }

  talkEvents(key) {
    return (
      <TalkEvent talkEvent={this.props.talk.talk_events[key]} key={key}/>
    )
  }

  talkSlides(talk) {
    if (typeof talk.talk_sample_slide !== 'undefined') {
      return (
        <TalkSlides talkSampleSlide={talk.talk_sample_slide} allImages={this.props.allImages}/>
      )
    }
  }

  talkVideo(talk) {
    if (typeof talk.talk_video !== 'undefined') {
      return (
        <TalkVideo talkVideo={talk.talk_video}/>
      )
    }
  }

  talkReactions(key) {
    return (
      <TalkReaction talkReaction={this.props.talk.talk_reactions[key]} key={key}/>
    )
  }

  talkReactionCheck(talk) {
    if (typeof talk.talk_reactions !== 'undefined') {
      return (
        <div className="talk--reactions">
          {Object.keys(this.props.talk.talk_reactions).map(this.talkReactions)}
        </div>
      )
    }
  }

  render() {
    return (
      <div className="talk">
        <h2 className="talk--title">
          <span className="width-limiter" dangerouslySetInnerHTML={{__html:  this.props.talk.talk_title}}/>
        </h2>
        <div className="talk--description-and-events">
          <div className="talk--description" dangerouslySetInnerHTML={{__html: this.props.talk.talk_description}}/>
          <div className="talk--events">
            <h3>Events</h3>
            <ul>
              {Object.keys(this.props.talk.talk_events).map(this.talkEvents)}
            </ul>
          </div>
        </div>
        <div className="talk--slides"  data-eq-pts="medium: 650">
          {this.talkSlides(this.props.talk)}
          {this.talkVideo(this.props.talk)}
        </div>
        {this.talkReactionCheck(this.props.talk)}
      </div>
    )
  }
}

Talk.propTypes = {
  allImages: PropTypes.object.isRequired,
  talk: PropTypes.object.isRequired
};

export default Talk;
