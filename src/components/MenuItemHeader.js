import React, { Component } from 'react'
import fold from '../assets/image/fold.png';
import unfold from '../assets/image/unfold.png';

export default class MenuItemHeader extends Component {


  // componentDidUpdate(prevProps,prevState) {

  //   if(prevProps.unfold_id!=this.props.unfold_index){
  //     console.log(this.props.cate,'after change:', this.props.unfold_index)
  //     // this.props.onChange(this.state.unfold_id);
  //     // console.log('change unfold item from ',prevProps.unfold_index,'to ',this.state.unfold_id);
  //   }
  // }



  toggleOpen = () => {
    const { onChangeFolding, isOpen, id } = this.props;
    if (isOpen) {
      onChangeFolding(0);
    } else {
      onChangeFolding(id);
    }
  };




  render() {
    // Set isOpen to true if unfold_index equals this component's id, otherwise set it to false
    // let isOpen = this.props.unfold_index === this.props.id;
    const { isOpen, cate, srcUrl } = this.props;
    let background_color = isOpen ? '#ffcb47' : '#cec0eb';
    let headname = '';
    switch (this.props.cate) {
      case 'role':
        headname = '角色';
        break;
      case 'scene':
        headname = '场景';
        break;
      case 'plot':
        headname = '事件';
        break;
      default:
        headname = '';
    }

    return (
      <div className="header" onClick={this.toggleOpen} style={{ backgroundColor: background_color }}>
        <img src={this.props.srcUrl} className="header-icon" />
        <div className="header-text">{headname}</div>
        <div className="header-arrow">
          {isOpen ? <img src={fold} className="header-icon" /> : <img src={unfold} className="header-icon" />}
        </div>
      </div>
    );
  }
}
// const mapStateToProps = (state) => {
//   return {
//     unfold_index: state.unfold_index
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onChange: (unfold_index) => {
//       dispatch(unfoldItem(unfold_index))
//     }
//   }
// }


// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(MenuItemHeader)