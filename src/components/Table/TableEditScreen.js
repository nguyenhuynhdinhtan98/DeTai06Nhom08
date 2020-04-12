import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  getAllMarkTrainee,
  valueChange,
  removeInput,
} from '../../store/actions/TraineeAction';
class TableEditScreen extends React.Component {
  visibleModal = (value) => {
    this.props.valueChange({
      prop: 'subject_item',
      value: {value: value, isVisible: !this.props.subject_item.isVisible},
    });
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
            data={this.props.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => this.visibleModal(item)}>
                <View style={styles.containerItemList}>
                  <Text
                    style={[
                      styles.textContentList,
                      {
                        flex: 2,
                        justifyContent: 'center',
                      },
                    ]}>
                    {item.subject_name}
                  </Text>
                  <Text style={[styles.textContentList, {flex: 1}]}>
                    {item.mark}
                  </Text>
                  <Text style={[styles.textContentList, {flex: 1}]}>
                    <FontAwesome name="plus" size={30} solid />
                  </Text>
                </View>
              </TouchableOpacity>
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
    backgroundColor: '#EFEFEF',
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
    flexDirection: 'row',
    marginTop: 5,
    alignItems: 'center',
  },
});

const mapStateToProps = (state, ownProps) => {
  const {subject_item, mark, subject, allMark} = state.TraineeReducer;
  return {subject_item, mark, subject, allMark};
};
export default connect(mapStateToProps, {
  valueChange,
  removeInput,
  getAllMarkTrainee,
})(TableEditScreen);
