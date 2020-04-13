import React, {useState} from 'react';
import {Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {Card, CardItem} from 'native-base';
import {classRemove} from '../../store/actions/ClassAction';
const ListClassManage = ({data, navigation}) => {
  const checkItem = (item) => {
    if (!item.subject_id && !item.subject_id) {
      classRemove(item.class_id);
    } else {
      Alert.alert(
        'Trainees and subjects is existing on Class',
        'Please remove trainees and subjects',
      );
    }
  };
  const confirmRemove = (item) => {
    Alert.alert(
      `Yout want remove ${item.class_name} ?`,
      ' ',
      [
        {text: 'No', style: 'cancel'},
        {text: 'Yes', onPress: () => checkItem(item)},
      ],
      {cancelable: false},
    );
  };
  return (
    <FlatList
      data={data}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('ClassEditScreen', {item: item})}>
          <Card>
            <CardItem
              style={{
                justifyContent: 'space-between',
                marginLeft: 5,
                marginRight: 5,
              }}>
              <Text>{item.class_name}</Text>
              <Icon
                name="times"
                type="font-awesome"
                color="black"
                size={20}
                onPress={() => confirmRemove(item)}
              />
            </CardItem>
          </Card>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default connect(null, {classRemove})(ListClassManage);
