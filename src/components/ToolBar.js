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
import Hand from '../assets/image/hand.png'
import HandSelected from '../assets/image/hand_selected.png'
import unfold from '../assets/image/unfold.png'
import fold from '../assets/image/fold.png'
export default class ToolBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTool: 'pen', // 默认选中铅笔工具
      isRedoActive: false,
      isPotActive: false, 
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

    if (tool === 'pot') {
      this.setState({ isPotActive: true });
      this.props.setGenerate(true)
      setTimeout(() => {
        this.setState({ isPotActive: false });
        this.handleToolClick(pre_tool);
      }, 100);
      
    }

    this.props.onToolSelect(tool);
  };
  handleClickFold= () => {
    this.props.onClickFold();
  }
  handleClickUnFold=() => {
    this.props.onClickUnFold();
  }
  render() {
    const { activeTool, isRedoActive, isPotActive  } = this.state;
    const is_show = this.props.is_show
    return (
      is_show
      ?  <div className="toolbar">
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
          <div>
          <img src={unfold} onClick={this.handleClickFold}/>
          </div>
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
        isPotActive={isPotActive}
      >
        {activeTool === 'pot' && isPotActive ? (
          <img src={PotSelected} alt="pot" />
        ) : (
          <img src={Pot} alt="pot" />
        )}
      </ToolButton>
        
      <ToolButton
        tool="hand"
        active={activeTool === 'hand'}
        onClick={this.handleToolClick}
      >
        {activeTool === 'hand' ? (
          <img src={HandSelected} alt="hand" />
        ) : (
          <img src={Hand} alt="hand" />
        )}
      </ToolButton>

      {/* <ToolButton
        tool="pot"
        active={activeTool === 'pot'}
        onClick={this.handleToolClick}
      >
        {activeTool === 'pot' ? (
          <img src={PotSelected} alt="pot" />
        ) : (
          <img src={Pot} alt="pot" />
        )}
      </ToolButton> */}


      
    </div>
      : <div className="toolbar_hidden">
        <div className='fold'>
          <img src={fold} onClick={this.handleClickUnFold}/>
          </div>
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

