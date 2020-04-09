import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Icon, Button} from 'react-native-elements';
import ClassForm from '../components/PlaceInput/ClassForm';
import {
  valueChange,
  classEdit,
  markEdit,
  removeInput,
  getAllMark,
} from '../store/actions/ClassAction';
import _ from 'lodash';
import validation from '../utility/validation';
class ClassEditScreen extends Component {
  componentDidMount() {
    console.disableYellowBox = true;
    this.props.removeInput();
    _.each(this.props.route.params.item, (value, prop) => {
      this.props.valueChange({prop, value});
    });
  }
  hideTraineeExist = (a, b) => {
    let arr = [];
    a.forEach((e1) => {
      if (typeof e1.trainee_id !== 'undefined') {
        b.forEach(async (e2) => {
          console.log(e1.trainee_id.includes(e2.trainee_id));
          console.log(e1.trainee_id);
          console.log(e2.trainee_id);
          if (e1.trainee_id.includes(e2.trainee_id) === false) {
            arr.push(e2);
          }
        });
      }
    });
    return arr;
  };
  handldeEditClass = () => {
    const checkName = validation('minLength', this.props.class_name);
    const checkTrainerId = validation('notEmpty', this.props.trainer_id);
    if (checkName && checkTrainerId) {
      this.props.classEdit(
        this.props.class_id,
        this.props.class_name,
        this.props.trainer_id,
        this.props.trainee_id,
        this.props.subject_id,
      );
      _.forEach(this.props.trainee_id, async (trainee_id) => {
        await this.props.markEdit(trainee_id, this.props.subject_id);
      });

      this.props.navigation.goBack();
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
              <Icon name="edit" type="font-awesome" color="white" size={25} />
            }
            onPress={() => this.handldeEditClass()}
            title="Update"
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
  };
};
export default connect(mapStateToProps, {
  valueChange,
  classEdit,
  markEdit,
  removeInput,
  getAllMark,
})(ClassEditScreen);
