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

  getUndoFunction = (undoFunction) => {
    this.undoLastLine = undoFunction;
  };

  render() {
    const colors = ['#000000', '#FFD2F2', '#D999FF', '#A159D3', '#E15534', '#FFB95C', '#FEF893', '#76BF86', '#37A396', '#038ECA'];
    const { selectedColor, selectedTool } = this.state;

   
    return (
      <div className='board'>
        <StoryCanvas getUndoFunction={this.getUndoFunction} color={selectedColor} tool={selectedTool}/>
        <ColorBar onColorSelect={this.handleColorSelect} platte={colors} />
        <ToolBar onToolSelect={this.handleToolSelect} />
      </div>
    )
  }
}



