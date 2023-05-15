import React, { Component } from 'react'
import ImageItem from './ImageItem.js'

export default class ImageList extends Component {


  handleDeleteImage = (index) => {
    this.props.onDelete(index);
  }

  render() {
    const images = this.props.images;
    
    return (
      <div className="image-list">
        {images.map((image, index) => (
          <ImageItem key={index} url={image.url} title={image.title} 
          onDelete={() => this.handleDeleteImage(index)}
          index={index} />
        ))}
      </div>
    );
  }
}
