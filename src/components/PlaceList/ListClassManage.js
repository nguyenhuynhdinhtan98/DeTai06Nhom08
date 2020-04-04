import React, {useState} from 'react';
import {Text, FlatList, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {Card, CardItem} from 'native-base';
const ListClassManage = ({data, navigation}) => {
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
              <Icon name="times" type="font-awesome" color="black" size={20} />
            </CardItem>
          </Card>
        </TouchableOpacity>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default ListClassManage;