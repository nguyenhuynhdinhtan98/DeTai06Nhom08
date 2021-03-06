import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {connect} from 'react-redux';
import {Icon, Button} from 'react-native-elements';
import SubjectForm from '../components/PlaceInput/SubjectForm';
import {valueChange, subjectEdit} from '../store/actions/SubjectAction';
import _ from 'lodash';
import firebaseConfigure from '../config/configureFirebase';
import validation from '../utility/validation';
class SubjectEditScreen extends Component {
  componentDidMount() {
    _.each(this.props.route.params.item, (value, prop) => {
      this.props.valueChange({prop, value});
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      input: this.props.route.params.item.subject_name,
    };
  }
  handldeEditSubject = () => {
    const checkName = validation('minLength', this.props.subject_name);
    //check validator
    if (checkName) {
      if (this.state.input.trim() === this.props.subject_name.trim()) {
        this.props.subjectEdit(this.props.subject_id, this.props.subject_name);
        this.props.navigation.goBack();
      } else {
        firebaseConfigure
          .database()
          .ref('/subject')
          .orderByChild('subject_name')
          .equalTo(this.props.subject_name)
          .once('value', (snapshot) => {
            console.log(snapshot.val());
            if (!snapshot.exists()) {
              this.props.subjectEdit(
                this.props.subject_id,
                this.props.subject_name,
              );
              this.props.navigation.goBack();
            } else {
              Alert.alert('Subject name is existing');
            }
          });
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
              <Icon name="edit" type="font-awesome" color="white" size={25} />
            }
            onPress={() => this.handldeEditSubject()}
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
  const {subject_id, subject_name, subject} = state.SubjectReducer;
  return {subject_id, subject_name, subject};
};
export default connect(mapStateToProps, {valueChange, subjectEdit})(
  SubjectEditScreen,
);
