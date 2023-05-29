import React, { Component } from 'react'
import tempimg from '../assets/image/temp.png'
import tempimg2 from '../assets/image/temp2.png'
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


    if (this.props.unfold_index === 1) {
      return (
        <div className="inspirationlist1">
        <div className="sub-inspiration1">
          <img src={tempimg} />
        </div>
        <div className="sub-inspiration1">
          <img src={tempimg} />
        </div>
        <div className="sub-inspiration1">
          <img src={tempimg} />
        </div>
        <div className="sub-inspiration1">
          <img src={tempimg} />
        </div>
      </div>
      );


    }else if (this.props.unfold_index === 2) {
      return (
        <div>
          <div className="inspirationlist2">
            <img src={tempimg2} />
          </div>
        <button className="delete-button" onClick={this.handleDelete}><img src={deleteIcon} /></button>
        </div>
        
        
      );
    }

  }
}

const mapStateToProps = (state) => {
  return {
    help: state.help,
    unfold_index: state.unfold_index
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