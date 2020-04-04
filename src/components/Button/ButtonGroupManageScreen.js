import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
const ButtonGroupManageScreen = ({
  navigation,
  nameImportNavigation,
  nameAddNavigation,
}) => {
  return (
    <>
      <View style={styles.buttonGroup}>
        <TouchableOpacity>
          <Icon
            name="file"
            type="font-awesome"
            color="black"
            size={40}
            onPress={() => navigation.navigate(nameImportNavigation)}
          />
          <Text style={styles.textButtonGroup}>Import</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity>
          <Icon
            name="user-plus"
            type="font-awesome"
            color="black"
            size={40}
            onPress={() => navigation.navigate(nameAddNavigation)}
          />
          <Text style={styles.textButtonGroup}>Add</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: 'column',
    marginLeft: 20,
    marginRight: 20,
  },
  textButtonGroup: {
    marginTop: 5,
    fontWeight: '600',
    fontSize: 15,
  },
});
export default ButtonGroupManageScreen;
