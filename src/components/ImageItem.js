import React, { Component } from 'react'
import deleteIcon from '../assets/image/delete.png';
class ImageItem extends Component {

  handleDelete = () => {
    const { onDelete, index } = this.props;
    console.log(index)
    onDelete(index);
   

  } 
  render() {
    const url = this.props.url;
    const title = this.props.title
    return (
      <div className="image-item">
        <img src={url} alt={title} />
        <button className="delete-button" onClick={this.handleDelete.bind(this)}><img src={deleteIcon} /></button>
      </div>
    );
  }
}

export default ImageItem;