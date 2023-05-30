
import React, { Component } from 'react'
import { connect } from 'react-redux';
import NaviBar from './NaviBar.js'
import DrawingBoard from './DrawingBoard.js'
import FloatButtonList from './FloatButtonList.js'
import {ImgIndex,askHelp} from '../reducer/storypage.js'
class StoryPage extends Component {
  constructor(props) {
    super(props);
    
  }
  componentDidUpdate(prevProps) {
    // if unfold_index has changed to 0, set image_index to -1
    if (this.props.unfold_index !== prevProps.unfold_index) {
      this.props.onChangeImgIndex(-1);
    };
    if (
      this.props.unfold_index !== prevProps.unfold_index ||
      this.props.image_index !== prevProps.image_index
    ) {
      this.props.onChangeHelp();
    }
  }
  

  handleClickImage= (index) => {
    this.props.onChangeImgIndex(index);
    
  }



  render() {
    // const { image_index } = this.props;
    // console.log(image_index,'main')
    return (
      <div className='storypage'>
        <NaviBar onClickImage={this.handleClickImage}/>
        <DrawingBoard />
        <FloatButtonList unfold_index={this.props.unfold_index} image_index={this.props.image_index}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    unfold_index: state.unfold_index,
    image_index:state.image_index,
    help:state.help
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onChangeImgIndex: (img_index) => {
      dispatch(ImgIndex(img_index))
    },
    onChangeHelp: ()=>
     {
      dispatch(askHelp(false))
    },
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(StoryPage);