import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Icon, Button} from 'react-native-elements';
import ClassForm from '../components/PlaceInput/ClassForm';
import {valueChange, classEdit, markEdit} from '../store/actions/ClassAction';
import _ from 'lodash';
import validation from '../utility/validation';
class ClassEditScreen extends Component {
  componentDidMount() {
    console.disableYellowBox = true;
    _.each(this.props.route.params.item, (value, prop) => {
      this.props.valueChange({prop, value});
    });
  }

  handldeEditClass = async () => {
    const checkName = await validation('minLength', this.props.class_name);
    const checkTrainerId = await validation('notEmpty', this.props.trainer_id);
    if (checkName && checkTrainerId) {
      await this.props.classEdit(
        this.props.class_id,
        this.props.class_name,
        this.props.trainer_id,
        this.props.trainee_id,
        this.props.subject_id.map((item) => item.subject_id),
      );
      await _.forEach(this.props.trainee_id, (trainee_id) => {
        console.log(trainee_id, this.props.subject_id);
        this.props.markEdit(trainee_id, this.props.subject_id);
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
  const {
    class_id,
    class_name,
    trainer_id,
    trainee_id,
    subject_id,
    trainee,
  } = state.ClassReducer;
  return {class_id, class_name, trainer_id, trainee_id, subject_id, trainee};
};
export default connect(mapStateToProps, {valueChange, classEdit, markEdit})(
  ClassEditScreen,
);
