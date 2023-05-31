import React, { Component } from 'react';

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      currentTime: 0,
      duration: 0
    };
    this.audio = React.createRef();
  }

  componentDidMount() {
    this.audio.current.addEventListener('timeupdate', this.updateTime);
    this.audio.current.addEventListener('loadedmetadata', this.updateDuration);
    this.audio.current.addEventListener('ended', this.handleEnd); // Listen to 'ended' event
  }

  componentWillUnmount() {
    this.audio.current.removeEventListener('timeupdate', this.updateTime);
    this.audio.current.removeEventListener('loadedmetadata', this.updateDuration);
    this.audio.current.removeEventListener('ended', this.handleEnd); // Stop listening to 'ended' event
    URL.revokeObjectURL(this.props.url);
  }
  
  

  

  togglePlay = () => {
    const wasPlaying = this.state.play;
    this.setState({ play: !wasPlaying });

    if (wasPlaying) {
      this.audio.current.pause();
    } else {
      this.audio.current.play();
    }
  }

  updateTime = () => {
    this.setState({ currentTime: this.audio.current.currentTime });
  }

  updateDuration = () => {
    this.setState({ duration: this.audio.current.duration });
  }

  handleEnd = () => {
    this.setState({ play: false }); // When audio ends, set play to false
    this.setState({ play: false, currentTime: 0 });
  }

  render() {
    const { url } = this.props;
    const { play, currentTime, duration } = this.state;

    return (
      <div className="audio-player-container">
        <progress value={currentTime} max={duration} className="audio-progress-bar" />
        <button onClick={this.togglePlay} className="audio-play-button">
          {play ? 'Pause' : 'Play'}
        </button>
        <audio ref={this.audio} src={url} className="audio-element" />
      </div>
    );
  }
}

export default AudioPlayer;
