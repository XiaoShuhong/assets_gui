import React, { Component } from 'react';

export default class ColorBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedColor: '#000000',
    };
  }

  handleColorClick = (color) => {
    this.setState({ selectedColor: color });
    this.props.onColorSelect(color); // 将选中的颜色传递给 DrawingBoard 组件
  };
  render() {
    const colors = this.props.platte;
    const { selectedColor } = this.state;
    return (
    <div className="colorbar">
        {colors.map((color, index) => (
          <ColorButton key={index} color={color} selected={selectedColor === color} onClick={this.handleColorClick} />
        ))}
      </div>
    );
  }
}

class ColorButton extends Component {
  handleButtonClick = () => {
    const { color, onClick } = this.props;
    onClick(color); // 调用父组件传递的回调函数，并将颜色作为参数传递
  };
  render() {
    const { color, selected } = this.props;
    const buttonStyle = {
      backgroundColor: color,
    };

    return (
      <div className="color-button" style={buttonStyle} onClick={this.handleButtonClick}>
       {selected && <div className="color-circle"></div>}
      </div>
    );
  }
}
