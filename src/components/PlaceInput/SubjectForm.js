import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Input} from 'react-native-elements';
import {connect} from 'react-redux';
import {valueChange} from '../../store/actions/SubjectAction';

class SubjectForm extends Component {
  render() {
    return (
      <>
        <Text style={styles.styleText}>Subject name</Text>
        <View style={styles.inputContainer}>
          <Input
            value={this.props.subject_name}
            placeholder="Enter Your Subject Name"
            inputContainerStyle={{borderBottomWidth: 0}}
            onChangeText={(text) =>
              this.props.valueChange({prop: 'subject_name', value: text})
            }
            inputStyle={{fontSize: 16, marginLeft: -5}}
          />
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: 'black',
    margin: 20,
    height: 40,
    justifyContent: 'center',
    borderRadius: 2,
  },
  dateInput: {
    alignItems: 'flex-start',
    fontWeight: 'bold',
    borderWidth: 0,
    fontSize: 16,
  },
  styleText: {textAlign: 'left', alignSelf: 'stretch', marginLeft: 20},
});
const mapStateToProps = (state, ownProps) => {
  const {subject_name} = state.SubjectReducer;
  return {subject_name};
};
export default connect(mapStateToProps, {valueChange})(SubjectForm);
