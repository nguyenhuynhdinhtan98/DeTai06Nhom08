import React, {useState} from 'react';
import {Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import {Card, CardItem} from 'native-base';
import firebaseConfigure from '../../config/configureFirebase';
const ListTrainerManage = ({data, navigation}) => {
  trainerRemove = (trainer) => {
    firebaseConfigure
      .database()
      .ref('/class')
      .orderByChild('trainer_id')
      .equalTo(trainer.trainer_id)
      .on('value', (snapshot) => {
        if (snapshot.val() === null) {
          firebaseConfigure
            .database()
            .ref(`/trainer/${trainer.trainer_id}`)
            .remove();
        } else {
          Alert.alert(
            `Subject ${trainer.trainer_name} is existing on Class`,
            'You can not remove',
          );
        }
      });
  };
  confirmRemove = (item) => {
    Alert.alert(
      `Yout want remove ${item.trainer_name} ?`,
      ' ',
      [
        {text: 'No', style: 'cancel'},
        {text: 'Yes', onPress: () => trainerRemove(item)},
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
            navigation.navigate('TrainerEditScreen', {item: item})
          }>
          <Card>
            <CardItem
              style={{
                justifyContent: 'space-between',
                marginLeft: 5,
                marginRight: 5,
              }}>
              <Text>{item.trainer_name}</Text>
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

export default ListTrainerManage;
