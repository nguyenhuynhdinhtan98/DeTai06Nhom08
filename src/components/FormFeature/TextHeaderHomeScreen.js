import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
const TextHeaderHomeScreen = props => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.logoText}>Fresher Accademy</Text>
        <Text style={styles.logoText}>Trainee Management</Text>
      </View>
      <View style={styles.formContainer}>{props.children}</View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 30,
    fontWeight: '800',
  },
  formContainer: {flex: 2},
});
export default TextHeaderHomeScreen;
