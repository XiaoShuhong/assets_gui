import React, { Component } from 'react';
import Pen from '../assets/image/pen.png'
import PenSelected from '../assets/image/pen_select.png'
import Rubber from '../assets/image/rubber.png'
import RubberSelected from '../assets/image/rubber_select.png'
import Brush from '../assets/image/brush.png'
import BrushSelected from '../assets/image/brush_select.png'
import Pot from '../assets/image/pot.png'
import PotSelected from '../assets/image/pot_select.png'
import Redo from '../assets/image/redo.png'
import RedoSelected from '../assets/image/redo_select.png'
import Shape1 from '../assets/image/shape1.png'
import Shape1Selected from '../assets/image/shape1_select.png'
import ArrowUp from '../assets/image/arrowup.png'
import ArrowDown from '../assets/image/arrowdown.png'
export default class ToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTool: 'pen', // 默认选中铅笔工具
      isRedoActive: false,
      isShapeMenuOpen: false,
      selectedShape: 'shape1',
    };
  }

  handleToolClick = (tool) => {
    let pre_tool = this.state.activeTool;
    this.setState({ activeTool: tool });
   
    if (tool === 'redo') {
      this.setState({ isRedoActive: true });

      setTimeout(() => {
        this.setState({ isRedoActive: false });
        this.handleToolClick(pre_tool);
      }, 100);
      
    }
    this.props.onToolSelect(tool);
  };

  render() {
    const { activeTool, isRedoActive  } = this.state;

    return (
      <div className="toolbar">
        <ToolButton
          tool="redo"
          active={activeTool === 'redo'}
          onClick={this.handleToolClick}
          isRedoActive={isRedoActive}
        >
          {activeTool === 'redo' && isRedoActive ? (
            <img src={RedoSelected} alt="redo" />
          ) : (
            <img src={Redo} alt="redo" />
          )}
        </ToolButton>

        <ToolButton
          tool="pen"
          active={activeTool === 'pen'}
          onClick={this.handleToolClick}
        >
          {activeTool === 'pen' ? (
            <img src={PenSelected} alt="Pen" />
          ) : (
            <img src={Pen} alt="Pen" />
          )}
        </ToolButton>

        <ToolButton
          tool="brush"
          active={activeTool === 'brush'}
          onClick={this.handleToolClick}
        >
          {activeTool === 'brush' ? (
            <img src={BrushSelected} alt="brush" />
          ) : (
            <img src={Brush} alt="brush" />
          )}
        </ToolButton>

        <ToolButton
          tool="rubber"
          active={activeTool === 'rubber'}
          onClick={this.handleToolClick}
        >
          {activeTool === 'rubber' ? (
            <img src={RubberSelected} alt="rubber" />
          ) : (
            <img src={Rubber} alt="rubber" />
          )}
        </ToolButton>

        <ToolButton
          tool="pot"
          active={activeTool === 'pot'}
          onClick={this.handleToolClick}
        >
          {activeTool === 'pot' ? (
            <img src={PotSelected} alt="pot" />
          ) : (
            <img src={Pot} alt="pot" />
          )}
        </ToolButton>

        <ShapeButton
          tool = "shape"
          active={activeTool === 'shape'}
          onClick={this.handleToolClick}
        >
        </ShapeButton>

        
      </div>
    );
  }
}

class ToolButton extends Component {
  handleClick = () => {
    const { tool, onClick } = this.props;
    onClick(tool); // 调用父组件传递的回调函数，并将工具名称作为参数传递
  };

  render() {
    const { tool, active,children } = this.props;
    

    return (
      <div className='toolbutton' onClick={this.handleClick}>
        {children}
      </div>
    );
  }
}

class ShapeButton extends Component{
  constructor(props) {
    super(props);
    this.state = {
      showShapeBar: false, // Initial state: shapebar is hidden
    };
  }

  handleClick = () => {
    const { tool, onClick } = this.props;
    onClick(tool); // 调用父组件传递的回调函数，并将工具名称作为参数传递
  };

  handleToggleShapeBar = () => {
    this.setState((prevState) => ({
      showShapeBar: !prevState.showShapeBar, // Toggle the state of showShapeBar
    }));
  };
  render(){
    const { tool, active } = this.props;
    const { showShapeBar } = this.state;
    const arrowIcon = showShapeBar ? <img src={ArrowDown} alt="Toggle Menu" /> : <img src={ArrowUp} alt="Toggle Menu" />;
    return (
      <div>
        <div className="shape-button">
          <div className="toolbutton" onClick={this.handleClick}>
                {active ? (
                  <img src={Shape1Selected} alt="Shape" />
                ) : (
                  <img src={Shape1} alt="Shape" />
                )}
          </div>
          <div className="shape-menu-toggle"  onClick={this.handleToggleShapeBar}>  
              {/* onClick={this.handleToggleMenu} */}
              {arrowIcon}
          </div>
        </div>
        {showShapeBar &&<div className="shapebar">
            暂时不写
          </div>}
      </div>
      
    );
  }
}