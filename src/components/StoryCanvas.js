import React, { Component } from 'react';
import { Stage, Layer, Line, Image, Transformer  } from 'react-konva';
import { connect } from 'react-redux';
import { Slider } from 'antd';

class StoryCanvas extends Component {
  constructor(props) {
    super(props);
    const initialData =this.loadCanvasData(this.props.json);
    
    this.state = {
      lines: initialData.lines || [],
      isDrawing: false,
      currentColor: this.props.color, 
      boardWidth: initialData.boardWidth ||0,
      boardHeight: initialData.boardHeight ||0,
      cate_id:this.props.cate_id,
      image_id:this.props.image_id,
      image:this.props.image,
      strokeWidth: 5,
      selectedNode: null,
      showImage: this.props.refined_image!=='placeholder'
      // ,
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
      if(this.transformer){
        this.transformer.detach(); // Detach the Transformer from the image
        this.setState({ selectedNode: null }); // Deselect the image
      }
    const is_refined = this.checkShowImage()
    this.setState({showImage:is_refined})
  }
  if(prevProps.image!==this.props.image){
    
    this.setState({image:this.props.image})
    
  }
  if(prevState.image!==this.state.image&& this.state.image!==null){
   
    const oldCanvasData = this.saveCanvas();
    this.props.onUpdateCanvas(this.state.cate_id, this.state.image_id, oldCanvasData); 
  }
  if(prevProps.tool!==this.props.tool){
    if(prevProps.tool=='hand' && this.props.tool !== 'hand') {
      console.log(this.transformer)
      if(this.transformer){
        this.transformer.detach(); // Detach the Transformer from the image
        this.setState({ selectedNode: null }); // Deselect the image
      }
      
    }
  }

}
checkShowImage= () => {
  if(this.props.unfold_index==1){
    if(this.props.role_image[this.props.image_index]!=='placeholder'){
      return true
    }else{
      return false
    }
    
  }else if(this.props.unfold_index===2){
    if(this.props.scene_image[this.props.image_index]!=='placeholder'){
      return true
    }else{
      return false
    }
  }
}
toggleShowImage = () => {
  this.setState(state => ({
    showImage: !state.showImage
  }));
}


handleImageClick = (e) => {
  if(this.props.tool === 'hand') {
  this.imageNode = e.target;
  this.transformer.attachTo(e.target);
  this.setState({ selectedNode: this.imageNode });
};
}
saveCanvas = () => {
  let minX = this.state.boardWidth;
  let maxX = 0;
  let minY = this.state.boardHeight;
  let maxY = 0;
  const padding = 30
  this.state.lines.forEach(line => {
    const xCoords = line.points.filter((_, i) => i % 2 === 0);
    const yCoords = line.points.filter((_, i) => i % 2 === 1);

    minX = Math.min(minX, ...xCoords);
    maxX = Math.max(maxX, ...xCoords);
    minY = Math.min(minY, ...yCoords);
    maxY = Math.max(maxY, ...yCoords);
  });

  // Account for the image in the bounding box
  if (this.state.image!==null) {
    minX = Math.min(minX, (this.state.boardWidth - this.state.image.width) / 2); // Image x position
    maxX = Math.max(maxX, (this.state.boardWidth - this.state.image.width) / 2 + this.state.image.width); // Image x position + width
    minY = Math.min(minY, (this.state.boardHeight - this.state.image.height) / 2); // Image y position
    maxY = Math.max(maxY, (this.state.boardHeight - this.state.image.height) / 2 + this.state.image.height); // Image y position + height
  }

  const dataURL = this.stageRef.getStage().toDataURL({
    x: minX- padding,
    y: minY - padding,
    width: maxX - minX + 2*padding,
    height: maxY - minY + 2*padding,
  });

  const dataObj = {
    lines: this.state.lines,
    boardWidth: this.state.boardWidth,
    boardHeight: this.state.boardHeight,
  };

  const dataJSON = JSON.stringify(dataObj);

  return { dataURL, dataJSON };
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
    // if (this.props.refined_image!='placeholder'){
    //   return { lines, boardWidth, boardHeight }
    // }
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
    }else if(selectedTool === 'hand'){

      if (e.target === this.imageNode) {
        this.transformer.attachTo(e.target);  // Attach the Transformer to the clicked image
        this.setState({ selectedNode: e.target });  // Set selectedNode to the clicked image
      } else {
        this.setState({ selectedNode: null });
      }
    };
    }

    

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
    const { lines, boardWidth, boardHeight, image , strokeWidth, showImage } = this.state;
  
    
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

          {showImage ? (
              image && (
                // Existing Image component...
                <>
              <Image
                ref={node => {
                  this.imageNode = node;
                }}
                image={image}
                name = 'refined_image'
                x={(this.state.boardWidth - image.width) / 2} // 计算x坐标，使图像居中
                y={(this.state.boardHeight - image.height) / 2 } // 计算y坐标，使图像居中
                height={image.height}
                width={image.width}
                opacity={1}
                draggable={this.props.tool === 'hand'}
                onClick={this.handleImageClick}
              />
              <Transformer
                ref={node => {
                  this.transformer = node;
                }}
                visible={this.state.selectedNode !== null}
              />
            </> 
              )
            ) : (
              lines.map((line, index) => (
                <Line
                key={index}
                points={line.points}
                stroke={line.color} // Use the stored color for each line
                strokeWidth={line.strokeWidth}
                lineCap="round"
                tension={0.5}
              />
              
              ))
            )}
            
          </Layer>
        </Stage>
       <div className='sliderbar'>
        <Slider vertical  min={1} max={20} defaultValue={5} onChange={this.handleStrokeWidthChange}  value={strokeWidth}/>
        
        {this.state.image !== null && (
          <button onClick={this.toggleShowImage} className='showimage'>
            {showImage ? 'Switch to Line' : 'Switch to Image'}
          </button>
        )}
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