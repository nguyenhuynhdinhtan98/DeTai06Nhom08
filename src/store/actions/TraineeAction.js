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

export const getAllMarkTrainee = (trainee_id) => {
  return (dispatch) => {
    firebaseConfigure
      .database()
      .ref(`/mark`)
      .child(trainee_id)
      .on('value', (snapshot) => {
        dispatch({
          type: actionType.GET_ALL_MARK,
          payload: snapshot.val(),
        });
      });
  };
};
export const traineeRemove = (trainee_id) => {
  firebaseConfigure.database().ref(`/trainee/${trainee_id}`).remove();
};
export const checkTraineeInMark = (trainee_id) => {
  // firebaseConfigure
  //   .database()
  //   .ref(`/mark/${trainee_id}`)
  //   .once('value', (snapshot) => console.log(snapshot));
  firebaseConfigure
    .database()
    .ref('/class')
    .once('value')
    .then((snapshot) =>
      Object.values(snapshot.val()).forEach((item) => {
        if (item.trainee_id !== undefined) {
          if (item.trainee_id.includes(trainee_id)) {
            trainee;
          } else {
            console.log('Fail');
          }
        }
      }),
    );
};
export const editMark = (trainee_id, mark) => {
  return (dispatch) => {
    firebaseConfigure.database().ref(`/mark/${trainee_id}`).set(mark);
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
