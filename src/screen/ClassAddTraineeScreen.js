import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import FormClassTraineeScreen from '../components/FormFeature/FormClassTraineeScreen';
import {} from '../store/actions/ClassAction';
class ClassAddTraineeScreen extends Component {
  async componentDidMount() {
    console.disableYellowBox = true;
  }
  render() {
    return (
      <View style={styles.container}>
        <FormClassTraineeScreen />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default connect(null, null)(ClassAddTraineeScreen);
