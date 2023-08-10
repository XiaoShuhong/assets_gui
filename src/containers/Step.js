import React, { Component,PropTypes } from 'react'
import { Steps } from 'antd';
import { connect } from 'react-redux'
import { goToAct } from '../reducer/storypage';
import JumpToCode from '../assets/image/jump.png';
import play0 from '../assets/audio/第一幕.mp3';
import play1 from '../assets/audio/第二幕.mp3';
import play2 from '../assets/audio/第三幕.mp3';


class StepContainer extends Component {




  handleClick = (id) => {
    const cur_act = this.props.act
    if (id>cur_act){
    
      this.props.onChange(id)
      if(id===0){
        const audio = new Audio(play0);
        audio.play();
      }
      else if(id===1){
        const audio = new Audio(play1);
        audio.play();
      }
      else if(id===2){
        const audio = new Audio(play2);
        audio.play();
      };
    }
    
    }
    

  redirectToPage = () => {
    var formData = new FormData();
    const role_url_list = this.props.role_url.filter(url => url !== 'placeholder');
    const scene_url_list = this.props.scene_url.filter(url => url !== 'placeholder');
    console.log(role_url_list)
    formData.append('role', JSON.stringify(role_url_list));
    formData.append('scene', JSON.stringify(scene_url_list));
    fetch('http://10.73.3.223:55231/save_drawings', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {  
      console.log(data.status)
    })
    .catch((error) => {
      console.error('Error:', error);
  });

  window.location.href = 'http://10.73.3.223:55234/';
  }


  render() {
    const act = this.props.act;
    return(
      <div>
        <div className='step'>
          <div className='stepicon' id='0' onClick={() => this.handleClick(0)}>
            <div className="circle-large">
                <div className="circle-small" style={{backgroundColor: act >= 0 ? 'rgb(255, 202, 67)' : ''}}>
                    <span className="circle-number">1</span>
                </div>
            </div>
        </div>
        <hr className="custom-line"/>
        <div className='stepicon' id='1' onClick={() => this.handleClick(1)}>
            <div className="circle-large">
                <div className="circle-small" style={{backgroundColor: act >= 1 ? 'rgb(255, 202, 67)' : ''}}>
                    <span className="circle-number">2</span>
                </div>
            </div>
        </div>
        <hr className="custom-line"/>
        <div className='stepicon' id='2' onClick={() => this.handleClick(2)}>
            <div className="circle-large">
                <div className="circle-small" style={{backgroundColor: act >= 2 ? 'rgb(255, 202, 67)' : ''}}>
                    <span className="circle-number">3</span>
                </div>
            </div>
        </div>
       
      </div>
      <div className='jump'>
        <img 
          src={JumpToCode} 
          alt="Your Image" 
          style={{ visibility: act !== 2 ? 'hidden' : 'visible' }}
          onClick={this.redirectToPage}
        />
      </div>
     
      </div>
      
    )
  }







}


const mapStateToProps = (state) => {
  return {
    act: state.act,
    role_url:state.role_url,
    scene_url:state.scene_url,
    role_image:state.role_image,
    scene_image:state.scene_image

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