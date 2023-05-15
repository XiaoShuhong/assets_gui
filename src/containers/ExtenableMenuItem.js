import React, { Component } from 'react'
import MenuItemHeader from '../components/MenuItemHeader.js'
import MenuItemContent from './MenuItemContent.js'
export default class ExtenableMenuItem extends Component {
  render() {
    const cate = this.props.cate
    return (
     
      <div>
        <MenuItemHeader
         cate={cate} srcUrl={this.props.srcUrl}/>
        <MenuItemContent/>
      </div>
    )
  }
}

