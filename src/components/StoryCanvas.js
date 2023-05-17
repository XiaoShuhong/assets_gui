import React, { Component } from 'react';
import { Stage, Layer, Line } from 'react-konva';

export default class StoryCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [],
      isDrawing: false,
      currentColor: props.color, 
      boardWidth: 0,
      boardHeight: 0,
    };
    // console.log(this.props.tool)
    // console.log(this.state.currentColor)
  }
  componentDidMount() {
    // const boardElement = document.querySelector('.board');
    // this.boardWidth = boardElement.offsetWidth;
    // this.boardHeight = boardElement.offsetHeight;
    this.updateBoardSize();
    window.addEventListener('resize', this.updateBoardSize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateBoardSize);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.color !== this.props.color) {
      // If the color prop has changed, update the currentColor state
      this.setState({
        currentColor: this.props.color,
      });
    }
  }

  updateBoardSize = () => {
    const boardElement = document.querySelector('.board');
    if (boardElement) {
      this.setState({
        boardWidth: boardElement.offsetWidth,
        boardHeight: boardElement.offsetHeight,
      });
    }
  };
  handleMouseDown = (e) => {
    const  selectedTool  = this.props.tool;

    if (selectedTool === 'pen' || selectedTool === 'brush') {
      this.setState({
        isDrawing: true,
        isErasing: false,
        lines: [...this.state.lines, { points: [e.evt.layerX, e.evt.layerY], color: this.state.currentColor }],
      });
    }

  };

  handleMouseMove = (e) => {
    const selectedTool = this.props.tool;

    if (!this.state.isDrawing) return;

    const { lines } = this.state;
    const lastLine = lines[lines.length - 1];
    const newPoints = [...lastLine.points, e.evt.layerX, e.evt.layerY];

    if (selectedTool === 'pen') {
      // 绘制笔触
      lastLine.points = newPoints;
    } else if (selectedTool === 'brush') {
      // 绘制蜡笔效果，通过添加多个点实现
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
  handleEraser = (x, y) => {
    
  }

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
    const { lines, boardWidth, boardHeight } = this.state;

    return (
      <Stage
        width={boardWidth}
        height={boardHeight}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        onMouseLeave={this.handleMouseLeave}
      >
        <Layer>
          {lines.map((line, index) => (
            <Line
              key={index}
              points={line.points}
              stroke={line.color} // Use the stored color for each line
              strokeWidth={2}
              lineCap="round"
              tension={0.5}
            />
          ))}
        </Layer>
      </Stage>
    );
  }
}
