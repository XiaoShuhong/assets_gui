import React, { Component } from 'react'
import ImageList from '../components/ImageList.js'
import AddImageButton from '../components/AddImageButton.js'
export default class MenuItemContent extends Component {
  render() {
    return (
      <div>
        <ImageList/>
        <AddImageButton/>
      </div>
    )
  }
}