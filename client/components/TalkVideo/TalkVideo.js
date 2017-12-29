import React from 'react';
import PropTypes from 'prop-types';

class TalkVideo extends React.Component {
  constructor(props) {
    super(props);
    this.youtube = this.youtube.bind(this);
    this.vimeo = this.vimeo.bind(this);
  }

  youtube(key) {
    const item = this.props.talkVideo.talk_video_youtube_embed_url[key];
    return (
      <div className="video-container--youtube" key={key}>
        <iframe width="960" height="720" src={item.embed_url} frameBorder="0" allowFullScreen />
      </div>
    )

  }

  youtubes(talkVideo) {
    if (typeof talkVideo.talk_video_youtube_embed_url === 'object') {
      return (
        <div>{Object.keys(talkVideo.talk_video_youtube_embed_url).map(this.youtube)}</div>
      )
    }
  }

  vimeo(key) {
    const item = this.props.talkVideo.talk_video_vimeo_embed[key];
    return (
      <div dangerouslySetInnerHTML={{__html: item.embed_url}} key={key}/>
    )

  }

  vimeos(talkVideo) {
    if (typeof talkVideo.talk_video_vimeo_embed === 'object') {
      return (
        <div>{Object.keys(talkVideo.talk_video_vimeo_embed).map(this.vimeo)}</div>
      )
    }
  }

  render() {
    return (
      <div className="talk--video">
        {this.youtubes(this.props.talkVideo)}
        {this.vimeos(this.props.talkVideo)}
      </div>
    );
  }
}

TalkVideo.propTypes = {
  talkVideo: PropTypes.object.isRequired
};

export default TalkVideo;
