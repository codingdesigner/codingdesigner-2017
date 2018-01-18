import React from 'react';
import PropTypes from 'prop-types';
import TweetEmbed from 'react-tweet-embed'

class TalkReaction extends React.Component {

  reactionTweet(talkReaction) {
    if (typeof talkReaction.reaction_type_tweet !== 'undefined') {
      const tweetBool = JSON.parse(talkReaction.reaction_type_tweet);
      if (tweetBool === true) {
        return (
          <TweetEmbed id={talkReaction.reaction_content}></TweetEmbed>
        );
      }
    }
  }

  reactionQuote(talkReaction) {
    if (typeof talkReaction.reaction_type_quote !== 'undefined') {
      const quoteBool = JSON.parse(talkReaction.reaction_type_quote);
      if (quoteBool === true) {
        return (
          <div dangerouslySetInnerHTML={{__html: talkReaction.reaction_content}}/>
        );
      }
    }
  }

  render() {
    const size = (typeof this.props.talkReaction.reaction_size !== 'undefined') ? this.props.talkReaction.reaction_size : '';

    return (
      <div className={size}>
        {this.reactionTweet(this.props.talkReaction)}
        {this.reactionQuote(this.props.talkReaction)}
      </div>
    );
  }
}

TalkReaction.propTypes = {
  talkReaction: PropTypes.object.isRequired
};

export default TalkReaction;
