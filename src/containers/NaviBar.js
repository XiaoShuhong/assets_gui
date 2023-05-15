import React, { Component } from 'react'
import AppLogo from '../components/AppLogo.js'
import StepContainer from './Step.js'
import ExtenableMenuList from './ExtenableMenuList.js'
export default class NaviBar extends Component {
  render() {
    return (
      <div className='navibar'>
        <AppLogo/>
        <StepContainer/>
        <ExtenableMenuList/>
      </div>
    )
  }
}