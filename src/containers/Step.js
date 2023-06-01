import React, { Component,PropTypes } from 'react'
import { Steps } from 'antd';
import { connect } from 'react-redux'
import { goToAct } from '../reducer/storypage';
import JumpToCode from '../assets/image/jump.png';



class StepContainer extends Component {

  constructor () {
    super()
  }

  handleStepChange(e){
    // debugger
    const oldact =this.props.act

  
    if (oldact!==e){
      this.props.onChange(e)
    }
    
  }
  

  
  redirectToPage = () => {

    
    
}
  render() {

    const item = [{title: '',},{title: '',},{title: '',},]
    return (
      <div className='step'>
          <Steps
            current={this.props.act}
            labelPlacement="vertical"
            items={item}
            onChange={this.handleStepChange.bind(this)}
           />
           {this.props.act === 2 && (
              <img src={JumpToCode} alt="Your Image" onClick={this.redirectToPage}/>
            )}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    act: state.act,
    role_url:state.role_url,
    scene_url:state.scene_url
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (act) => {
      dispatch(goToAct(act))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepContainer)