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

export const traineeCreate = (trainee_name, date_of_birth, skill) => {
  return async (dispatch) => {
    firebaseConfigure.database().ref(`/trainee/`).push({
      trainee_name,
      date_of_birth,
      skill,
    });
    dispatch({
      type: actionType.NULL_ALL,
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
export const traineeEdit = (trainee_id, trainee_name, date_of_birth, skill) => {
  return (dispatch) => {
    firebaseConfigure.database().ref(`/trainee/${trainee_id}`).set({
      trainee_name,
      date_of_birth,
      skill,
    });
    dispatch({
      type: actionType.EDIT,
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
