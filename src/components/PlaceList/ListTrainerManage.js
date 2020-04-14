import React, {useState} from 'react';
import {Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import {Icon} from 'react-native-elements';
import {Card, CardItem} from 'native-base';
import {connect} from 'react-redux';
import firebaseConfigure from '../../config/configureFirebase';
import {trainerRemove} from '../../store/actions/TrainerAction';
const ListTrainerManage = ({data, navigation}) => {
  trainerRemoveItem = (trainer) => {
    firebaseConfigure
      .database()
      .ref('/class')
      .orderByChild('trainer_id')
      .equalTo(trainer.trainer_id)
      .on('value', (snapshot) => {
        if (snapshot.val() === null) {
          trainerRemove(trainer.trainer_id);
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
        {text: 'Yes', onPress: () => trainerRemoveItem(item)},
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

export default connect(null, {trainerRemove})(ListTrainerManage);
