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

  handleAsk = () => {
    let id, askterm
    id = this.props.act
    switch (this.props.unfold_index){
      case 1:
        askterm = 'role'
        break
      case 2:
        askterm = 'background'
        break
      case 3:
        askterm = 'event'
        break
    }
    return [id, askterm];
  }

  render() {
    let id, askterm
    if (!this.props.help) {
      return null; // Don't render anything if help is false
    }else{
      [id, askterm] = this.handleAsk()
    }




    if (this.props.unfold_index === 1) {
      var formData = new FormData();
      formData.append('id', id);
      formData.append('askterm', askterm);
      fetch('http://127.0.0.1:5000/generate_role', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
          // console.log('Status:', data.status);
          // console.log('Content:', data.content);
        })
      .catch((error) => {
        console.error('Error:', error);
      });
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
    image_index: state.image_index,
    unfold_index: state.unfold_index,
    act: state.act
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