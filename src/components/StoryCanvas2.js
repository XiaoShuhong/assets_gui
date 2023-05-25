import React, { Component } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { connect } from 'react-redux';
import {changeJSON,changeURL} from '../reducer/storypage.js'
class StoryCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [],
      isDrawing: false,
      currentColor: props.color, 
      boardWidth: 0,
      boardHeight: 0,
    };

  }
  componentDidMount() {
    // const boardElement = document.querySelector('.board');
    // this.boardWidth = boardElement.offsetWidth;
    // this.boardHeight = boardElement.offsetHeight;
    this.updateBoardSize();
    window.addEventListener('resize', this.updateBoardSize);
    if (this.props.getUndoFunction) {
      this.props.getUndoFunction(this.undoLastLine);
    }
    
    
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateBoardSize);
  }
  componentDidUpdate(prevProps,prevState) {
    if (prevProps.color !== this.props.color) {
      // If the color prop has changed, update the currentColor state
      this.setState({
        currentColor: this.props.color,
      });
    }

    if (prevProps.unfold_index !== this.props.unfold_index) {
        const prevIndex = prevProps.unfold_index;
        const currentIndex = this.props.unfold_index;
        if (prevIndex === 0 && currentIndex > 0) {
          console.log('open cate ',currentIndex);
          
        }else if (prevIndex > 0 && currentIndex > 0) {
          console.log('change from ',prevIndex, 'to ', currentIndex)
          if(prevProps.image_index>=0){
            const prevCanvasData = this.saveCanvas();
            this.doSaveCanvas(prevIndex,prevProps.image_index,prevCanvasData)
            console.log('save image',prevProps.image_index, 'for ',prevIndex)
          }else{
            // console.log('no image clicked')
          }
    
        }else if (prevIndex > 0 && currentIndex === 0) {
          console.log('close cate ',prevIndex);
          // console.log('image index change to ',this.props.image_index)
          if(prevProps.image_index>=0){
            console.log('save image',prevProps.image_index, 'for ',prevIndex)
            const prevCanvasData = this.saveCanvas();
            this.doSaveCanvas(prevIndex,prevProps.image_index,prevCanvasData)
          }else{
            // console.log('no image clicked')
          }
        }

    }
    if (prevProps.image_index !== this.props.image_index) {
        const prevIndex = prevProps.unfold_index;
        const currentIndex = this.props.unfold_index;
        let curCanvasData;
        if (prevIndex === currentIndex && currentIndex > 0) {
          if(prevProps.image_index===-1){
            console.log('change image from ', prevProps.image_index, 'to ',this.props.image_index, 'at cate ',currentIndex )
            curCanvasData = this.doLoadCanvas(currentIndex,this.props.image_index);
            if(curCanvasData=='placeholder'){
              
              curCanvasData = this.saveEmptyCanvas().dataJSON;
              this.doSaveCanvas(currentIndex,this.props.image_index,curCanvasData);
            }
            this.loadCanvasData(curCanvasData);
          }else{
            console.log('change image from ', prevProps.image_index, 'to ',this.props.image_index, 'at cate ',currentIndex )
            const prevCanvasData = this.saveCanvas();
            // console.log(prevCanvasData)
            this.doSaveCanvas(prevIndex,prevProps.image_index,prevCanvasData)
            // console.log(currentIndex,this.props.image_index)
            curCanvasData = this.doLoadCanvas(currentIndex,this.props.image_index);
            // console.log(curCanvasData)
            if(curCanvasData=='placeholder'){
              curCanvasData = this.saveEmptyCanvas().dataJSON;
              console.log(curCanvasData)
              this.doSaveCanvas(currentIndex,this.props.image_index,curCanvasData);
              
            }
            this.loadCanvasData(curCanvasData);
          }
          
        }
    }
  }

  updateBoardSize = () => {
    const boardElement = document.querySelector('.board');
    if (boardElement) {
      const boardWidth = boardElement.offsetWidth;
      const boardHeight = boardElement.offsetHeight;
      this.setState(
        {
          boardWidth,
          boardHeight,
        },
        () => {
          const new_canvas_data = this.saveCanvas();
          if (this.props.role_url.length === 0) {
            this.props.onChange(1, [].concat(new_canvas_data['dataURL']), [].concat(new_canvas_data['dataJSON']));
          }
          if (this.props.scene_url.length === 0) {
            this.props.onChange(2, [].concat(new_canvas_data['dataURL']), [].concat(new_canvas_data['dataJSON']));
          }
          if (this.props.plot_url.length === 0) {
            this.props.onChange(3, [].concat(new_canvas_data['dataURL']), [].concat(new_canvas_data['dataJSON']));
          }
        }
      );
    }
  };
  handleMouseDown = (e) => {
    const  selectedTool  = this.props.tool;
    let strokeWidth=2;
    if (selectedTool === 'pen' || selectedTool === 'brush') {
      this.setState({
        isDrawing: true,
        isErasing: false,
        lines: [...this.state.lines, { points: [e.evt.layerX, e.evt.layerY], color: this.state.currentColor, strokeWidth: strokeWidth }],
      });
    }else if (selectedTool === 'rubber') {
      strokeWidth=10;
      this.setState({
        isDrawing: true,
        isErasing: false,
        lines: [...this.state.lines, { points: [e.evt.layerX, e.evt.layerY], color: '#F9F8FC', strokeWidth: strokeWidth }],
      });
    } else if (selectedTool === 'pot') {
      console.log(this.props.role_json,this.props.role_url)
      console.log(this.props.scene_json,this.props.scene_url)
      console.log(this.props.plot_json,this.props.plot_url)
    }
  };

  handleMouseMove = (e) => {
    const selectedTool = this.props.tool;

    if (!this.state.isDrawing) return;

    const { lines } = this.state;
    const lastLine = lines[lines.length - 1];
    const newPoints = [...lastLine.points, e.evt.layerX, e.evt.layerY];

    if (selectedTool === 'pen' ||selectedTool === 'rubber' ) {
      lastLine.points = newPoints;
    } else if (selectedTool === 'brush') {
      const brushPoints = this.generateBrushPoints(lastLine.points, e.evt.layerX, e.evt.layerY);
      lastLine.points = [...lastLine.points, ...brushPoints];
    }
   

    this.setState({
      lines: [...lines],
    });
  };

  handleMouseUp = () => {
    this.setState({
      isDrawing: false,
    });
  };
  handleMouseLeave = () => {
    this.setState({
      isDrawing: false,
    });
  };
 
  undoLastLine = () => {
    this.setState(state => ({
      lines: state.lines.slice(0, -1),  // 移除最后一条线
    }));
  };

  generateBrushPoints = (points, x, y) => {
    // 生成蜡笔效果的多个点
    const brushSize = 10; // 蜡笔的大小，可以根据需要调整
    const brushPoints = [];
    const prevX = points[points.length - 2];
    const prevY = points[points.length - 1];

    // 计算蜡笔效果的多个点
    for (let i = 0; i < brushSize; i++) {
      const offsetX = Math.random() * brushSize - brushSize / 2;
      const offsetY = Math.random() * brushSize - brushSize / 2;
      const pointX = prevX + (x - prevX) * (i / brushSize) + offsetX;
      const pointY = prevY + (y - prevY) * (i / brushSize) + offsetY;
      brushPoints.push(pointX, pointY);
      }
      return brushPoints;
  }

  doSaveCanvas= (cate, index, canvasData)=> {
    let newURL = [];
    let newJSON = [];
    switch (cate){
      case 1:
        newURL = [...this.props.role_url];
        newJSON = [...this.props.role_json];
        break;
      case 2:
        newURL = [...this.props.scene_url];
        newJSON = [...this.props.scene_json];
        break;
      case 3:
        newURL = [...this.props.plot_url];
        newJSON = [...this.props.plot_json];
        break;
      default:
        return;
    }
    newURL[index] = canvasData.dataURL;
    newJSON[index] = canvasData.dataJSON;
    console.log(newURL,newJSON,'in dosave')
    this.props.onChange(cate, newURL, newJSON);
  }

  doLoadCanvas= (cate, index)=> {
    let newJSON;
    switch (cate){
      case 1:
        newJSON =this.props.role_json[index];
        break;
      case 2:
        newJSON =this.props.scene_json[index];
        break;
      case 3:
        newJSON = this.props.plot_json[index];
        break;
      default:
        return newJSON;
    }
    return newJSON
  }


  saveCanvas = () => {
  // Get the current view as a base64 encoded PNG
  const dataURL = this.stageRef.getStage().toDataURL();

  // Save the lines array and other state information as a JSON object
  const dataObj = {
    lines: this.state.lines,
    boardWidth: this.state.boardWidth,
    boardHeight: this.state.boardHeight,
  };
  // Store the JSON object as a string
  const dataJSON = JSON.stringify(dataObj);

  return {dataURL, dataJSON};
};

