import React from 'react';
import {StyleSheet} from 'react-native';
import {SearchBar} from 'react-native-elements';
const SearchList = ({value, onChange}) => {
  return (
    <SearchBar
      lightTheme
      value={value}
      placeholder="Type Here..."
      platform="android"
      onChangeText={onChange}
      containerStyle={styles.searchBar}
      inputContainerStyle={{backgroundColor: '#fff', height: 25}}
    />
  );
};
const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    marginLeft: 20,
    marginRight: 20,
    height: 40,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 2,
    borderRadius: 2,
    elevation: 1,
    shadowOpacity: 0.1,
  },
});
export default SearchList;
