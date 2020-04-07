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

export const trainerCreate = (trainer_name, date_of_birth) => {
  return (dispatch) => {
    firebaseConfigure.database().ref(`/trainer/`).push({
      trainer_name,
      date_of_birth,
    });
    dispatch({
      type: actionType.NULL_ALL,
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
export const trainerEdit = (trainer_id, trainer_name, date_of_birth) => {
  return (dispatch) => {
    firebaseConfigure.database().ref(`/trainer/${trainer_id}`).update({
      trainer_name,
      date_of_birth,
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