saveEmptyCanvas = () => {
  // Get the current view as a base64 encoded PNG
  const dataURL = this.stageRef.getStage().toDataURL();

  // Save the lines array and other state information as a JSON object
  const dataObj = {
    lines: [],
    boardWidth: this.state.boardWidth,
    boardHeight: this.state.boardHeight,
  };
  // Store the JSON object as a string
  const dataJSON = JSON.stringify(dataObj);

  return {dataURL, dataJSON};
};

  loadCanvasData = (canvasJson) => {
    try {
      const { lines, boardWidth, boardHeight } = JSON.parse(canvasJson);
      this.setState({
        lines,
        boardWidth,
        boardHeight,
      });
    } catch (error) {
      console.error('Error loading canvas data:', error);
    }
  };

  render() {
    const { lines, boardWidth, boardHeight } = this.state;
    //初始化
    

    return (
      <Stage
        width={boardWidth}
        height={boardHeight}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onMouseLeave={this.handleMouseLeave}
        ref={ref => { this.stageRef = ref; }}
      >
        <Layer>
          {lines.map((line, index) => (
            <Line
              key={index}
              points={line.points}
              stroke={line.color} // Use the stored color for each line
              strokeWidth={line.strokeWidth}
              lineCap="round"
              tension={0.5}
            />
          ))}
        </Layer>
      </Stage>
    );
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

export default connect(mapStateToProps,mapDispatchToProps)(StoryCanvas);