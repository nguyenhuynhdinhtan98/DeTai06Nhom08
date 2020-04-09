import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Icon, Button} from 'react-native-elements';
import ClassForm from '../components/PlaceInput/ClassForm';
import _ from 'lodash';
import {
  classCreate,
  markCreate,
  removeInput,
} from '../store/actions/ClassAction';
import validation from '../utility/validation';
class ClassCreateScreen extends Component {
  componentDidMount() {
    console.disableYellowBox = true;
    this.props.removeInput();
  }
  handldeCreateClass = () => {
    const checkName = validation('minLength', this.props.class_name);
    const checkTrainerId = validation('notEmpty', this.props.trainer_id);
    if (checkName && checkTrainerId) {
      this.props.classCreate(
        this.props.class_name,
        this.props.trainer_id,
        this.props.trainee_id,
        this.props.subject_id,
      );
      _.forEach(this.props.trainee_id, async (trainee_id) => {
        await this.props.markCreate(trainee_id, this.props.subject_id);
      });
      Alert.alert('Create Success');
    } else {
      Alert.alert('Invalid Infromation');
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputForm}>
          <ClassForm />
        </View>
        <View style={styles.buttonGroup}>
          <View>
            <Button
              raised
              icon={
                <Icon name="plus" type="font-awesome" color="white" size={25} />
              }
              onPress={() =>
                this.props.navigation.navigate('ClassAddTraineeScreen')
              }
              title="Add Trainee "
            />
            <Button
              raised
              icon={
                <Icon name="plus" type="font-awesome" color="white" size={25} />
              }
              onPress={() =>
                this.props.navigation.navigate('ClassAddSubjectScreen')
              }
              containerStyle={{marginTop: 30}}
              title="Add Subject"
            />
          </View>
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
            onPress={() => this.handldeCreateClass()}
            title="Create"
          />
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
    flex: 2,
    margin: 20,
    justifyContent: 'space-around',
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: 'black',
    width: '90%',
    margin: 10,
    height: 40,
  },
});

const mapStateToProps = (state, ownProps) => {
  const {
    class_name,
    trainer_id,
    trainee_id,
    subject_id,
    trainee,
  } = state.ClassReducer;
  return {class_name, trainer_id, trainee_id, subject_id, trainee};
};
export default connect(mapStateToProps, {classCreate, markCreate, removeInput})(
  ClassCreateScreen,
);
