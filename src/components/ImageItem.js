import React, { Component } from 'react'
import deleteIcon from '../assets/image/delete.png';
import Unsaved_Image from '../assets/image/init_image.png'
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
    return (
      <div className="image-item">
        <img src={url} onClick={this.handleClickImage.bind(this)}/>
        <button className="delete-button" onClick={this.handleDelete.bind(this)}><img src={deleteIcon} /></button>
      </div>
    );
  }
}

export default ImageItem;