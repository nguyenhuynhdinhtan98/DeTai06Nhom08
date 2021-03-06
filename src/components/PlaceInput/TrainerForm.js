import React, {Component, usetState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Input, Icon, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {Picker, Item} from 'native-base';
import DatePicker from 'react-native-datepicker';
import {valueChange} from '../../store/actions/TraineeAction';
import skill from '../../assets/data/skill';

class TrainerForm extends Component {
  render() {
    return (
      <>
        <Text style={styles.styleText}>Trainer Name</Text>
        <View style={styles.inputContainer}>
          <Input
            value={this.props.trainer_name}
            placeholder="Enter Your Trainer Name"
            inputContainerStyle={{borderBottomWidth: 0}}
            onChangeText={(text) =>
              this.props.valueChange({prop: 'trainer_name', value: text})
            }
            inputStyle={{fontSize: 16, marginLeft: -5}}
          />
        </View>
        <Text style={styles.styleText}>Date of birth</Text>
        <View style={styles.inputContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: 5,
              marginRight: 10,
            }}>
            <DatePicker
              date={this.props.date_of_birth}
              mode="date" //The enum of date, datetime and time
              androidMode={'spinner'} // style spinner date
              placeholder="Select Date Of Birth"
              format="DD-MM-YYYY" // format date
              minDate="01-01-1900"
              maxDate={
                new Date(
                  new Date().getFullYear() - 18,
                  new Date().getMonth() - 1,
                  new Date().getMonth() + 1,
                )
              }
              onDateChange={(date) =>
                this.props.valueChange({prop: 'date_of_birth', value: date})
              }
              showIcon={false}
              style={{flex: 1}}
              customStyles={{
                dateInput: styles.dateInput,
              }}
            />
            <Icon
              name="calendar"
              type="font-awesome"
              color="black"
              size={25}
              containerStyle={{justifyContent: 'center'}}
            />
          </View>
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
  const {trainer_name, date_of_birth} = state.TrainerReducer;
  return {trainer_name, date_of_birth};
};
export default connect(mapStateToProps, {valueChange})(TrainerForm);
