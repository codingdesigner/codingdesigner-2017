import React from 'react';
import PropTypes from 'prop-types';
import TweetEmbed from 'react-tweet-embed'

class TalkReaction extends React.Component {

  reactionTweet(talkReaction) {
    if (typeof talkReaction.reaction_type_tweet !== 'undefined') {
      const tweetBool = JSON.parse(talkReaction.reaction_type_tweet);
      if (tweetBool === true) {
        return (
          <div>
            <TweetEmbed id={talkReaction.reaction_content}></TweetEmbed>
          </div>
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
    return (
      <div>
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
