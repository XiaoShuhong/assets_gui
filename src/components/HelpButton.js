import React, { Component } from 'react';
import helpButton from '../assets/image/help.png';
import { connect } from 'react-redux';
import {askHelp} from '../reducer/storypage.js';

class HelpButton extends Component {

  handleGPTAsk = () => {
    if(this.props.unfold_index>0 && this.props.image_index>=0){
      console.log('ask chatgpt for cate ',this.props.unfold_index, 'image ',this.props.image_index);
      this.props.onChange(true);
    }
  }

  render() {
    return (
      <img className="float-button" src={helpButton} onClick={this.handleGPTAsk}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    unfold_index: state.unfold_index,
    image_index: state.image_index,
    help: state.help,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (state) => {
      dispatch(askHelp(state));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HelpButton);
