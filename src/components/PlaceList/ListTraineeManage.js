import React, {useState} from 'react';
import {Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import {Card, CardItem} from 'native-base';
import {connect} from 'react-redux';
import firebaseConfigure from '../../config/configureFirebase';
import {traineeRemove} from '../../store/actions/TraineeAction';
const ListTraineeManage = ({data, navigation}) => {
  traineeRemoveItem = (trainee) => {
    let arr = [];
    let class_name = '';
    //get all class
    firebaseConfigure
      .database()
      .ref('/class')
      .on('value', (snapshot) => {
        Object.values(snapshot.val()).forEach((item) => {
          if (item.trainee_id !== undefined) {
            arr.push(...item.trainee_id);
            if (item.trainee_id.includes(trainee.trainee_id)) {
              class_name = item.class_name;
            }
          }
        });
      });
    if (arr.includes(trainee.trainee_id)) {
      Alert.alert(
        'Trainees is existing on ' + class_name,
        'Please remove trainees on ' + class_name,
      );
    } else {
      traineeRemove(trainee.trainee_id);
    }
  };
  confirmRemove = (trainee) => {
    Alert.alert(
      `Do you want remove ${trainee.trainee_name} ?`,
      ' ',
      [
        {text: 'No', style: 'cancel'},
        {text: 'Yes', onPress: () => traineeRemoveItem(trainee)},
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
            navigation.navigate('TraineeEditScreen', {item: item})
          }>
          <Card>
            <CardItem
              style={{
                justifyContent: 'space-between',
                marginLeft: 5,
                marginRight: 5,
              }}>
              <Text>{item.trainee_name}</Text>
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

export default connect(null, {traineeRemove})(ListTraineeManage);
