import React, {Component, useState} from 'react';
import {Text, FlatList, View, TouchableOpacity} from 'react-native';
import {Icon, CheckBox} from 'react-native-elements';
import {connect} from 'react-redux';
import {Card, CardItem} from 'native-base';
import {valueChange} from '../../store/actions/ClassAction';
class ListAddSubject extends Component {
  //auto check subject  when  it is exists
  handleGetCheckedToList = (subject_id) => {
    let process;
    // if subject exists
    !this.props.subject_id.includes(subject_id)
      ? (process = [...this.props.subject_id, subject_id])
      : (process = this.props.subject_id.filter((item) => item !== subject_id));
    // when subject change
    this.props.valueChange({
      prop: 'subject_id',
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
                  <Text>{item.subject_id}</Text>
                  <Text>{item.subject_name}</Text>
                </View>
                <View style={{flexDirection: 'column', flex: 1}}>
                  <CheckBox
                    center
                    iconLeft
                    title="Added"
                    checked={this.props.subject_id.includes(item.subject_id)}
                    containerStyle={{
                      backgroundColor: 'transparent',
                      borderWidth: 0,
                    }}
                    onPress={() => this.handleGetCheckedToList(item.subject_id)}
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
  const {subject_id, subject, trainee_exists} = state.ClassReducer;
  return {subject_id, subject, trainee_exists};
};
export default connect(mapStateToProps, {valueChange})(ListAddSubject);
