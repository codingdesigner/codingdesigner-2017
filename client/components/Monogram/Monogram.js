import React from 'react';
import Sound from 'react-sound';
const batmanMp3 = require('../../assets/audio/batman.mp3');

class Monogram extends React.Component {
  constructor() {
    super();
    this.playAudio = this.playAudio.bind(this);

    // initial state
    this.state = {
      audioPlaying: 'PAUSED'
    }
  }

  playAudio() {
    this.setState({audioPlaying: 'PLAYING'});
  }

  render() {
    return (
      <div className="monogram-wrapper" id="footer-monogram">
        <div className="monogram" onMouseEnter={this.playAudio}>
          <div className="monogram--initial word-1">M</div>
          <div className="monogram--initial word-2">W</div>
        </div>
        <Sound url={batmanMp3} playStatus={this.state.audioPlaying} />
      </div>
    )
  }
}

export default Monogram;
