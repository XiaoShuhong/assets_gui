import React, { Component } from 'react'
import StoryCanvas from '../components/StoryCanvas.js'
import ColorBar from '../components/ColorBar.js'
import ToolBar from '../components/ToolBar.js'
import InspirationList from './InspirationList.js'
import { connect } from 'react-redux';
import {changeJSON,changeURL,changeRefinedImage} from '../reducer/storypage.js'
import back from '../assets/image/surface.png'
import PlotCanvas from '../components/PlotCanvas.js'
class DrawingBoard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedColor: '#000000',
      selectedTool: 'pen',
      is_generate:false,
      image:null,
      show_tool:true
    };
    
  }
  setGenerate = (value) => {
    this.setState({ is_generate: value });
  };
  handleColorSelect = (color) => {
    this.setState({ selectedColor: color });
  };

  handleToolSelect = (tool) => {
    if (tool === 'redo') {
      // 执行撤销操作
      if (this.undoLastLine) {
        this.undoLastLine();
      }
    }else if(tool === 'pot'){
      // console.log('pot')
      // this.refineDrawing()
      // this.refineDrawing()
    }
     else {
      // 如果选中的不是 "redo"，则更新工具选择
      this.setState({ selectedTool: tool });
    }
    
  };

  componentDidUpdate(prevProps, prevState) {
    // 检查 this.props.role_json 的变化
    if(prevState.is_generate!==this.state.is_generate &&this.state.is_generate===true){
      this.refineDrawing()
    }
    if((this.props.unfold_index===1||this.props.unfold_index===2)&&(prevProps.image_index !== this.props.image_index || prevProps.unfold_index !== this.props.unfold_index)){
  
      let url
      
      if(this.props.unfold_index===1){
        url = this.props.role_image[this.props.image_index]
      }else if(this.props.unfold_index===2){
        url = this.props.scene_image[this.props.image_index]
      }
      if(url!=='placeholder'&&url!==undefined){
        console.log(url)
        const image = new window.Image();
        image.src =url.img

        console.log(image)
        image.onload = () => {
          
        // Make sure to update state only when image is loaded, to prevent unnecessary re-renders
          this.setState({
            image: image,
        
        });
        }
      }else{
        this.setState({
          image: null,
      
      });
      }
    }
   
  }


  getUndoFunction = (undoFunction) => {
    this.undoLastLine = undoFunction;
  };
  handleCanvasUpdate= (cate_id, img_id, canvasdata) => {
    // console.log('before',cate_id,img_id,canvasdata)
    const oldcanvas = this.getCanvasData(cate_id)
    this.doSaveCanvas(oldcanvas,canvasdata,cate_id,img_id)
    // console.log('after',this.props.role_json,this.props.role_json)
    

    

  };

  getCanvasData=(cate_id) => {
    let CanvasURL, CanvasJSON;
    switch(cate_id){
      case 1:
        CanvasURL=this.props.role_url;
        CanvasJSON=this.props.role_json;
        break;
      case 2:
        CanvasURL=this.props.scene_url;
        CanvasJSON=this.props.scene_json;
        break;
      case 3:
        CanvasURL=this.props.plot_url;
        CanvasJSON=this.props.plot_json;
        break;
    }
    return {CanvasURL,CanvasJSON}
  };

  doSaveCanvas= (oldcanvas, canvasData,cate_id,img_id)=> {
    // console.log(oldcanvas)
    let newURL = [...oldcanvas.CanvasURL];
    let newJSON = [...oldcanvas.CanvasJSON];
    // console.log(canvasData)
    newURL[img_id] = canvasData.dataURL;
    newJSON[img_id]= canvasData.dataJSON;
    // console.log(newURL,newJSON)
    this.props.onChange(cate_id, newURL, newJSON);
  }

  updateRefinedImage= (cate, id, url) => {
    let img_list 
    if(cate===1){
      img_list = this.props.role_image
    }else if(cate===2){
      img_list = this.props.scene_image
    }
    img_list[id] = {img: url}
    this.props.onChangeImage(cate,img_list)

    // const oldCanvas = this.getCanvasData(cate)
    // const oldUrlList = oldCanvas.CanvasURL;
    // const oldJsonList = oldCanvas.CanvasJSON
    // const oldJson = oldJsonList[id]
    // let dataObj  = JSON.parse(oldJson);
    // dataObj.images = [{img: url, x: 100, y: 100}];
    // let newJson = JSON.stringify(dataObj);
    // oldJsonList[id] = newJson
    // this.props.onChange(cate, oldUrlList, oldJsonList);

  }
  LoadCanvasJSON= (cate, index)=> {
    let newJSONLIST;
    switch (cate){
      case 1:
        newJSONLIST =this.props.role_json;
        break;
      case 2:
        newJSONLIST =this.props.scene_json;
        break;
      case 3:
        newJSONLIST = this.props.plot_json;
        break;
      default:
        return 'placeholder';
    }
    if(index>newJSONLIST.length-1){
      // return 'placeholder'
    }else{
      return newJSONLIST[index]
    }
  }

  base64ToBlob(base64, mime) {
    mime = mime || '';
    var sliceSize = 1024;
    var byteChars = window.atob(base64);
    var byteArrays = [];

    for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
        var slice = byteChars.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: mime});
}



  refineDrawing= () => {

    const drawingURL = this.getCanvasData(this.props.unfold_index).CanvasURL[this.props.image_index]
    var formData = new FormData();
    formData.append('url', drawingURL);
    formData.append('id', (this.props.act+1).toString());
    let askterm
    if (this.props.unfold_index==1){
      askterm='role'
    }
    else if(this.props.unfold_index==2){
      askterm='background'
    }
    formData.append('askterm', askterm);
    fetch('http://127.0.0.1:5000/generate_img_to_img', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {  
      console.log(data.status)
      const new_imgURL =  URL.createObjectURL(this.base64ToBlob(data.url, 'image/png'))
      this.updateRefinedImage(this.props.unfold_index, this.props.image_index, new_imgURL)
      this.setState({is_generate:false})
      const image = new window.Image();
      image.src =new_imgURL
      image.onload = () => {
      // Make sure to update state only when image is loaded, to prevent unnecessary re-renders
        this.setState({
          image: image,
       
      });
    };
    })
    .catch((error) => {
      console.error('Error:', error);
  });
  }
  clickfold = () => {
    console.log('click')
    this.setState({show_tool:false})
  }
  clickunfold= () => {
    console.log('click')
    this.setState({show_tool:true})
  }

  render() {
    const colors = ['#000000', '#FFD2F2', '#D999FF', '#A159D3', '#E15534', '#FFB95C', '#FEF893', '#76BF86', '#37A396', '#038ECA'];
    const { selectedColor, selectedTool } = this.state;
    const canvas_json = this.LoadCanvasJSON(this.props.unfold_index,this.props.image_index)
    let refined_image
   
    if(this.props.unfold_index===1){
      refined_image = this.props.role_image[this.props.image_index]
    }else if(this.props.unfold_index===2){
      refined_image = this.props.scene_image[this.props.image_index]
    }
    // console.log(canvas_json)
    // const canvas_json = this.LoadCanvasJSON(this.state.cate,this.props.onimg)

   
    return (
      <div>
      {this.props.unfold_index > 0 && this.props.image_index > -1 ? (
        this.props.unfold_index === 1 || this.props.unfold_index === 2 ? (
          <div className='board'>
            <StoryCanvas
              getUndoFunction={this.getUndoFunction}
              color={selectedColor}
              tool={selectedTool}
              json={canvas_json}
              onUpdateCanvas={this.handleCanvasUpdate}
              cate_id={this.props.unfold_index}
              image_id={this.props.image_index}
              refined_image = {refined_image}
              is_generate={this.state.is_generate}
              setGenerate={this.setGenerate}
              image = {this.state.image}
            />
            {this.state.show_tool && <ColorBar onColorSelect={this.handleColorSelect} platte={colors} />} 
            <ToolBar onToolSelect={this.handleToolSelect} setGenerate={this.setGenerate} onClickFold={this.clickfold} onClickUnFold={this.clickunfold} is_show={this.state.show_tool}/>
            <InspirationList/>
          </div>
        ) : this.props.unfold_index === 3 ? (
          <div className='board'>
            <PlotCanvas 
              json={canvas_json}
            />
            
            <InspirationList/>
          </div>
          
         
        ) : null
      ) : (
        <div className='surfaceimg'>
          <img src={back} />
        </div>
      )}
    </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
    unfold_index: state.unfold_index,
    image_index: state.image_index,
    role_json: state.role_json,
    scene_json: state.scene_json,
    plot_json: state.plot_json,
    role_url: state.role_url,
    scene_url: state.scene_url,
    plot_url: state.plot_url,
    role_image: state.role_image,
    scene_image: state.scene_image,
    act:state.act
  };
};



const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (id,url,json) => {
      dispatch(changeJSON(id,json));
      dispatch(changeURL(id,url));
    },
    onChangeImage: (id,image) => {
      dispatch(changeRefinedImage(id,image));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DrawingBoard);