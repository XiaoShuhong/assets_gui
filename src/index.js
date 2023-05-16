import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import './index.css'
import storyReducer from './reducer/storypage.js'
import StoryPage from './containers/StoryPage.js'

const store = createStore(storyReducer)


ReactDOM.render(
  <Provider store={store}>
    <StoryPage/>
  </Provider>
  ,
  document.getElementById('root')
)


