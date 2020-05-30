import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import FormTraineeManage from '../components/FormFeature/FormTraineeManage';
import {getAllTrainee, getAllClass} from '../store/actions/TraineeAction';
class ManageTraineeScreen extends Component {
  async componentDidMount() {
    console.disableYellowBox = true;
    await this.props.getAllTrainee();
    await this.props.getAllClass();
  }
  render() {
    return (
      <View style={styles.container}>
        <FormTraineeManage navigation={this.props.navigation} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(null, {getAllTrainee, getAllClass})(ManageTraineeScreen);
