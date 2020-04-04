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

export const classCreate = (class_name, trainer_id, trainee_id, subject_id) => {
  return (dispatch) => {
    firebaseConfigure.database().ref(`/class`).push({
      class_name,
      trainer_id,
      trainee_id,
      subject_id,
    });
    dispatch({
      type: actionType.NULL_ALL,
    });
  };
};
export const classEdit = (
  class_id,
  class_name,
  trainer_id,
  trainee_id,
  subject_id,
) => {
  return (dispatch) => {
    firebaseConfigure.database().ref(`/class/${class_id}`).set({
      class_name,
      trainer_id,
      trainee_id,
      subject_id,
    });
    dispatch({
      type: actionType.EDIT,
    });
  };
};
export const getAllClass = () => {
  return (dispatch) => {
    firebaseConfigure
      .database()
      .ref('class')
      .orderByChild('class_name')
      .on('value', (snapshot) => {
        let array = [];
        snapshot.forEach((child) => {
          array.push({
            ...child.val(),
            class_id: child.key,
          });
        });
        dispatch({
          type: actionType.GET_ALL_CLASS,
          payload: array,
        });
      });
  };
};
export const getAllTrainee = () => {
  return (dispatch) => {
    firebaseConfigure
      .database()
      .ref(`trainee`)
      .orderByChild('trainee_name')
      .on('value', (snapshot) => {
        let array = [];
        snapshot.forEach((child) => {
          array.push({
            ...child.val(),
            trainee_id: child.key,
          });
        });
        dispatch({
          type: actionType.GET_ALL_TRAINEE,
          payload: array,
        });
      });
  };
};
export const getAllTrainer = () => {
  return (dispatch) => {
    firebaseConfigure
      .database()
      .ref(`/trainer`)
      .orderByChild('trainer_name')
      .on('value', (snapshot) => {
        let array = [];
        snapshot.forEach((child) => {
          array.push({
            ...child.val(),
            trainer_id: child.key,
          });
        });
        dispatch({
          type: actionType.GET_ALL_TRAINER,
          payload: array,
        });
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

export const removeInput = () => {
  return (dispatch) => {
    dispatch({
      type: actionType.NULL_ALL,
    });
  };
};