import React, { Component } from 'react'

export default class StoryCanvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const boardElement = document.querySelector('.board');
    const boardWidth = boardElement.offsetWidth;
    const boardHeight = boardElement.offsetHeight;
    
    const canvasElement = this.canvasRef.current;
    canvasElement.width = boardWidth;
    canvasElement.height = boardHeight;

    const ctx = canvasElement.getContext('2d');
    canvasElement.addEventListener('mousedown', this.startDrawing);
    canvasElement.addEventListener('mousemove', this.draw);
    canvasElement.addEventListener('mouseup', this.stopDrawing);
    canvasElement.addEventListener('mouseleave', this.stopDrawing);
  }

  startDrawing = (e) => {
    const canvasElement = this.canvasRef.current;
    const ctx = canvasElement.getContext('2d');
    const rect = canvasElement.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);

    this.isDrawing = true;
  };

  draw = (e) => {
    if (!this.isDrawing) return;

    const canvasElement = this.canvasRef.current;
    const ctx = canvasElement.getContext('2d');
    const rect = canvasElement.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  stopDrawing = () => {
    this.isDrawing = false;
  };

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}


