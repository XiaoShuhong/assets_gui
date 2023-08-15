import React, { Component } from 'react';
import { connect } from 'react-redux';
import NaviBar from './NaviBar.js';
import DrawingBoard from './DrawingBoard.js';
import FloatButtonList from './FloatButtonList.js';
import { ImgIndex, askHelp } from '../reducer/storypage.js';

class StoryPage extends Component {
  componentDidUpdate(prevProps) {
    const { unfold_index, image_index, onChangeImgIndex, onChangeHelp } = this.props;

    if (unfold_index !== prevProps.unfold_index) {
      onChangeImgIndex(-1);
    }

    if (unfold_index !== prevProps.unfold_index || image_index !== prevProps.image_index) {
      onChangeHelp();
    }
  }

  handleClickImage = (index) => {
    this.props.onChangeImgIndex(index);
  }

  render() {
    const { unfold_index, image_index } = this.props;

    return (
      <div className='storypage'>
        <NaviBar onClickImage={this.handleClickImage} />
        <DrawingBoard />
        <FloatButtonList unfold_index={unfold_index} image_index={image_index} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  unfold_index: state.unfold_index,
  image_index: state.image_index,
  help: state.help
});

const mapDispatchToProps = dispatch => ({
  onChangeImgIndex: img_index => dispatch(ImgIndex(img_index)),
  onChangeHelp: () => dispatch(askHelp(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryPage);
