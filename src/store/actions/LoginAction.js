import {actionType} from '../contants/LoginContant';
import firebaseConfigure from '../../config/configureFirebase';
import AsyncStorage from '@react-native-community/async-storage';
export const emailChange = (text) => {
  return {
    type: actionType.EMAIL_CHANGE,
    payload: text,
  };
};
export const passwordChange = (text) => {
  return {
    type: actionType.PASSWORD_CHANGE,
    payload: text,
  };
};
export const stateLocked = () => {
  return {
    type: actionType.LOCKED,
  };
};
export const stateUnLocked = () => {
  return {
    type: actionType.UN_LOCKED,
  };
};
export const signIn = (email, password) => {
  console.log(email, password);
  return function (dispatch) {
    dispatch({type: actionType.LOGIN});
    return firebaseConfigure
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(
        (item) => signInUserSuccess(dispatch, item),
        AsyncStorage.setItem('user', JSON.stringify({email, password})),
      )
      .catch(() => signInUserFail(dispatch));
  };
};

const signInUserFail = (dispatch) => {
  dispatch({type: actionType.LOGIN_USER_FAIL});
};

const signInUserSuccess = (dispatch, user) => {
  dispatch({
    type: actionType.LOGIN_USER_SUCCESS,
    payload: user.user,
  });
};

export const signOut = (callback) => {
  return function (dispatch) {
    return firebaseConfigure
      .auth()
      .signOut()
      .then(() => {
        AsyncStorage.removeItem('user');
        dispatch({
          type: actionType.SIGN_OUT,
        });
        callback;
      })
      .catch((error) =>
        dispatch({
          type: actionType.ERROR,
          payload: error.message,
        }),
      );
  };
};
