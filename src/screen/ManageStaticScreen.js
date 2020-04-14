import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {
  getAllClass,
  getAllTrainee,
  getAllSubject,
  getAllTrainer,
} from '../store/actions/StaticAction';
import FormStaticManage from '../components/FormFeature/FormStaticManage';
class ManageStaticScreen extends Component {
  componentDidMount() {
    console.disableYellowBox = true;
    this.props.getAllClass();
    this.props.getAllTrainee();
    this.props.getAllSubject();
    this.props.getAllTrainer();
  }
  render() {
    return (
      <View style={styles.container}>
        <FormStaticManage navigation={this.props.navigation} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default connect(null, {
  getAllClass,
  getAllTrainee,
  getAllTrainer,
  getAllSubject,
})(ManageStaticScreen);
