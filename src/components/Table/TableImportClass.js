import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
const TableImportClass = ({value}) => {
  return (
    <>
      <View style={styles.headerList}>
        <Text style={styles.textHeaderList}>NAME</Text>
      </View>
      <View style={styles.listRow}>
        <FlatList
          data={value}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.containerItemList}>
              <Text style={styles.textContentList}>{item.class_name}</Text>
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
    justifyContent: 'center',
  },
  listRow: {
    width: '100%',
    flex: 1,
  },
  textHeaderList: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 5,
    flex: 1,
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
export default TableImportClass;
