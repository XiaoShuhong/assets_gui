import React, { Component } from 'react';
import helpButton from '../assets/image/help.png';
import onhelpButton from '../assets/image/onhelp.png';
import { connect } from 'react-redux';
import {askHelp} from '../reducer/storypage.js';

class HelpButton extends Component {
  constructor(props) {
    super(props);
    this.state = { isPressed: false };
  }

  handleGPTAsk = () => {
    if(this.props.unfold_index>0 && this.props.image_index>=0){
      console.log('ask chatgpt for cate ',this.props.unfold_index, 'image ',this.props.image_index);
      this.props.onChange(true);
    }
  }

  handleMouseDown = () => {
    this.setState({ isPressed: true });
  }

  handleMouseUp = () => {
    this.setState({ isPressed: false });
  }

  render() {
    const buttonImage = this.state.isPressed ? onhelpButton : helpButton;

    return (
      <img 
        className="float-button" 
        src={buttonImage} 
        onMouseDown={this.handleMouseDown} 
        onMouseUp={this.handleMouseUp} 
        onMouseLeave={this.handleMouseUp}
        onClick={this.handleGPTAsk}
      />
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
