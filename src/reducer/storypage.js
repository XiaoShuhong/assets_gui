//action type

const GO_TO_ACT = 'GO_TO_ACT';
const Unfold_Item = 'Unfold_Item';
const Image_Index ='image_index'
const role_json ='role_json'
const scene_json = 'scene_json'
const plot_json = 'plot_json'
const role_url ='role_url'
const scene_url = 'scene_url'
const plot_url = 'plot_url'
const help_state ='help_state'
const refine_role = 'refine_role'
const refine_scene = 'refine_scene'
const voice_flag= 'voice_flag'

//reducer

export default function(state,action){
  if (!state){
    state = { ...state, act:0,unfold_index:0, image_index:-1, role_json:['placeholder'],scene_json:['placeholder'],plot_json:['placeholder'],role_url:['placeholder'],scene_url:['placeholder'],plot_url:['placeholder'],help:false, role_image:['placeholder'],scene_image:['placeholder'],vflag:false }
  }
  switch (action.type){
    case GO_TO_ACT:
      return {...state, act:action.act};
    case Unfold_Item:
      return {...state, unfold_index:action.unfold_index};
    case Image_Index:
      return {...state, image_index: action.image_index};
    case role_json:
      return {...state,role_json:action.json};
    case scene_json:
      return {...state,scene_json:action.json};

    case plot_json:
      return {...state,plot_json:action.json};
    case role_url:
      return {...state,role_url:action.url};
    case scene_url:
      return {...state,scene_url:action.url};
    case plot_url:
      return {...state,plot_url:action.url};  
    case  help_state:
      return {...state,help:action.help}
    case refine_role:
      return {...state,role_image:action.image}
    case refine_scene:
      return {...state,scene_image:action.image}
    case voice_flag:
      return {...state,vflag:action.vflag}
    default:
      return state;
  }
  
};
// canvas_data ['role':[[url1,json1],[url2,json2]], 'plot':[[url1,json1]], 'scene':[[url1,json1]]]
//action creators

export const goToAct =(act) =>{
  return { type: GO_TO_ACT, act }
}

export const askHelp =(help) =>{
  return { type: help_state, help }
}

export const unfoldItem =(unfold_index) =>{
  return { type: Unfold_Item, unfold_index }
}

export const ImgIndex = (image_index) => {
  return { type: Image_Index, image_index }
}

export const changeJSON = (cateid,json) => {
  if(cateid==1){
    return { type: role_json, json }
  }else if(cateid==2){
    return { type: scene_json, json }
  }else if(cateid==3){
    return { type: plot_json, json }
  }
}

export const changeURL = (cateid,url) => {
  if(cateid==1){
    return { type: role_url, url }
  }else if(cateid==2){
    return { type: scene_url, url }
  }else if(cateid==3){
    return { type: plot_url, url }
  }
}

export const changeRefinedImage = (cateid,image) => {
  if(cateid==1){
    return { type: refine_role, image }
  }else if(cateid==2){
    return { type: refine_scene, image }
  }
}

export const ChangeVFlag = (vflag) => {
  return { type: voice_flag, vflag }
}