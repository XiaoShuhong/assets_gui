import React, { Component } from 'react'
import AppLogo from '../components/AppLogo.js'
import StepContainer from './Step.js'
import ExtenableMenuList from './ExtenableMenuList.js'
export default class NaviBar extends Component {


  handleClickImage= (index) => {
    // const onClickImage = this.props.onClickImage;
    // onClickImage(index);
    const onClickImage = this.props.onClickImage;
    onClickImage(index);
  }
  render() {
    return (
      <div className='navibar'>
        <AppLogo/>
        <StepContainer/>
        <ExtenableMenuList onClickImage={this.handleClickImage}/>
      </div>
    )
  }
}