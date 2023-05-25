import React, { Component } from 'react'
import tempimg from '../assets/image/temp.png'
import { connect } from 'react-redux';
import deleteIcon from '../assets/image/delete.png';
import {askHelp} from '../reducer/storypage.js'
class InspirationList extends Component {


  handleDelete = () => {
    this.props.onChange(false);
  } 
  render() {
    if (!this.props.help) {
      return null; // Don't render anything if help is false
    }

    return (
      <div className="inspirationlist">
        <img src={tempimg} />
        <button className="delete-button" onClick={this.handleDelete}><img src={deleteIcon} /></button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
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

export default connect(mapStateToProps,mapDispatchToProps)(InspirationList);