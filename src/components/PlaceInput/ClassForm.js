import React, {Component, usetState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Input, Icon, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {Picker, Item} from 'native-base';
import DatePicker from 'react-native-datepicker';
import {valueChange} from '../../store/actions/ClassAction';
class ClassForm extends Component {
  render() {
    let pickerItems = this.props.trainer.map((element, i) => (
      <Picker.Item
        key={i}
        style={{fontFamily: 'SourceSansPro-Regular'}}
        label={element.trainer_name}
        value={element.trainer_id}
      />
    ));

    return (
      <>
        <View style={styles.inputContainer}>
          <Input
            value={this.props.class_name}
            placeholder="Enter Your Class Name"
            inputContainerStyle={{borderBottomWidth: 0}}
            onChangeText={text =>
              this.props.valueChange({prop: 'class_name', value: text})
            }
            inputStyle={{fontSize: 16, marginLeft: -5}}
          />
        </View>
        <View style={styles.inputContainer}>
          <Picker
            mode="dialog"
            placeholder="Select Data"
            iosIcon={<Icon name="arrow-down" />}
            style={{flex: 1}}
            selectedValue={this.props.trainer_id}
            onValueChange={value => {
              this.props.valueChange({prop: 'trainer_id', value: value});
            }}>
            <Picker.Item label="Please select an option..." value="0" />
            {pickerItems}
          </Picker>
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
  const {class_name, trainer, trainer_id} = state.ClassReducer;
  return {class_name, trainer, trainer_id};
};
export default connect(mapStateToProps, {valueChange})(ClassForm);
