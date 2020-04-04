import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import FormClassSubjectScreen from '../components/FormFeature/FormClassSubjectScreen';
import {} from '../store/actions/ClassAction';
class ClassAddSubjectScreen extends Component {
  async componentDidMount() {
    console.disableYellowBox = true;
  }
  render() {
    return (
      <View style={styles.container}>
        <FormClassSubjectScreen />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default connect(null, null)(ClassAddSubjectScreen);
