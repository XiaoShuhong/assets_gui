import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import './index.css'
import naviReducer from './reducer/navibar.js'
import NaviBar from './containers/NaviBar.js'

const store = createStore(naviReducer)


ReactDOM.render(
  <Provider store={store}>
    <NaviBar/>
  </Provider>
  ,
  document.getElementById('root')
)