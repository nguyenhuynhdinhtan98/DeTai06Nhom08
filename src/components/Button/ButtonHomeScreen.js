import React, {Component} from 'react';
import {Button} from 'react-native-elements';
import {StyleSheet} from 'react-native';

const ButtonHomeScreen = ({title, onPress}) => {
  return (
    <Button
      large
      type="solid"
      title={title}
      containerStyle={styles.button}
      onPress={onPress}
    />
  );
};
const styles = StyleSheet.create({
  button: {
    width: '100%',
    padding: 20,
    borderRadius: 10,
  },
});

export default ButtonHomeScreen;
