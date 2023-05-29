import React, { Component } from 'react'
import deleteIcon from '../assets/image/delete.png';
import Unsaved_Image from '../assets/image/init_image.png'
import { connect } from 'react-redux';
class ImageItem extends Component {

  handleDelete = () => {
    const { onDelete, index } = this.props;
    onDelete(index);
   

  } 

  handleClickImage=()=> {
    const {onClickImage, index } = this.props;
    onClickImage(index);

  } 

  render() {
    let url = this.props.url;
    if(url=='placeholder'){
      url= Unsaved_Image;
    }
    
    // 根据 this.props.image_index 和 this.props.index 是否相等来决定是否添加 "selected" 类
    const selectedClass = this.props.image_index === this.props.index ? " selected" : "";
  
    return (
      <div className={"image-item" + selectedClass}>
        <img src={url} onClick={this.handleClickImage.bind(this)}/>
      </div>
    );
  };
  
}



const mapStateToProps = (state) => {
  return {
    image_index: state.image_index

    // role_index: state.role_index,
    // scene_index: state.scene_index,
    // plot_index: state.plot_index
  };
};



export default connect(mapStateToProps)(ImageItem);