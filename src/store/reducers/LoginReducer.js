import {actionType} from '../contants/LoginContant';
const INITIAL_STATE = {
  email: '',
  password: '',
  user: {},
  error: '',
  counter: 0,
  isLoading: false,
  isLocked: false,
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionType.EMAIL_CHANGE:
      return {...state, email: action.payload};
    case actionType.PASSWORD_CHANGE:
      return {...state, password: action.payload};
    case actionType.LOGIN:
      return {
        ...state,
        error: '',
        isLoading: true,
        counter: ++state.counter,
        isLocked: false,
      };
    case actionType.LOGIN_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
        user: action.payload,
      };
    case actionType.LOGIN_USER_FAIL:
      return {
        ...state,
        error: 'Authentication Failed.',
        password: '',
        isLoading: false,
      };
    case actionType.SIGN_OUT:
      return {
        ...state,
        user: {},
        email: '',
        password: '',
        counter: 0,
        isLocked: false,
      };
    case actionType.LOCKED:
      return {
        ...state,
        error: 'You can not login at 5 minutes',
        isLocked: true,
      };
    case actionType.UN_LOCKED:
      return {
        ...state,
        error: '',
        counter: 0,
        isLocked: false,
      };
    default:
      return state;
  }
};
