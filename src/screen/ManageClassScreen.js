import React, {Component} from 'react';
import {BackHandler} from 'react-native';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import FormClassManage from '../components/FormFeature/FormClassManage';
import {
  getAllClass,
  getAllTrainee,
  getAllSubject,
  getAllTrainer,
  getAllMark,
} from '../store/actions/ClassAction';
class ManageClassScreen extends Component {
  async componentDidMount() {
    console.disableYellowBox = true;
    await this.props.getAllTrainee();
    await this.props.getAllSubject();
    await this.props.getAllTrainer();
    await this.props.getAllMark();
    await this.props.getAllClass();
  }

  render() {
    return (
      <View style={styles.container}>
        <FormClassManage navigation={this.props.navigation} />
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
  getAllMark,
})(ManageClassScreen);
