import React, { Component } from 'react';
import { connect } from 'react-redux';
import plotback from '../assets/image/plot_back.png'
export default class StoryCanvas extends Component {
  constructor(props) {
    super(props);
   
}


render() {
  
  console.log(this.props.json)
  let audioPlayer;
  if(this.props.json!=='placeholder'){
    audioPlayer = (
      <audio controls>
        <source src={URL.createObjectURL(this.initialData)} type="audio/webm" />
      </audio>
    )
  }
  else{
    audioPlayer = null
  }
  console.log(audioPlayer)

  return (
    <div className='surfaceimg'>
      <img src={plotback} />
      {/* {audioPlayer} */}
    </div>
  );
}
}

