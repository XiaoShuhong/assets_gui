import React, { Component } from 'react';
import HelpButton from '../components/HelpButton';
import VoiceButton from '../components/VoiceButton'

class FloatButtonList extends Component {
  render() {
    const { unfold_index,image_index } = this.props;
    
    return (
      <div className='float-button-list'>
        {unfold_index > 0 && image_index > -1 && (
          <>
             
            <HelpButton />
            <VoiceButton/>
          </>
          
        )}
      </div>
    );
  }
}

export default FloatButtonList;
