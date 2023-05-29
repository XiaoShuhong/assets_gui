import React, { Component } from 'react';
import voiceButton from '../assets/image/say.png'
import onvoiceButton from '../assets/image/onsay.png'
import { connect } from 'react-redux';
class VoiceButton extends Component {
  constructor(props) {
    super(props);
    this.state = { isPressed: false };
    this.mediaRecorder = null;
    this.chunks = [];
    this.handleType = this.handleType.bind(this);
    this.type = this.handleType();
  }
  
  handleType = () => {
    switch(this.props.unfold_index){
      case 1:
        return 'role'
      case 2:
        return 'background'
      case 3:
        return 'event'
    }

  }
  handleMouseDown = () => {
    console.log('start');
    this.setState({ isPressed: true });

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.start();

        this.mediaRecorder.ondataavailable = e => {
          this.chunks.push(e.data);
        }

        this.mediaRecorder.onstop = e => {
          const blob = new Blob(this.chunks, { 'type' : 'audio/ogg; codecs=opus' });
          const id = this.props.unfold_index;
          const type = this.type
          var formData = new FormData();

          // Append the blob, id and type as fields in the form
          formData.append('file', blob);
          formData.append('id', id);
          formData.append('type', type);
          fetch('http://127.0.0.1:5000/generate_story', {
            method: 'POST',
            body: formData
          })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch((error) => {
            console.error('Error:', error);
          });
        }
      });
  }

  handleMouseUp = () => {
    if (this.mediaRecorder) {
      this.mediaRecorder.stop();
      this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
      console.log('end');
    }
    this.chunks = [];
    this.setState({ isPressed: false });
  }

  render() {
    const buttonImage = this.state.isPressed ? onvoiceButton : voiceButton;

    return (
      <img
        className="float-button"
        src={buttonImage}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseLeave={this.handleMouseUp}
      />
    );
  }
}


const mapStateToProps = (state) => {
  return {
    image_index: state.image_index,
    unfold_index: state.unfold_index
  };
};




export default connect(mapStateToProps)(VoiceButton);
