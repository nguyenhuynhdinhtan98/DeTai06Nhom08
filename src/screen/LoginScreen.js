import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import TextHeaderHomeScreen from '../components/FormFeature/TextHeaderHomeScreen';
import LoginForm from '../components/PlaceInput/LoginForm';
import {requestPermission} from '../functions/functions';
import {signIn, stateLocked, stateUnLocked} from '../store/actions/LoginAction';
class LoginScreen extends Component {
  componentDidMount() {
    console.disableYellowBox = true;
    requestPermission();
    AsyncStorage.getItem('user').then((value) => {
      this.handldeAutoLogin(value);
    });
  }
  componentWillUpdate(nextProps) {
    if (this.props.user && Object.keys(nextProps.user).length != 0) {
      this.props.navigation.navigate('HomeScreen');
    }
  }
  handldeAutoLogin = async (value) => {
    if (JSON.parse(value)) {
      if (JSON.parse(value).email && JSON.parse(value).password) {
        const {email, password} = JSON.parse(value);
        this.props.signIn(email, password);
        this.props.navigation.navigate('HomeScreen');
      }
    }
  };
  handldeOnLogin = () => {
    const {email, password} = this.props;
    this.props.signIn(email, password);
  };
  renderButton() {
    if (this.props.counter >= 3) {
      this.props.stateLocked();
      setTimeout(() => {
        this.props.stateUnLocked();
      }, 300000);
      return (
        <Button
          large
          raised
          icon={<Icon name="arrow-right" size={15} color="white" />}
          title="Login"
          loading={this.props.isLocked}
          containerStyle={{marginTop: 5}}
        />
      );
    } else {
      return (
        <Button
          large
          raised
          icon={<Icon name="arrow-right" size={15} color="white" />}
          title="Login"
          loading={this.props.isLoading}
          onPress={() =>
            this.handldeOnLogin(this.props.email, this.props.password)
          }
          containerStyle={{marginTop: 5}}
          disabled={this.props.isLocked}
        />
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextHeaderHomeScreen>
          <LoginForm>
            <View style={styles.buttonContainer}>{this.renderButton()}</View>
          </LoginForm>
        </TextHeaderHomeScreen>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    marginLeft: 25,
    marginRight: 25,
  },
  spinnerStyle: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const mapStateToProps = (state, ownProps) => {
  const {
    email,
    password,
    user,
    isLoading,
    counter,
    isLocked,
  } = state.LoginReducer;
  return {
    email,
    password,
    user,
    isLoading,
    counter,
    isLocked,
  };
};
export default connect(mapStateToProps, {signIn, stateLocked, stateUnLocked})(
  LoginScreen,
);
