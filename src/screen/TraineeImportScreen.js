import React, {Component} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import _ from 'lodash';
import {traineeCreate} from '../store/actions/TraineeAction';
import TableImportTrainee from '../components/Table/TableImportTrainee';
import ButtonGroupImportScreen from '../components/Button/ButtonGroupImportScreen';
import {
  singleFilePicker,
  csvDatatoJson,
  handldeDownloadFileExample,
} from '../functions/functions';
import Papa from 'papaparse';
class TraineeImportScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {valueFile: []};
  }
  async handldeChooseFile() {
    const uri = await singleFilePicker();
    const value = await csvDatatoJson(uri);
    if (value.data.length !== 0) {
      let check = await this.handldeCheckFileCSVHeader(value.data);
      if (check) {
        this.setState({valueFile: value.data});
      } else {
        Alert.alert('Invalid file');
      }
    } else {
      Alert.alert('File is not data');
    }
  }
  handldeCheckFileCSVHeader = async (value) => {
    return await value.some((item) => {
      if (
        item.hasOwnProperty('trainee_name') === true &&
        item.hasOwnProperty('date_of_birth') === true &&
        item.hasOwnProperty('skill') === true
      ) {
        return item;
      }
    });
  };

  async handldeSaveData() {
    if (this.state.valueFile.length !== 0) {
      await _.forEach(this.state.valueFile, (item) =>
        this.props.traineeCreate(
          item.trainee_name,
          item.date_of_birth,
          item.skill,
        ),
      );
      await this.props.navigation.goBack();
    } else {
      Alert.alert('You Have Import To File');
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerButton}>
          <ButtonGroupImportScreen
            onPressImport={() => this.handldeChooseFile()}
            onPressDownloadFile={() =>
              handldeDownloadFileExample('CSV_Trainee.csv')
            }
          />
        </View>
        <View style={styles.containerList}>
          <TableImportTrainee value={this.state.valueFile} />
        </View>
        <View>
          <Button
            raised
            icon={
              <Icon
                name="plus-square"
                type="font-awesome"
                color="white"
                size={25}
              />
            }
            onPress={() => this.handldeSaveData()}
            containerStyle={{margin: 20}}
            title="Save"
          />
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
  containerButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  containerList: {
    flex: 9,
    borderWidth: 1,
    borderColor: '#000',
    marginLeft: 20,
    marginRight: 20,
    fontWeight: '600',
  },
  containerItem: {
    borderBottomColor: 'black',
    borderWidth: 1,
  },
});
export default connect(null, {traineeCreate})(TraineeImportScreen);
