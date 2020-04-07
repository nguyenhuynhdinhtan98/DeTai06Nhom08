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
    firebaseConfigure.database().ref(`/trainee/${trainee_id}`).update({
      trainee_name,
      date_of_birth,
      skill,
    });
    dispatch({
      type: actionType.EDIT,
    });
  };
};
export const getAllMarkTrainee = (trainee_id) => {
  return (dispatch) => {
    firebaseConfigure
      .database()
      .ref(`/mark/${trainee_id}`)
      .on('value', async (snapshot) => {
        let arr = [];
        snapshot.val().forEach((element) => {
          firebaseConfigure
            .database()
            .ref(`/subject/${element.subject_id}`)
            .on('value', (snapshot) => {
              const subject = snapshot.val();
              arr.push({...element, subject});
            });
        });
        console.log(arr);
        dispatch({
          type: actionType.GET_ALL_MARK,
          payload: arr,
        });
      });
  };
};

export const editMark = (trainee_id, subject_id, mark) => {
  return (dispatch) => {
    firebaseConfigure
      .database()
      .ref(`/mark/${trainee_id}`)
      .equalTo(subject_id)
      .set(mark);
    dispatch({
      type: actionType.NULL_ALL,
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
