import React, { Component } from 'react'
import ImageList from '../components/ImageList.js'
import AddImageButton from '../components/AddImageButton.js'
import { connect } from 'react-redux';

class MenuItemContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        { url: 'drawing/init_image.png', title: 'Image_Blank' },
      ],
    };
  }

  handleAddImage = () => {
    const newImage = { url: 'drawing/init_image.png', title: 'New Image' };
    this.setState(prevState => ({
      images: [newImage,...prevState.images],
    }));
  }

  handleDeleteImage = (index) => {
    const updatedImages = [...this.state.images];
    updatedImages.splice(index, 1);
    this.setState({ images: updatedImages }, () => {
      if (this.state.images.length === 0) {
        this.handleAddImage();
      }
    });
  } 
  render() {
    let isOpen = this.props.unfold_index === this.props.id;
    let images  = this.state.images;
    return (
      <div className={`content-dropdown ${isOpen ? 'show' : ''}`}>
        {isOpen && (
          <div className='content-list'> 
            <ImageList images={images} onDelete={this.handleDeleteImage} />
            <AddImageButton onClick={this.handleAddImage}/>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    unfold_index: state.unfold_index
  };
};

export default connect(mapStateToProps)(MenuItemContent);