import React, { Component } from 'react'
import tempimg from '../assets/image/temp.png'
import tempimg2 from '../assets/image/temp2.png'
import { connect } from 'react-redux';
import deleteIcon from '../assets/image/delete.png';
import {askHelp} from '../reducer/storypage.js'
import ReactLoading from "react-loading";
class InspirationList extends Component {
  state = {
    imgdata: [], // hold fetched image and audio data
    blobdata:[],
    isLoading: false
  }

  handleDelete = () => {
    this.props.onChange(false);
  } 

  handleAsk = () => {
    let id, askterm
    id = this.props.act
    switch (this.props.unfold_index){
      case 1:
        askterm = 'role'
        break
      case 2:
        askterm = 'background'
        break
      case 3:
        askterm = 'event'
        break
    }
    return [id, askterm];
  }

  fetchData = () => {
    let id, askterm
    if (!this.props.help) {
      return null // Don't fetch anything if help is false
    } else {
      [id, askterm] = this.handleAsk()
    }

    var formData = new FormData()
    formData.append('id', id)
    formData.append('askterm', askterm)
    fetch('http://127.0.0.1:5000/generate', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      let imageurl = [];
      let bloburl = [];
      const imagesData = data.image;
      const soundsData = data.sound;
      console.log(imagesData,soundsData)
      imagesData.map((base64, index) => {
        const imageBlob = this.base64ToBlob(base64, 'image/png'); // use the correct mime type for your images
        const imageUrl = URL.createObjectURL(imageBlob);
        imageurl.push(imageUrl);
      })
      soundsData.map((base64, index) => {
        const soundBlob = this.base64ToBlob(base64, 'audio/mp3'); // use the correct mime type for your audio
        const soundUrl = URL.createObjectURL(soundBlob);
        bloburl.push(soundUrl)
      })
      console.log(imageurl,bloburl)
      this.setState({imgdata:imageurl, blobdata:bloburl})

    })
    .then(this.setState({isLoading:true}))


  }

  base64ToBlob(base64, mime) {
    mime = mime || '';
    var sliceSize = 1024;
    var byteChars = window.atob(base64);
    var byteArrays = [];

    for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
        var slice = byteChars.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: mime});
}





  componentDidUpdate(prevProps) {
    if (
      prevProps.help !== this.props.help && this.props.help===true
    ) {
      this.fetchData()
    }
  }


  render() {
   
    const { imgdata, blobdata,isLoading } = this.state;
   
    if (!this.props.help) {
      return null; // Don't render anything if help is false
    }

    if (!this.state.isLoading) {
      // return <div>Loading...</div>; // render loading indicator
    } else{
      return (
        <div className="inspirationlist1">
        {imgdata.length > 0 ? (
          imgdata.map((imgUrl, index) => (
            <div className="sub-inspiration1" key={index}>
              <img
                src={imgUrl}
                onClick={() => {
                  const audio = new Audio(blobdata[index]);
                  audio.play();
                }}
              />
            </div>
          ))
        ) : (
          <ReactLoading type={"spin"} color={"blue"} />
        )}
      </div>
      );

    }
      

    

  }
}

const mapStateToProps = (state) => {
  return {
    help: state.help,
    image_index: state.image_index,
    unfold_index: state.unfold_index,
    act: state.act
  };
};



const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (state) => {
      dispatch(askHelp(state));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(InspirationList);