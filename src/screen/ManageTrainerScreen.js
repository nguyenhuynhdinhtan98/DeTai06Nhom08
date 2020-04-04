import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import FormTrainerManage from '../components/FormFeature/FormTrainerManage';
import {getAllTrainer} from '../store/actions/TrainerAction';
class ManageTrainerScreen extends Component {
  componentDidMount() {
    console.disableYellowBox = true;
    this.props.getAllTrainer();
  }
  render() {
    return (
      <View style={styles.container}>
        <FormTrainerManage navigation={this.props.navigation} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default connect(null, {getAllTrainer})(ManageTrainerScreen);
