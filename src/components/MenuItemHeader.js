import React, { Component } from 'react'
export default class MenuItemHeader extends Component {

  constructor() {
    super();
    this.state = { isOpen: false };
    this.headname ='';
  }

 

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    
    switch (this.props.cate){
      case 'role':
        this.headname='角色';
        break
      case 'scene':
        this.headname='场景';
        break
      case 'plot':
        this.headname='场景';
        break 
    }
    
    return (
      <div className="header" onClick={this.toggleOpen}>
      <img src={this.props.srcUrl} alt={this.headname} className="header-icon" />
      <div className="header-text">Dropdown</div>
      <div className="header-arrow">
        {this.state.isOpen ? '>' : 'v'}
      </div>
    </div>
    )
  }
}