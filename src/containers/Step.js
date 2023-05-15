import React, { Component,PropTypes } from 'react'
import { Steps } from 'antd';
import { connect } from 'react-redux'
import { goToAct } from '../reducer/navibar';

class StepContainer extends Component {
  // static propTypes= {
  //   act: PropTypes.number
  // }
  constructor () {
    super()
  }

  handleStepChange(e){
    // debugger
    const oldact =this.props.act
    console.log(oldact,e)
  
    if (oldact!=e){
      this.props.onChange(e)
    }
    
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
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    act: state.act
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