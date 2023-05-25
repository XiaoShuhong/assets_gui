import React, { Component } from 'react';
import HelpButton from '../components/HelpButton';
import VoiceButton from '../components/VoiceButton'

class FloatButtonList extends Component {
  render() {
    return (
      <div className='float-button-list'>
        <HelpButton />
        <VoiceButton/>
      </div>
    );
  }
}

export default FloatButtonList;
