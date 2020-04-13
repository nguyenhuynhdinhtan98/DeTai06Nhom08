import {actionType} from '../contants/Contant';
const INITIAL_STATE = {
  trainee_id: '',
  trainee_name: '',
  date_of_birth: '',
  skill: '',
  mark_subject: 0,
  error: '',
  search: '',
  trainee: [],
  subject: [],
  mark: [],
  subject_item: {value: {}, isVisible: false},
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.VALUE_CHANGE:
      return {...state, [action.payload.prop]: action.payload.value};
    case actionType.GET_ALL_TRAINEE:
      return {...state, trainee: action.payload};
    case actionType.GET_ALL_MARK:
      return {...state, mark: action.payload};
    case actionType.GET_ALL_SUBJECT:
      return {...state, subject: action.payload};
    case actionType.EDIT:
      return state;
    case actionType.DELETE:
      return state;
    case actionType.NULL_ALL:
      return {
        ...state,
        trainee_id: '',
        trainee_name: '',
        date_of_birth: '',
        skill: '',
        search: '',
      };

    default:
      return state;
  }
};
