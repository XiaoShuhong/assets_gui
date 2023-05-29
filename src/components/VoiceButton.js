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


  handleAct = () => {
    switch(this.props.act){
      case 0:
        return 'act1'
      case 1:
        return 'acrt2'
      case 2:
        return 'act3'
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
          const blob = new Blob(this.chunks, { 'type' : 'audio/webm' });
          const act = this.handleAct()
          const type = this.handleType()
          console.log(act,type,this.props.act,this.props.unfold_index)
          var formData = new FormData();

          // Append the blob, id and type as fields in the form
          formData.append('file', blob, 'filename.webm'); 
          formData.append('act', act);
          formData.append('type', type);
          fetch('http://127.0.0.1:5000/get_audio', {
            method: 'POST',
            body: formData
          })
          .then(response => response.json())
          .then(data => {
              console.log('Status:', data.status);
              console.log('Content:', data.content);
            })
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
    unfold_index: state.unfold_index,
    act: state.act
  };
};




export default connect(mapStateToProps)(VoiceButton);
