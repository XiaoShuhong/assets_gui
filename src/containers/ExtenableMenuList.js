import React, { Component } from 'react'
import ExtenableMenuItem from './ExtenableMenuItem.js'
import srcRole from '../assets/image/role.png'
import srcScene from '../assets/image/scene.png'
import srcPlot from '../assets/image/plot.png'
export default class ExtenableMenuList extends Component {

  
  render() {
    return (
      <div>
        <ExtenableMenuItem 
          cate='role' srcUrl={srcRole} id={1}/>
        <ExtenableMenuItem
          cate='scene' srcUrl={srcScene} id={2}/>
        <ExtenableMenuItem
          cate='plot' srcUrl={srcPlot} id={3}/>
      </div>
    )
  }
}