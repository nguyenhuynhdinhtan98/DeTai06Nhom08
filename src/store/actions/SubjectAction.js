import {actionType} from '../contants/Contant';
import firebaseConfigure from '../../config/configureFirebase';

import _ from 'lodash';
export const valueChange = ({prop, value}) => {
  return {
    type: actionType.VALUE_CHANGE,
    payload: {
      prop,
      value,
    },
  };
};

export const subjectCreate = (subject_name) => {
  return (dispatch) => {
    firebaseConfigure.database().ref(`/subject/`).push({
      subject_name,
    });
    dispatch({
      type: actionType.NULL_ALL,
    });
  };
};

export const getAllSubject = () => {
  return (dispatch) => {
    firebaseConfigure
      .database()
      .ref(`/subject`)
      .orderByChild('subject_name')
      .on('value', (snapshot) => {
        let array = [];
        snapshot.forEach((child) => {
          array.push({
            ...child.val(),
            subject_id: child.key,
          });
        });
        dispatch({
          type: actionType.GET_ALL_SUBJECT,
          payload: array,
        });
      });
  };
};
export const subjectEdit = (subject_id, subject_name) => {
  return (dispatch) => {
    firebaseConfigure.database().ref(`/subject/${subject_id}`).update({
      subject_name,
    });
    dispatch({
      type: actionType.EDIT,
    });
  };
};
export const subjectRemove = (subject_id) => {
  firebaseConfigure.database().ref(`/subject/${subject_id}`).remove();
};
export const removeInput = () => {
  return (dispatch) => {
    dispatch({
      type: actionType.NULL_ALL,
    });
  };
};
