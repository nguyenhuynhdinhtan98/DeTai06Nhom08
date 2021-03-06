import React, {Component} from 'react';
import {Text} from 'react-native-elements';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {signOut} from '../store/actions/LoginAction';
import {
  getAllClass,
  getAllTrainee,
  getAllSubject,
  getAllTrainer,
} from '../store/actions/StaticAction';
import ButtonHomeScreen from '../components/Button/ButtonHomeScreen';
import TextHeaderHomeScreen from '../components/FormFeature/TextHeaderHomeScreen';
import {requestPermission} from '../functions/functions';
class HomeScreen extends Component {
  componentDidMount() {
    requestPermission();
    this.props.getAllClass();
    this.props.getAllTrainee();
    this.props.getAllSubject();
    this.props.getAllTrainer();
    if (!this.props.user.uid) {
      this.props.navigation.navigate('LoginScreen');
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextHeaderHomeScreen>
          <ButtonHomeScreen
            title="Manage Class"
            onPress={() => this.props.navigation.navigate('ManageClassScreen')}
          />
          <ButtonHomeScreen
            title="Manage Trainee"
            onPress={() =>
              this.props.navigation.navigate('ManageTraineeScreen')
            }
          />
          <ButtonHomeScreen
            title="Manage Trainer"
            onPress={() =>
              this.props.navigation.navigate('ManageTrainerScreen')
            }
          />
          <ButtonHomeScreen
            title="Manage Subject"
            onPress={() =>
              this.props.navigation.navigate('ManageSubjectScreen')
            }
          />
          <ButtonHomeScreen
            title="Staticial"
            onPress={() => this.props.navigation.navigate('ManageStaticScreen')}
          />
          <View style={styles.signOutContainer}>
            <Text style={styles.textUserName}>{this.props.user.email} : </Text>
            <TouchableOpacity
              onPress={() =>
                this.props.signOut(
                  this.props.navigation.navigate('LoginScreen'),
                )
              }>
              <Text style={styles.textSignOut}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </TextHeaderHomeScreen>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: '100%',
    padding: 20,
  },
  signOutContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 20,
  },
  textUserName: {fontWeight: '500', fontSize: 15},
  textSignOut: {
    marginLeft: 5,
    fontSize: 15,
    fontWeight: '500',
    textDecorationLine: 'underline',
    color: '#85CEFF',
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.LoginReducer.user,
  };
};
export default connect(mapStateToProps, {
  signOut,
  getAllClass,
  getAllTrainee,
  getAllTrainer,
  getAllSubject,
})(HomeScreen);
