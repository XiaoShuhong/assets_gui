import React, { Component } from 'react'
import ExtenableMenuItem from './ExtenableMenuItem.js'
import srcRole from '../assets/image/role.png'
import srcScene from '../assets/image/scene.png'
import srcPlot from '../assets/image/plot.png'
import { unfoldItem } from '../reducer/storypage';
import { connect } from 'react-redux'

export class ExtenableMenuList extends Component {

constructor(props) {
    super(props);
    this.state = {unfold_id: null};
  } 

  handleUnfold= (index) => {
    
    this.setState({ unfold_id: index }, () => {
      // 在状态更新后立即执行某些操作
      this.props.onChange(index);
    });
    
    
    
    // this.setState({ lastClickedIndex: index });
  } 

  handleClickImage= (index) => {
    const onClickImage = this.props.onClickImage;
    onClickImage(index);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.unfold_index !== this.props.unfold_index) {
      this.setState({
        unfold_id: this.props.unfold_index
      });
    }
  }

render() {
    return (
      <div>
        <ExtenableMenuItem 
          cate='role' srcUrl={srcRole} id={1} isOpen={this.state.unfold_id==1} onChangeFolding={this.handleUnfold} onClickImage={this.handleClickImage}/>
        <ExtenableMenuItem
          cate='scene' srcUrl={srcScene} id={2} isOpen={this.state.unfold_id==2} onChangeFolding={this.handleUnfold} onClickImage={this.handleClickImage}/>
        <ExtenableMenuItem
          cate='plot' srcUrl={srcPlot} id={3} isOpen={this.state.unfold_id==3} onChangeFolding={this.handleUnfold} onClickImage={this.handleClickImage}/>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    unfold_index: state.unfold_index,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (unfold_index) => {
      dispatch(unfoldItem(unfold_index));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExtenableMenuList)