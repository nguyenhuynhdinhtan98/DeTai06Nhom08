import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Icon, Button} from 'react-native-elements';
import TraineeForm from '../components/PlaceInput/TraineeForm';
import {valueChange, traineeEdit} from '../store/actions/TraineeAction';
import _ from 'lodash';
import TableEditScreen from '../components/Table/TableEditScreen';
import validation from '../utility/validation';
class TraineeEditScreen extends Component {
  componentDidMount() {
    console.disableYellowBox = true;
    _.each(this.props.route.params.item, (value, prop) => {
      this.props.valueChange({prop, value});
    });
  }

  handldeEditTrainee = () => {
    const checkName = validation('minLength', this.props.trainee_name);
    const checkDateOfBirth = validation('notEmpty', this.props.date_of_birth);
    const checkSkill = validation('notEmpty', this.props.skill);
    if (checkName && checkDateOfBirth && checkSkill) {
      this.props.traineeEdit(
        this.props.trainee_id,
        this.props.trainee_name,
        this.props.date_of_birth,
        this.props.skill,
      );
      this.props.navigation.goBack();
    } else {
      Alert.alert('Invalid Infromation');
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
          <TableEditScreen value={[]} />
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
  const {trainee_id, trainee_name, date_of_birth, skill} = state.TraineeReducer;
  return {trainee_id, trainee_name, date_of_birth, skill};
};
export default connect(mapStateToProps, {valueChange, traineeEdit})(
  TraineeEditScreen,
);