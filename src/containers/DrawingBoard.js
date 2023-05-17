import React, { Component } from 'react'
import StoryCanvas from '../components/StoryCanvas.js'
import ColorBar from '../components/ColorBar.js'
import ToolBar from '../components/ToolBar.js'
export default class DrawingBoard extends Component {

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
    this.setState({ selectedTool: tool });
    console.log(tool)
  };

  render() {
    const colors = ['#000000', '#FFD2F2', '#D999FF', '#A159D3', '#E15534', '#FFB95C', '#FEF893', '#76BF86', '#37A396', '#038ECA'];
    const { selectedColor, selectedTool } = this.state;
    return (
      <div className='board'>
        <StoryCanvas color={selectedColor} tool={selectedTool} />
        <ColorBar onColorSelect={this.handleColorSelect} platte={colors} />
        <ToolBar onToolSelect={this.handleToolSelect} />
      </div>
    )
  }
}

