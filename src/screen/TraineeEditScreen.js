import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Icon, Button, Text, Input} from 'react-native-elements';
import _ from 'lodash';
import ModalAddMarkTrainee from '../components/Modal/ModalAddMarkTrainee';
import TraineeForm from '../components/PlaceInput/TraineeForm';
import {
  valueChange,
  traineeEdit,
  editMark,
  getAllMarkTrainee,
  getSubjectName,
  getAllSubject,
  getAllTrainee,
} from '../store/actions/TraineeAction';
import TableEditScreen from '../components/Table/TableEditScreen';
import validation from '../utility/validation';
class TraineeEditScreen extends Component {
  async componentDidMount() {
    console.disableYellowBox = true;
    await this.props.getAllSubject();
    await _.each(this.props.route.params.item, (value, prop) => {
      this.props.valueChange({prop, value});
    });
    await this.props.getAllMarkTrainee(this.props.route.params.item.trainee_id);
  }
  collectionTwoObject = () => {
    let arr = [];
    this.props.subject.forEach((e1) => {
      if (this.props.mark !== null) {
        this.props.mark.forEach((e2) => {
          if (e1.subject_id === e2.subject_id) {
            arr.push(Object.assign(e1, e2)); //connect table trainee and table mark
          }
        });
      }
    });
    return arr;
  };
  handldeEditTrainee = () => {
    const checkName = validation('minLength', this.props.trainee_name);
    const checkDateOfBirth = validation('notEmpty', this.props.date_of_birth);
    const checkSkill = validation('notEmpty', this.props.skill);
    //check validator
    if (checkName && checkDateOfBirth && checkSkill) {
      //edit trainee
      this.props.traineeEdit(
        this.props.trainee_id,
        this.props.trainee_name,
        this.props.date_of_birth,
        this.props.skill,
      );
      this.props.editMark(this.props.trainee_id, this.props.mark);
      // this.props.getAllTrainee();
      this.props.navigation.goBack();
    } else {
      if (!checkName) {
        Alert.alert(
          'Invalid Information By Name',
          'Please enter trainee name is more than 6 characters',
        );
      } else if (!checkDateOfBirth) {
        Alert.alert(
          'Invalid Information By Date Of Birth',
          'Please choose date of birth.',
        );
      } else if (!checkSkill) {
        Alert.alert('Invalid Information By Skill', 'Please choose skill.');
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputForm}>
          <TraineeForm />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            raised
            icon={
              <Icon name="edit" type="font-awesome" color="white" size={25} />
            }
            onPress={() => this.handldeEditTrainee()}
            title="Update"
          />
        </View>
        <View style={styles.tableContainer}>
          <TableEditScreen data={this.collectionTwoObject()} />
        </View>
        <ModalAddMarkTrainee />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputForm: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginLeft: 20,
    marginRight: 20,
  },
  tableContainer: {
    flex: 1,
    margin: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
});

const mapStateToProps = (state, ownProps) => {
  const {
    trainee_id,
    trainee_name,
    date_of_birth,
    skill,
    mark,
    error,
    subject,
    subject_item,
    allMark,
    trainee,
  } = state.TraineeReducer;
  return {
    trainee_id,
    trainee_name,
    date_of_birth,
    skill,
    mark,
    error,
    subject,
    subject_item,
    allMark,
    trainee,
  };
};
export default connect(mapStateToProps, {
  valueChange,
  traineeEdit,
  editMark,
  getAllMarkTrainee,
  getSubjectName,
  getAllTrainee,
  getAllSubject,
})(TraineeEditScreen);
