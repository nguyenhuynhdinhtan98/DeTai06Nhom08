import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import firebaseConfigure from '../config/configureFirebase';
import {connect} from 'react-redux';
import {Icon, Button} from 'react-native-elements';
import SubjectForm from '../components/PlaceInput/SubjectForm';
import {subjectCreate, removeInput} from '../store/actions/SubjectAction';
import validation from '../utility/validation';
class SubjectCreateScreen extends Component {
  componentDidMount() {
    console.disableYellowBox = true;
    this.props.removeInput();
  }
  handldeCreateSubject = async () => {
    const checkName = validation('minLength', this.props.subject_name);
    if (checkName) {
      const checkNameExist = this.props.subject.find(
        (item) => item.subject_name.trim() === this.props.subject_name.trim(),
      );
      if (checkNameExist === undefined) {
        this.props.subjectCreate(this.props.subject_name.trim());
        Alert.alert('Create Success');
      } else {
        Alert.alert('Subject name is existing');
      }
    } else {
      if (!checkName) {
        Alert.alert(
          'Invalid Information By Name',
          'Please enter subject name is more than 6 characters',
        );
      }
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <SubjectForm />
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
            onPress={() => this.handldeCreateSubject()}
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
    justifyContent: 'center',
  },
  inputForm: {
    flex: 1,
  },
  buttonGroup: {
    flex: 1,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: 'black',
    height: 40,
  },
  buttonContainer: {
    margin: 20,
  },
});

const mapStateToProps = (state, ownProps) => {
  const {subject_name, subject} = state.SubjectReducer;
  return {subject_name, subject};
};
export default connect(mapStateToProps, {subjectCreate, removeInput})(
  SubjectCreateScreen,
);
