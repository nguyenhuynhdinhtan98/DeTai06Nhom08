import {actionType} from '../contants/Contant';
const INITIAL_STATE = {
  class: [],
  trainee: [],
  trainer: [],
  subject: [],
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

    default:
      return state;
  }
};
