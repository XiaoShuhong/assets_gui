import React, { Component } from 'react'
import logo from '../assets/image/Logo.png';
export default class AppLogo extends Component {
  render() {
    return (
      <div >
         <img className='logo' src={logo} alt="App Logo" />
      </div>
    )
  }
}
