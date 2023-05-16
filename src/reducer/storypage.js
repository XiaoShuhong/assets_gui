//action type

const GO_TO_ACT = 'GO_TO_ACT';
const Unfold_Item = 'Unfold_Item';


//reducer

export default function(state,action){
  if (!state){
    state = { ...state, act:0,unfold_index:0 }
  }
  switch (action.type){
    case GO_TO_ACT:
      return {...state, act:action.act};
    case Unfold_Item:
      return {...state, unfold_index:action.unfold_index};
    default:
      return state;
  }
  
};

//action creators

export const goToAct =(act) =>{
  return { type:GO_TO_ACT, act }
}



export const unfoldItem =(unfold_index) =>{
  return { type:Unfold_Item, unfold_index }
}