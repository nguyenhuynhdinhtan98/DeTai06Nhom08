import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Icon, Button} from 'react-native-elements';
import TraineeForm from '../components/PlaceInput/TraineeForm';
import {traineeCreate, removeInput} from '../store/actions/TraineeAction';
import Modal from 'react-native-modal';
import validation from '../utility/validation';
class TraineeCreateScreen extends Component {
  componentDidMount() {
    console.disableYellowBox = true;
    this.props.removeInput();
  }
  handldeCreateTrainee = async () => {
    const checkName = validation('minLength', this.props.trainee_name);
    const checkDateOfBirth = validation('notEmpty', this.props.date_of_birth);
    const checkSkill = validation('notEmpty', this.props.skill);
    //check validator
    if (checkName && checkDateOfBirth && checkSkill) {
      await this.props.traineeCreate(
        this.props.trainee_name,
        this.props.date_of_birth,
        this.props.skill,
      );
      this.props.removeInput();
      await Alert.alert('Create Success');
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
        <View style={styles.buttonGroup}>
          <View style={styles.buttonContainer}>
            <Button
              raised
              icon={
                <Icon
                  name="plus-square"
                  type="font-awesome"
                  color="white"
                  size={25}
                />
              }
              containerStyle={{marginTop: 50}}
              onPress={() => this.handldeCreateTrainee()}
              title="Create"
            />
          </View>
        </View>
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
  buttonGroup: {
    flex: 1,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: 'black',
    width: '90%',
    margin: 10,
    height: 40,
    justifyContent: 'center',
  },
  buttonContainer: {
    marginLeft: 20,
    marginRight: 20,
  },
});

const mapStateToProps = (state, ownProps) => {
  const {
    trainee,
    trainee_name,
    date_of_birth,
    skill,
    mark,
  } = state.TraineeReducer;
  return {trainee, trainee_name, date_of_birth, skill, mark};
};
export default connect(mapStateToProps, {traineeCreate, removeInput})(
  TraineeCreateScreen,
);
