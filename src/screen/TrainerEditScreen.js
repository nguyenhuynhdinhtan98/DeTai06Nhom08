import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Icon, Button} from 'react-native-elements';
import TrainerForm from '../components/PlaceInput/TrainerForm';
import {valueChange, trainerEdit} from '../store/actions/TrainerAction';
import _ from 'lodash';

import validation from '../utility/validation';
class TrainerEditScreen extends Component {
  componentDidMount() {
    console.disableYellowBox = true;
    _.each(this.props.route.params.item, (value, prop) => {
      this.props.valueChange({prop, value});
    });
  }

  handldeEditTrainer = () => {
    const checkName = validation('minLength', this.props.trainer_name);
    const checkDateOfBirth = validation('notEmpty', this.props.date_of_birth);
    //check validator
    if (checkName && checkDateOfBirth) {
      //trainer edit
      this.props.trainerEdit(
        this.props.trainer_id,
        this.props.trainer_name,
        this.props.date_of_birth,
      );
      this.props.navigation.goBack();
    } else {
      if (!checkName) {
        Alert.alert(
          'Invalid Information By Name',
          'Please enter trainer name is more than 6 characters',
        );
      } else if (!checkDateOfBirth) {
        Alert.alert(
          'Invalid Information By Date Of Birth',
          'Please choose date of birth.',
        );
      }
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
                <Icon name="edit" type="font-awesome" color="white" size={25} />
              }
              containerStyle={{marginTop: 50}}
              onPress={() => this.handldeEditTrainer()}
              title="Update"
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
    trainer_id,
    trainer_name,
    date_of_birth,
    trainer,
  } = state.TrainerReducer;
  return {trainer_id, trainer_name, date_of_birth, trainer};
};
export default connect(mapStateToProps, {valueChange, trainerEdit})(
  TrainerEditScreen,
);
