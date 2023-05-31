import React, { Component } from 'react'
import StoryCanvas from '../components/StoryCanvas.js'
import ColorBar from '../components/ColorBar.js'
import ToolBar from '../components/ToolBar.js'
import InspirationList from './InspirationList.js'
import { connect } from 'react-redux';
import {changeJSON,changeURL} from '../reducer/storypage.js'
import back from '../assets/image/surface.png'
import PlotCanvas from '../components/PlotCanvas.js'
class DrawingBoard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedColor: '#000000',
      selectedTool: 'pen',

    };
  }

 
  handleColorSelect = (color) => {
    this.setState({ selectedColor: color });
  };

  handleToolSelect = (tool) => {
    if (tool === 'redo') {
      // 执行撤销操作
      if (this.undoLastLine) {
        this.undoLastLine();
      }
    } else {
      // 如果选中的不是 "redo"，则更新工具选择
      this.setState({ selectedTool: tool });
    }
    
  };

  // componentDidUpdate(prevProps) {
  //   // 检查 this.props.role_json 的变化
  //   if (this.props.role_json !== prevProps.role_json) {
  //     // 执行希望在更新后重新渲染组件的操作
  //     console.log('role_json 更新了:', this.props.role_json);
  //     console.log(this.props.image_index)
  //     this.setState({cate:this.props.unfold_index , onimg:this.props.image_index})
  //     // 进行其他操作或重新渲染组件
  //   }
  // }


  getUndoFunction = (undoFunction) => {
    this.undoLastLine = undoFunction;
  };
  handleCanvasUpdate= (cate_id, img_id, canvasdata) => {
    console.log('before',cate_id,img_id,canvasdata)
    const oldcanvas = this.getCanvasData(cate_id)
    this.doSaveCanvas(oldcanvas,canvasdata,cate_id,img_id)
    console.log('after',this.props.role_json,this.props.role_json)
    

    

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
 

  render() {
    const colors = ['#000000', '#FFD2F2', '#D999FF', '#A159D3', '#E15534', '#FFB95C', '#FEF893', '#76BF86', '#37A396', '#038ECA'];
    const { selectedColor, selectedTool } = this.state;
    const canvas_json = this.LoadCanvasJSON(this.props.unfold_index,this.props.image_index)
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
            />
            <ColorBar onColorSelect={this.handleColorSelect} platte={colors} />
            <ToolBar onToolSelect={this.handleToolSelect} />
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
  };
};



const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (id,url,json) => {
      dispatch(changeJSON(id,json));
      dispatch(changeURL(id,url));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DrawingBoard);