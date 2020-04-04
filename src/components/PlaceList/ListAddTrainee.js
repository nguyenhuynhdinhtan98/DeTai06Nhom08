import React, {Component, useState} from 'react';
import {Text, FlatList, View, TouchableOpacity} from 'react-native';
import {Icon, CheckBox} from 'react-native-elements';
import {connect} from 'react-redux';
import {Card, CardItem} from 'native-base';
import {valueChange} from '../../store/actions/ClassAction';
class ListAddTrainee extends Component {
  handleGetCheckedToList = (trainee_id) => {
    let process;
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
                    onPress={() => this.handleGetCheckedToList(item.trainee_id)}
                  />
                </View>
              </View>
            </CardItem>
          </Card>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const {trainee, trainee_id} = state.ClassReducer;
  return {
    trainee,
    trainee_id,
  };
};
export default connect(mapStateToProps, {valueChange})(ListAddTrainee);
