import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
const ButtonGroupImportScreen = ({onPressImport, onPressDownloadFile}) => {
  return (
    <>
      <View style={styles.buttonGroup}>
        <TouchableOpacity onPress={onPressImport}>
          <Icon name="download" type="font-awesome" color="black" size={40} />
          <Text style={styles.textButtonGroup}>Click To Import CSV File</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity onPress={onPressDownloadFile}>
          <Icon name="file" type="font-awesome" color="black" size={40} />
          <Text style={styles.textButtonGroup}>Download Sample File</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  buttonGroup: {flexDirection: 'column', margin: 15},
  textButtonGroup: {
    marginTop: 5,
    fontWeight: '600',
    fontSize: 15,
  },
  headerList: {
    width: '100%',
    height: 25,
    borderBottomWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
  },
});
export default ButtonGroupImportScreen;
