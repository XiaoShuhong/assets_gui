import React, { Component } from 'react'
import ImageItem from './ImageItem.js'
export default class ImageList extends Component {


  handleDeleteImage = (index) => {
    this.props.onDelete(index);
  }
  handleClickImage = (index) => {
    this.props.onClickImage(index);
  }

  render() {
    const images = this.props.images;
    // console.log(images)
    return (
      <div className="image-list">
        {images.map((image, index) => (
          <ImageItem key={index} url={image} 
          onDelete={() => this.handleDeleteImage(index)}
          onClickImage={() => this.handleClickImage(index)}
          index={index} />
        ))}
      </div>
    );
  }
}
