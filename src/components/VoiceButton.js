import React, { Component } from 'react';
import voiceButton from '../assets/image/say.png'
import onvoiceButton from '../assets/image/onsay.png'
import { connect } from 'react-redux';
import voicelabel from '../assets/image/haveblob.png'
import {changeJSON,changeURL,ChangeVFlag} from '../reducer/storypage.js'
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
        return '1'
      case 1:
        return '2'
      case 2:
        return '3'
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
          if(this.props.unfold_index==3){
            const old_plot_json = this.props.plot_json
            let new_plot_json =  [...old_plot_json];
            new_plot_json[this.props.image_index] = blob
            this.props.onChangeJSON(this.props.unfold_index,new_plot_json)
          }

          const act = this.handleAct()
          const type = this.handleType()
          console.log(act,type,this.props.act,this.props.unfold_index,this.props.image_index)
          var formData = new FormData();

          // Append the blob, id and type as fields in the form
          formData.append('file', blob, 'filename.webm'); 
          formData.append('act', act);
          formData.append('type', type);
          formData.append('imgid', this.props.image_index);
          console.log()
          fetch('http://10.73.3.223:55231/get_audio', {
            method: 'POST',
            body: formData
          })
          .then(response => response.json())
          .then(data => {
              console.log('Status:', data.status);
              console.log('Content:', data.content);
              this.props.onChangeVFlag(true)
              console.log('after voice button',this.props.vflag)
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
      if(this.props.unfold_index===3){
        const old_plot_url = this.props.plot_url
        let new_plot_url =  [...old_plot_url];
        new_plot_url[this.props.image_index] = voicelabel
        this.props.onChangeURL(this.props.unfold_index,new_plot_url)
      }
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
    act: state.act,
    plot_json: state.plot_json,
    plot_url: state.plot_url,
    vflag: state.vflag
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    onChangeURL: (id,url) => {
      dispatch(changeURL(id,url));
    },
    onChangeJSON: (id, json)=> {
      dispatch(changeJSON(id,json));
    },
    onChangeVFlag: (status)=> {
      dispatch(ChangeVFlag(status));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(VoiceButton);
