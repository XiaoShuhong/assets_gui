import React, { Component } from 'react';
import voiceButton from '../assets/image/say.png'
export default class VoiceButton extends Component {
  constructor(props) {
    super(props);
    this.mediaRecorder = null;
    this.chunks = [];
  }

  handleMouseDown = () => {
    console.log('start')
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();

        this.mediaRecorder.ondataavailable = e => {
          this.chunks.push(e.data);
        }

        this.mediaRecorder.onstop = e => {
          const blob = new Blob(this.chunks, { 'type' : 'audio/ogg; codecs=opus' });
          // Here you can send the blob to your server, save it to disk, or whatever you need
        }
      });
  }

  handleMouseUp = () => {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
      console.log('end')
    }
    this.chunks = [];
  }
  render() {
    
    return (
      <img
        className="float-button"
        src={voiceButton}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      />
    );
  }
}


