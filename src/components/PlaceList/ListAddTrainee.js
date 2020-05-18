import React, {Component, useState} from 'react';
import {Text, FlatList, View, TouchableOpacity} from 'react-native';
import {Icon, CheckBox} from 'react-native-elements';
import {connect} from 'react-redux';
import {Card, CardItem} from 'native-base';
import {valueChange} from '../../store/actions/ClassAction';
class ListAddTrainee extends Component {
  componentDidMount() {
    if (this.props.trainee_not_exists.length !== 0) {
      this.addTraineeExist();
    }
  }
  addTraineeExist = async () => {
    let arr = [];
    // group trainee exist
    await this.props.trainee.forEach(async (e1) => {
      //check trainee is exists
      if (this.props.trainee_id.includes(e1.trainee_id) === true) {
        await arr.push(e1);
      }
    });
    if (this.props.trainee_not_exists.length !== 0) {
      this.props.trainee_not_exists.forEach((e1) => arr.push(e1));
    }
    await this.props.valueChange({
      prop: 'trainee_exists',
      value: arr,
    });
  };
  handleGetCheckedToList = (trainee_id) => {
    let process;
    // if trainee exists
    !this.props.trainee_id.includes(trainee_id)
      ? (process = [...this.props.trainee_id, trainee_id])
      : (process = this.props.trainee_id.filter((item) => item !== trainee_id));
    this.props.valueChange({
      prop: 'trainee_id',
      value: process,
    });
  };
  render() {
    return (
      <FlatList
        data={this.props.data}
        renderItem={({item, index}) => (
          <TouchableOpacity>
            <Card
              style={{
                justifyContent: 'space-between',
                marginLeft: 5,
                marginRight: 5,
              }}>
              <CardItem>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{flexDirection: 'column', flex: 2}}>
                    <Text>{item.trainee_id}</Text>
                    <Text>{item.trainee_name}</Text>
                  </View>
                  <View style={{flexDirection: 'column', flex: 1}}>
                    <CheckBox
                      center
                      iconLeft
                      title="Added"
                      checked={this.props.trainee_id.includes(item.trainee_id)}
                      containerStyle={{
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                      }}
                      onPress={() =>
                        this.handleGetCheckedToList(item.trainee_id)
                      }
                    />
                  </View>
                </View>
              </CardItem>
            </Card>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const {
    trainee,
    trainee_id,
    trainee_exists,
    trainee_not_exists,
  } = state.ClassReducer;
  return {
    trainee,
    trainee_id,
    trainee_exists,
    trainee_not_exists,
  };
};
export default connect(mapStateToProps, {valueChange})(ListAddTrainee);
