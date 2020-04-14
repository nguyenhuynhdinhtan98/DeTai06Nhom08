import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import data from '../assets/data/data';
import ButtonHomeScreen from '../components/Button/ButtonHomeScreen';
import {saveFile} from '../functions/functions';
class ReportNumberOfTraineeBySkillScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerTable}>
          <View style={styles.headerList}>
            <Text style={[styles.textHeaderList, {flex: 3}]}>Skill</Text>

            <Text style={[styles.textHeaderList, {flex: 1}]}>
              Number Of Trainee
            </Text>
          </View>
          <View style={styles.listRow}>
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <View style={styles.containerItemList}>
                  <Text style={[styles.textContentList, {flex: 3}]}>
                    {item.email}
                  </Text>
                  <Text style={[styles.textContentList, {flex: 1}]}>
                    {item.age}
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
        <View style={styles.containerButton}>
          <ButtonHomeScreen title="Export To File" />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerTable: {
    flex: 9,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  containerButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerList: {
    width: '100%',
    height: 45,
    borderWidth: 1,
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
    fontSize: 17,
    borderWidth: 1,
    borderColor: '#000',
  },
  textContentList: {
    fontWeight: '500',
    fontSize: 12,
    flex: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
  },
  containerItemList: {
    justifyContent: 'center',
    height: 40,
    flexDirection: 'row',
  },
});
export default ReportNumberOfTraineeBySkillScreen;
