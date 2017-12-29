import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

class TalkEvent extends React.Component {

  eventName(talkEvent) {
    if (typeof talkEvent.event_url === 'undefined') {
      return (
        <span>{talkEvent.event_name}</span>
      )
    } else {
      return (
        <Link to={talkEvent.event_url}>{talkEvent.event_name}</Link>
      )
    }
  }

  eventEmphasis(talkEvent) {
    if (typeof talkEvent.event_emphasis !== undefined) {
      return (
        <em>{talkEvent.event_emphasis}</em>
      )
    }
  }

  render() {
    return (
      <li className="talk--event">
        <span className="talk--event-name">
          {this.eventName(this.props.talkEvent)} {this.eventEmphasis(this.props.talkEvent)}
        </span> - {this.props.talkEvent.event_location}
      </li>
    )
  }
}

TalkEvent.propTypes = {
  talkEvent: PropTypes.object.isRequired
};

export default TalkEvent;
