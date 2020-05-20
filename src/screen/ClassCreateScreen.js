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
  valueChange,
} from '../store/actions/ClassAction';
import validation from '../utility/validation';
class ClassCreateScreen extends Component {
  componentDidMount() {
    console.disableYellowBox = true;
    this.props.removeInput();
    this.filterTrainee();
  }
  filterTrainee = async () => {
    let arr = [];
    let array = [];
    // group of trainee members on class
    await this.props.class.forEach((o1) => {
      if (o1.trainee_id !== undefined) {
        o1.trainee_id.forEach((o2) => arr.push(o2));
      }
    });

    await this.props.trainee.forEach((e1) => {
      if (arr.includes(e1.trainee_id) === false) {
        array.push(e1);
      }
    });
    await this.props.valueChange({
      prop: 'trainee_exists',
      value: array,
    });
  };
  handldeCreateClass = () => {
    const checkName = validation('minLength', this.props.class_name);
    const checkTrainerId = validation('notEmpty', this.props.trainer_id);
    if (checkName && checkTrainerId) {
      const checkNameExist = this.props.class.find(
        (item) => item.class_name === this.props.class_name,
      );
      if (checkNameExist === undefined) {
        //create class
        this.props.classCreate(
          this.props.class_name,
          this.props.trainer_id,
          this.props.trainee_id,
          this.props.subject_id,
        );
        // save list trainee
        _.forEach(this.props.trainee_id, async (trainee_id) => {
          await this.props.markCreate(trainee_id, this.props.subject_id);
        });
        Alert.alert('Create Success');
      } else {
        Alert.alert('Class name is existing');
      }
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
  return {
    class_id: state.ClassReducer.class_id,
    class_name: state.ClassReducer.class_name,
    trainer_id: state.ClassReducer.trainer_id,
    trainee_id: state.ClassReducer.trainee_id,
    subject_id: state.ClassReducer.subject_id,
    trainee: state.ClassReducer.trainee,
    class: state.ClassReducer.class,
    mark: state.ClassReducer.mark,
    trainee_not_exists: state.ClassReducer.trainee_not_exists,
  };
};
export default connect(mapStateToProps, {
  classCreate,
  markCreate,
  removeInput,
  valueChange,
})(ClassCreateScreen);
