import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Icon, Button} from 'react-native-elements';
import TrainerForm from '../components/PlaceInput/TrainerForm';
import {trainerCreate, removeInput} from '../store/actions/TrainerAction';
import validation from '../utility/validation';
class TrainerCreateScreen extends Component {
  componentDidMount() {
    console.disableYellowBox = true;
    this.props.removeInput();
  }
  handldeCreateTrainer = () => {
    const checkName = validation('minLength', this.props.trainer_name);
    const checkDateOfBirth = validation('notEmpty', this.props.date_of_birth);
    if (checkName && checkDateOfBirth) {
      // create trainer
      this.props.trainerCreate(
        this.props.trainer_name,
        this.props.date_of_birth,
      );
      this.props.removeInput();
      Alert.alert('Create Success');
    } else {
      Alert.alert('Invalid Infromation');
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputForm}>
          <TrainerForm />
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
              onPress={() => this.handldeCreateTrainer()}
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
  const {trainer_name, date_of_birth} = state.TrainerReducer;
  return {trainer_name, date_of_birth};
};
export default connect(mapStateToProps, {trainerCreate, removeInput})(
  TrainerCreateScreen,
);
