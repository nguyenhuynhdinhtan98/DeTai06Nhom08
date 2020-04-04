import {actionType} from '../contants/Contant';
const INITIAL_STATE = {
  trainer_id: '',
  trainer_name: '',
  date_of_birth: '',
  error: '',
  search: '',
  trainer: [],
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.VALUE_CHANGE:
      return {...state, [action.payload.prop]: action.payload.value};
    case actionType.GET_ALL_TRAINER:
      return {...state, trainer: action.payload};
    case actionType.EDIT:
      return state;
    case actionType.NULL_ALL:
      return {
        ...state,
        trainer_id: '',
        trainer_name: '',
        date_of_birth: '',
      };
    default:
      return state;
  }
};
