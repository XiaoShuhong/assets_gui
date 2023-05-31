import React, { Component } from 'react';
import { connect } from 'react-redux';
import plotback from '../assets/image/plot_back.png';
import AudioPlayer from './AudioPlayer.js';

export default class StoryCanvas extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const data = this.props.json;
    console.log(data)
    let url;
    if (data !== 'placeholder' && data !== undefined) {
      url = URL.createObjectURL(data);
    }
    return (
      <div className='plotimg'>
        <img src={plotback} />
        {url && (
          <div className='audioplayer'>
            <AudioPlayer url={url}/>
          </div>
        )}
      </div>
    );
  }
}
