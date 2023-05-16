
import React, { Component } from 'react'
import NaviBar from './NaviBar.js'
import DrawingBoard from './DrawingBoard.js'
export default class StoryPage extends Component {
  render() {
    
    return (
      <div className='storypage'>
        <NaviBar/>
        <DrawingBoard/>
      </div>
    )
  }
}

