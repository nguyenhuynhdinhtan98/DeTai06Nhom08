import React from 'react';
import {Input} from 'react-native-elements';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const FormInput = ({
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  value,
  error,
  ...rest
}) => (
  <View style={styles.inputContainer}>
    <Input
      {...rest}
      placeholderTextColor="grey"
      name={name}
      value={value}
      placeholder={placeholder}
      style={styles.input}
      errorMessage={error}
    />
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    margin: 15,
  },
});

export default FormInput;
