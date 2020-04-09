import {actionType} from '../contants/Contant';
const INITIAL_STATE = {
  class_id: '',
  class_name: '',
  trainer_id: '',
  trainee_id: [],
  subject_id: [],
  error: '',
  search: '',
  class: [],
  trainee: [],
  trainer: [],
  subject: [],
  mark: [],
  trainee_exists: [],
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.VALUE_CHANGE:
      return {
        ...state,
        [action.payload.prop]: action.payload.value,
      };
    case actionType.GET_ALL_CLASS:
      return {
        ...state,
        class: action.payload,
      };
    case actionType.GET_ALL_TRAINEE:
      return {
        ...state,
        trainee: action.payload,
      };
    case actionType.GET_ALL_TRAINER:
      return {
        ...state,
        trainer: action.payload,
      };
    case actionType.GET_ALL_SUBJECT:
      return {
        ...state,
        subject: action.payload,
      };
    case actionType.GET_ALL_MARK:
      return {
        ...state,
        mark: action.payload,
      };
    case actionType.EDIT:
      return state;
    case actionType.NULL_ALL:
      return {
        ...state,
        class_id: '',
        class_name: '',
        trainer_id: '',
        trainee_id: [],
        subject_id: [],
        error: '',
        search: '',
      };
    default:
      return state;
  }
};
