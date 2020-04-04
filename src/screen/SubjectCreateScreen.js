import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
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
  handldeCreateSubject = () => {
    const checkName = validation('minLength', this.props.subject_name);
    if (checkName) {
      this.props.subjectCreate(this.props.subject_name);
      Alert.alert('Create Success');
    } else {
      Alert.alert('Invalid Infromation');
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputForm}>
          <SubjectForm />
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
              onPress={() => this.handldeCreateSubject()}
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
  const {subject_name} = state.SubjectReducer;
  return {subject_name};
};
export default connect(mapStateToProps, {subjectCreate, removeInput})(
  SubjectCreateScreen,
);
