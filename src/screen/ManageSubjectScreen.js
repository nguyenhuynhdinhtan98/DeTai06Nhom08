import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import FormSubjectManage from '../components/FormFeature/FormSubjectManage';
import {getAllSubject} from '../store/actions/SubjectAction';
class ManageSubjectScreen extends Component {
  componentDidMount() {
    console.disableYellowBox = true;
    this.props.getAllSubject();
  }
  render() {
    return (
      <View style={styles.container}>
        <FormSubjectManage navigation={this.props.navigation} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(null, {getAllSubject})(ManageSubjectScreen);
