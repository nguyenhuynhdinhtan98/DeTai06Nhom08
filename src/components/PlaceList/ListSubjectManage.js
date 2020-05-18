import React, {useState} from 'react';
import {Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {Card, CardItem} from 'native-base';
import firebaseConfigure from '../../config/configureFirebase';
import {subjectRemove} from '../../store/actions/SubjectAction';
const ListSubjectManage = ({data, navigation}) => {
  subjectRemoveItem = (subject) => {
    let arr = [];
    //get all class
    firebaseConfigure
      .database()
      .ref('/class')
      .on('value', (snapshot) => {
        Object.values(snapshot.val()).forEach((item) => {
          if (item.subject_id !== undefined) {
            arr.push(...item.subject_id);
          }
        });
      });
    if (arr.includes(subject.subject_id)) {
      Alert.alert(
        'Subject is existing on Class',
        'Please remove subject on Class',
      );
    } else {
      subjectRemove(subject.subject_id);
    }
  };
  confirmRemove = (subject) => {
    Alert.alert(
      `Yout want remove ${subject.subject_name} ?`,
      ' ',
      [
        {text: 'No', style: 'cancel'},
        {text: 'Yes', onPress: () => subjectRemoveItem(subject)},
      ],
      {cancelable: false},
    );
  };
  return (
    <FlatList
      data={data}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SubjectEditScreen', {item: item})
          }>
          <Card>
            <CardItem
              style={{
                justifyContent: 'space-between',
                marginLeft: 5,
                marginRight: 5,
              }}>
              <Text>{item.subject_name}</Text>
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
export default connect(null, {subjectRemove})(ListSubjectManage);
