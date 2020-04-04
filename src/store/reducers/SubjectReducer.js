import {actionType} from '../contants/Contant';
const INITIAL_STATE = {
  subject_id: '',
  subject_name: '',
  error: '',
  search: '',
  subject: [],
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.VALUE_CHANGE:
      return {...state, [action.payload.prop]: action.payload.value};
    case actionType.GET_ALL_SUBJECT:
      return {...state, subject: action.payload};
    case actionType.EDIT:
      return state;
    case actionType.NULL_ALL:
      return {
        ...state,
        subject_id: '',
        subject_name: '',
        search: '',
      };
    default:
      return state;
  }
};
