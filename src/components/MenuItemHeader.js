import React, { Component } from 'react'
import fold from '../assets/image/fold.png';
import unfold from '../assets/image/unfold.png';
import { connect } from 'react-redux'
import { unfoldItem } from '../reducer/storypage';
class MenuItemHeader extends Component {
  constructor() {
    super();
    this.state = { isOpen: false };
    this.headname = '';
  }


  toggleOpen = () => {
    const newIsOpen = !this.state.isOpen;
    this.setState({ isOpen: newIsOpen });
    if (newIsOpen) {
      this.props.onChange(this.props.id);
    } else {
      this.props.onChange(0);
    }
    console.log(this.props.unfold_index);
};

  render() {
    // Set isOpen to true if unfold_index equals this component's id, otherwise set it to false
    let isOpen = this.props.unfold_index === this.props.id;
    let background_color = isOpen ? '#ffcb47' : '#cec0eb';

    switch (this.props.cate) {
      case 'role':
        this.headname = '角色';
        break;
      case 'scene':
        this.headname = '场景';
        break;
      case 'plot':
        this.headname = '事件';
        break;
      default:
        this.headname = '';
    }

    return (
      <div className="header" onClick={this.toggleOpen} style={{ backgroundColor: background_color }}>
        <img src={this.props.srcUrl} className="header-icon" />
        <div className="header-text">{this.headname}</div>
        <div className="header-arrow">
          {isOpen ? <img src={unfold} className="header-icon" /> : <img src={fold} className="header-icon" />}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    unfold_index: state.unfold_index
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (unfold_index) => {
      dispatch(unfoldItem(unfold_index))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuItemHeader)