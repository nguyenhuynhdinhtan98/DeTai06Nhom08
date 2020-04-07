import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from 'react-native';
import {getAllMarkTrainee} from '../../store/actions/TraineeAction';
import {connect} from 'react-redux';
import {Icon} from 'react-native-elements';
import Modal from 'react-native-modal';
class TableEditScreen extends React.Component {
  componentDidMount() {
    this.props.getAllMarkTrainee(this.props.trainee_id);
  }
  showModal = () => {
    return (
      <Modal isVisible={true}>
        <View style={{flex: 1}}>
          <Text>Hello!</Text>
          <Button title="Hide modal" />
        </View>
      </Modal>
    );
  };
  render() {
    return (
      <>
        <View style={styles.headerList}>
          <Text style={[styles.textHeaderList, {flex: 2}]}>Subject</Text>
          <Text style={[styles.textHeaderList, {flex: 1}]}>Mark</Text>
          <Text style={[styles.textHeaderList, {flex: 1}]}>Edit</Text>
        </View>
        <View style={styles.listRow}>
          <FlatList
            data={this.props.mark}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View style={styles.containerItemList}>
                <Text style={[styles.textContentList, {flex: 2}]}>
                  {item.subject.subject_name}
                </Text>
                <Text style={[styles.textContentList, {flex: 1}]}>
                  {item.mark}
                </Text>
                <Text style={[styles.textContentList, {flex: 1}]}>
                  <Text>+</Text>
                  {/* <Icon
                    raised
                    name="heartbeat"
                    type="font-awesome"
                    color="#f50"
                    onPress={() => console.log('hello')}
                  /> */}
                </Text>
              </View>
            )}
          />
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  headerList: {
    width: '100%',
    height: 25,
    borderBottomWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
    backgroundColor: '#ddd',
  },
  listRow: {
    width: '100%',
    flex: 1,
  },
  textHeaderList: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 5,
  },
  textContentList: {
    fontWeight: '500',
    fontSize: 15,
    marginLeft: 5,
    flex: 1,
  },
  containerItemList: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 5,
  },
});

const mapStateToProps = (state, ownProps) => {
  const {mark} = state.TraineeReducer;
  return {mark};
};
export default connect(mapStateToProps, {getAllMarkTrainee})(TableEditScreen);
