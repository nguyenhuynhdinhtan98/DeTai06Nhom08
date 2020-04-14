import {combineReducers, createStore} from 'redux';
import LoginReducer from './LoginReducer';
import ClassReducer from './ClassReducer';
import TraineeReducer from './TraineeReducer';
import TrainerReducer from './TrainerReducer';
import SubjectReducer from './SubjectReducer';
import StaticReducer from './StaticReducer';
export default combineReducers({
  LoginReducer,
  ClassReducer,
  TraineeReducer,
  TrainerReducer,
  SubjectReducer,
  StaticReducer,
});
