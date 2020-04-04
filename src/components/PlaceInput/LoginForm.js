import React from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import FormInput from '../Input/FormInput';
import {emailChange, passwordChange} from '../../store/actions/LoginAction';
class LoginForm extends React.Component {
  onEmailChange = text => {
    this.props.emailChange(text);
  };
  onPasswordChange = text => {
    this.props.passwordChange(text);
  };

  render() {
    return (
      <View style={styles.container}>
        <FormInput
          value={this.props.email}
          label="Email"
          name="email"
          onChangeText={this.onEmailChange}
          placeholder="example@gmail.com"
          autoCapitalize="none"
          iconColor="#2C384A"
        />
        <FormInput
          value={this.props.password}
          label="Password"
          name="password"
          placeholder="Enter password"
          onChangeText={this.onPasswordChange}
          secureTextEntry
          error={this.props.error}
          iconColor="#2C384A"
        />

        {this.props.children}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textError: {
    color: 'red',
    fontSize: 15,
    fontStyle: 'italic',
    alignSelf: 'center',
  },
});
const mapStateToProps = (state, ownProps) => {
  const {email, password, error, user} = state.LoginReducer;
  return {
    email,
    password,
    error,
    user,
  };
};

export default connect(mapStateToProps, {emailChange, passwordChange})(
  LoginForm,
);
