import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
import {connect} from 'react-redux';
import {valueChange} from '../../store/actions/SubjectAction';

class SubjectForm extends Component {
  render() {
    return (
      <>
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
    width: '90%',
    margin: 10,
    height: 40,
    justifyContent: 'center',
  },
  dateInput: {
    alignItems: 'flex-start',
    fontWeight: 'bold',
    borderWidth: 0,
    fontSize: 16,
  },
});
const mapStateToProps = (state, ownProps) => {
  const {subject_name} = state.SubjectReducer;
  return {subject_name};
};
export default connect(mapStateToProps, {valueChange})(SubjectForm);
