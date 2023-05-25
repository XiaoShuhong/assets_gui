import React, { Component } from 'react'
import MenuItemHeader from '../components/MenuItemHeader.js'
import MenuItemContent from './MenuItemContent.js'
export default class ExtenableMenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {isOpen:this.props.isOpen};


  }

  handleChangeFolding= (index) => {
    const onChangeFolding = this.props.onChangeFolding;
    onChangeFolding(index);
    
  }

  handleClickImage= (index) => {
    const onClickImage = this.props.onClickImage;
    onClickImage(index);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isOpen !== this.props.isOpen) {
      this.setState({
        isOpen: this.props.isOpen
      });
    }
  }
  render() {
    const cate = this.props.cate
    const isOpen = this.state.isOpen;
    // console.log(cate, isopen)
    return (
     
      <div>
        <MenuItemHeader
         cate={cate} srcUrl={this.props.srcUrl} id={this.props.id} isOpen={isOpen} onChangeFolding={this.handleChangeFolding} />
        <MenuItemContent id={this.props.id} cate={cate} isopen={isOpen} onClickImage={this.handleClickImage} />
      </div>
    )
  }
}

