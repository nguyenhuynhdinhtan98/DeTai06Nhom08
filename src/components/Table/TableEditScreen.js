import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Icon} from 'react-native-elements';
const TableEditScreen = ({value}) => {
  return (
    <>
      <View style={styles.headerList}>
        <Text style={[styles.textHeaderList, {flex: 2}]}>Subject</Text>
        <Text style={[styles.textHeaderList, {flex: 1}]}>Mark</Text>
        <Text style={[styles.textHeaderList, {flex: 1}]}>Edit</Text>
      </View>
      <View style={styles.listRow}>
        <FlatList
          data={value}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.containerItemList}>
              <Text style={[styles.textContentList, {flex: 2}]}>
                {item.trainee_name}
              </Text>
              <Text style={[styles.textContentList, {flex: 1}]}>
                {item.date_of_birth}
              </Text>
              <Text style={[styles.textContentList, {flex: 1}]}>
                <Icon name="plus" type="font-awesome" color="white" size={25} />
              </Text>
            </View>
          )}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  headerList: {
    width: '100%',
    height: 25,
    borderBottomWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
    backgroundColor: '#ddd',
  },
  listRow: {
    width: '100%',
    flex: 1,
  },
  textHeaderList: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 5,
  },
  textContentList: {
    fontWeight: '500',
    fontSize: 12,
    marginLeft: 5,
    flex: 1,
  },
  containerItemList: {
    justifyContent: 'center',
    height: 35,
    flexDirection: 'row',
    marginTop: 5,
  },
});

export default TableEditScreen;
