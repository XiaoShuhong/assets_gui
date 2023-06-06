import React, { Component } from 'react';
import { Stage, Layer, Line, Image } from 'react-konva';
import { connect } from 'react-redux';
import { Slider } from 'antd';

class StoryCanvas extends Component {
  constructor(props) {
    super(props);
    const initialData =this.loadCanvasData(this.props.json);
    this.state = {
      lines: initialData.lines || [],
      isDrawing: false,
      currentColor: props.color, 
      boardWidth: initialData.boardWidth ||0,
      boardHeight: initialData.boardHeight ||0,
      cate_id:this.props.cate_id,
      image_id:this.props.image_id,
      image:this.props.image,
      strokeWidth: 8
     
  };
}

componentDidMount() {
  // this.loadImage();
  this.updateBoardSize();
  window.addEventListener('resize', this.updateBoardSize);
  if (this.props.getUndoFunction) {
    this.props.getUndoFunction(this.undoLastLine);
  }



}
componentWillUnmount() {
  window.removeEventListener('resize', this.updateBoardSize);
  const newCanvasData=this.saveCanvas()
  // console.log(newCanvasData)
  this.props.onUpdateCanvas(this.state.cate_id, this.state.image_id, newCanvasData)
}
componentDidUpdate(prevProps,prevState) {
  if (prevProps.color !== this.props.color) {
    // If the color prop has changed, update the currentColor state
    this.setState({
      currentColor: this.props.color,
    });
  }
  if(prevState.isDrawing!==this.state.isDrawing){
    const oldCanvasData = this.saveCanvas();
    this.props.onUpdateCanvas(this.state.cate_id, this.state.image_id, oldCanvasData);
  }
  if(prevProps.image_index !== this.props.image_index || prevProps.unfold_index !== this.props.unfold_index){
    const initialData = this.loadCanvasData(this.props.json);
    this.setState({
        lines: initialData.lines || [],
        // boardWidth: initialData.boardWidth || 0,
        // boardHeight: initialData.boardHeight || 0,
        cate_id: this.props.cate_id,
        image_id: this.props.image_index,
        image:this.props.image
        // images: initialData.images || [],
      });
  }
  if(prevProps.image!==this.props.image){
    console.log('here')
    
    this.setState({image:this.props.image})
    
  }
  if(prevState.image!==this.state.image&& this.state.image!==null){
    console.log('here2')
    const oldCanvasData = this.saveCanvas();
    this.props.onUpdateCanvas(this.state.cate_id, this.state.image_id, oldCanvasData); 
  }

}


saveCanvas= () => {
  const dataURL = this.stageRef.getStage().toDataURL();

    // Save the lines array and other state information as a JSON object
    const dataObj = {
      lines: this.state.lines,
      boardWidth: this.state.boardWidth,
      boardHeight: this.state.boardHeight,
      // images: this.state.images
    };
    // Store the JSON object as a string
    const dataJSON = JSON.stringify(dataObj);

    return {dataURL, dataJSON};
};

updateBoardSize = () => {
  const boardElement = document.querySelector('.board');
  if (boardElement) {
    const boardWidth = boardElement.offsetWidth;
    const boardHeight = boardElement.offsetHeight;
    this.setState(
      {
        boardWidth,
        boardHeight,
      }
    );
  }
};

  loadCanvasData = (canvasJson) => {
    let lines=[];
    let boardWidth=0;
    let boardHeight=0;
    if (this.props.refined_image!='placeholder'){
      return { lines, boardWidth, boardHeight }
    }
    if(canvasJson!=='placeholder'){
      return JSON.parse(canvasJson);
    }
    return { lines, boardWidth, boardHeight }
    
  };


  handleMouseDown = (e) => {
    const  selectedTool  = this.props.tool;
    let strokeWidth=this.state.strokeWidth;

    if (selectedTool === 'pen' || selectedTool === 'brush') {
      this.setState({
        isDrawing: true,
        isErasing: false,
        lines: [...this.state.lines, { points: [e.evt.layerX, e.evt.layerY], color: this.state.currentColor, strokeWidth: strokeWidth }],
      });
    }else if (selectedTool === 'rubber') {
      this.setState({
        isDrawing: true,
        isErasing: false,
        lines: [...this.state.lines, { points: [e.evt.layerX, e.evt.layerY], color: '#F9F8FC', strokeWidth: strokeWidth }],
      });
    } 
  };

  handleStrokeWidthChange = value => {
    this.setState({ strokeWidth: value });
  }


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

render() {
    const { lines, boardWidth, boardHeight, image , strokeWidth } = this.state;
    return (
      <div>
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
            {image && (
              <Image
                image={image}
                x={100} // Set your x coordinate
                y={100} // Set your y coordinate
                height={400}
                width={400}
                opacity={1}
        
                // Add any other props you need, such as width, height, scale, etc.
              />
            )}
          </Layer>
        </Stage>
       <div className='sliderbar'>
        <Slider vertical  min={1} max={20} defaultValue={8} onChange={this.handleStrokeWidthChange}  value={strokeWidth}/>
        </div>
      </div>
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
    role_image: state.role_image,
    scene_image: state.scene_image
  };
};



// const mapDispatchToProps = (dispatch) => {
//   return {
//     onChange: (id,url,json) => {
//       dispatch(changeJSON(id,json));
//       dispatch(changeURL(id,url));
//     }
//   }
// }

export default connect(mapStateToProps)(StoryCanvas);