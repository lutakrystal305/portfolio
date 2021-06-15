import * as types from '../constants/actionType';

const initialState = {
  isAuthed: false
}
const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTHED :
      sessionStorage.setItem('isAuthed', true);
      return {...state, isAuthed: true};
    case types.UNAUTHED : 
      return {...state, isAuthed: false};
    default :
      return state;
  }
}
export default myReducer;