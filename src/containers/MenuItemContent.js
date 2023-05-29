import React, { Component } from 'react'
import ImageList from '../components/ImageList.js'
import AddImageButton from '../components/AddImageButton.js'
import { connect } from 'react-redux';
import {changeURL,changeJSON,ImgIndex} from '../reducer/storypage.js'

class MenuItemContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cate: this.props.cate,
      // on_image: this.props.image_index
    };

  }

  componentDidUpdate(prevProps, prevState) {
    // 检查unfold_index或者lastClickedIndex是否发生变化
    // if (this.state.image_unsave &&this.state.lastClickedIndex !== prevState.lastClickedIndex && prevState.lastClickedIndex===this.state.images.length) {
    //   // 有任何一个发生变化，则改变image_unsave的状态
    //   this.setState({ image_unsave: false });
    // }
    // if(this.state.on_image!==prevState.on_image){
    //   console.log(this.state.on_image)
    //   this.props.onChangeImgIndex(this.state.on_image)
    //   // console.log('change image index of ',this.state.cate,'from ',prevState.on_image,'to ',this.state.on_image)
    // }
    // if(prevProps.unfold_index!==0 && this.props.unfold_index==0 ){
    //   this.props.onChangeImgIndex(-1)
    //   // console.log('change image index of ',this.state.cate,'from ',prevState.on_image,'to ',this.state.on_image)
    // }

  }

  handleAddImage = () => {
    console.log('add happend')
    let new_url, new_json, id
    switch(this.state.cate){
      case 'role':
        new_url = [...this.props.role_url,'placeholder'];
        new_json = [...this.props.role_json,'placeholder'];
        id =1;
        break;
      case 'scene':
        new_url = [...this.props.scene_url,'placeholder'];
        new_json = [...this.props.scene_json,'placeholder'];
        id =2;
        break;
      case 'plot':
        new_url = [...this.props.plot_url,'placeholder'];
        new_json = [...this.props.plot_json,'placeholder'];
        id=3
        break;
    }
    this.props.onChange(id,new_url,new_json )
    // console.log(new_json,new_url)
    
  }

  handleDeleteImage = (index) => {
    console.log('delete img ', index, 'from cate ', this.props.unfold_index)
    const canvas_data = this.getData(this.props.unfold_index)
    let new_url,new_json;
    new_url = canvas_data.URL.filter((_, i) => i !== index);
    new_json = canvas_data.JSON.filter((_, i) => i !== index);
    console.log(new_url.length)
    if(new_url.length===0){
      new_url=new_url.concat('placeholder');
      new_json=new_json.concat('placeholder');
    }
    console.log(new_url.length)
    this.props.onChange(this.props.unfold_index, new_url, new_json);
  } 

  handleClickImage= (index) => {
    
    const onClickImage = this.props.onClickImage;
    onClickImage(index);
    
    
    
  } 
  getData= (cate_id) => {
    let URL,JSON;
    switch(cate_id){
      case 1:
        URL = this.props.role_url;
        JSON = this.props.role_json;
        return {URL, JSON}
      case 2:
        URL = this.props.scene_url;
        JSON = this.props.scene_json;
        return {URL, JSON}
      case 3:
        URL = this.props.plot_url;
        JSON = this.props.plot_json;
        return {URL, JSON}
    }
    
  } 
  

  render() {
    let isOpen = this.props.isopen;
    let images  
    switch(this.state.cate){
      case 'role':
        images = this.props.role_url;
        break;
      case 'scene':
        images = this.props.scene_url;
        break;
      case 'plot':
        images = this.props.plot_url;
        break;
    }
    return (
      <div className={`content-dropdown ${isOpen ? 'show' : ''}`}>
        {isOpen && (
          <div className='content-list'> 
            <ImageList images={images}  onDelete={this.handleDeleteImage} onClickImage={this.handleClickImage} />
            <AddImageButton onClick={this.handleAddImage}/>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    unfold_index: state.unfold_index,
    role_url: state.role_url,
    scene_url: state.scene_url,
    plot_url: state.plot_url,
    role_json: state.role_json,
    scene_json: state.scene_json,
    plot_json: state.plot_json,
    image_index: state.image_index

    // role_index: state.role_index,
    // scene_index: state.scene_index,
    // plot_index: state.plot_index
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (id,url,json) => {
      dispatch(changeJSON(id,json));
      dispatch(changeURL(id,url));
      // dispatch(ImgIndex(-1))
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(MenuItemContent);