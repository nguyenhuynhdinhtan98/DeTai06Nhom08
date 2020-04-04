import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Icon, Button} from 'react-native-elements';
import SubjectForm from '../components/PlaceInput/SubjectForm';
import {valueChange, subjectEdit} from '../store/actions/SubjectAction';
import _ from 'lodash';
import validation from '../utility/validation';
class SubjectEditScreen extends Component {
  componentDidMount() {
    _.each(this.props.route.params.item, (value, prop) => {
      this.props.valueChange({prop, value});
    });
  }

  handldeEditSubject = () => {
    const checkName = validation('minLength', this.props.subject_name);
    if (checkName) {
      this.props.subjectEdit(this.props.subject_id, this.props.subject_name);
      this.props.navigation.goBack();
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
                <Icon name="edit" type="font-awesome" color="white" size={25} />
              }
              containerStyle={{marginTop: 50}}
              onPress={() => this.handldeEditSubject()}
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
  const {uid, subject_name} = state.SubjectReducer;
  return {uid, subject_name};
};
export default connect(mapStateToProps, {valueChange, subjectEdit})(
  SubjectEditScreen,
);
