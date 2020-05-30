import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {
  getAllClass,
  getAllTrainee,
  getAllSubject,
  getAllTrainer,
  valueChange,
} from '../store/actions/StaticAction';
import {Picker, Item} from 'native-base';
import {searchFilterClass} from '../functions/functions';
import {Input, Icon, Button} from 'react-native-elements';
import ButtonHomeScreen from '../components/Button/ButtonHomeScreen';
import _ from 'lodash';
import {connect} from 'react-redux';
import {saveFile} from '../functions/functions';
class ReportClassBySkillScreen extends Component {
  state = {array: []};
  componentDidMount() {
    console.disableYellowBox = true;
    this.props.getAllClass();
    this.props.getAllTrainee();
    this.props.getAllSubject();
    this.props.getAllTrainer();
    this.groupBySkill();
  }
  groupBySkill = () => {
    let arr = [];
    var groups = {};
    // group of trainee members on class
    this.props.trainee.forEach((item1) => {
      this.props.class.forEach((item2) => {
        if (item2.trainee_id != undefined) {
          if (item2.trainee_id.includes(item1.trainee_id) == true) {
            arr.push({
              class_name: item2.class_name,
              trainee_id: item1.trainee_id,
              skill: item1.skill,
            });
          }
        }
      });
    });
    for (var i = 0; i < arr.length; i++) {
      var groupName = arr[i].class_name;
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(arr[i].skill);
    }
    let myArray = [];
    for (var groupName in groups) {
      myArray.push({
        ClassName: groupName,
        Skill: groups[groupName],
        NumberOfSkill: groups[groupName].length,
      });
    }
    if (myArray.length > 0) {
      myArray.sort((a, b) => a.ClassName.localeCompare(b.ClassName));
    }
    this.setState({array: myArray});
  };
  exportToFile = (value) => {
    saveFile(value, 'ReportClassBySkill');
  };

  render() {
    let valueDropdownClass = () => {
      let value = _.compact(
        this.props.class.map((item) => {
          if (item.class_name.indexOf('_') != -1) {
            return item.class_name.split('_').shift();
          } else {
            return null;
          }
        }),
      );
      return Array.from(new Set(value));
    };
    let pickerItems = valueDropdownClass().map((element, i) => (
      <Picker.Item
        key={i}
        style={{fontFamily: 'SourceSansPro-Regular'}}
        label={element}
        value={element}
      />
    ));
    let showValue = (searchValue) => {
      if (searchValue === '0') {
        return this.state.array;
      } else {
        return this.state.array.filter((item) => {
          return item.ClassName.indexOf(searchValue) != -1;
        });
      }
    };
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Picker
            mode="dialog"
            iosIcon={<Icon name="arrow-down" />}
            style={{flex: 1}}
            selectedValue={this.props.group_name}
            onValueChange={(value) =>
              this.props.valueChange({prop: 'group_name', value: value})
            }>
            <Picker.Item label="Show All" value="0" />
            {pickerItems}
          </Picker>
        </View>
        <View style={styles.containerTable}>
          <View style={styles.headerList}>
            <Text style={[styles.textHeaderList, {flex: 2}]}>Class Name</Text>
            <Text style={[styles.textHeaderList, {flex: 1}]}>
              NumberOfTrainee
            </Text>
          </View>
          <View style={styles.listRow}>
            <FlatList
              data={showValue(this.props.group_name)}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <View style={styles.containerItemList}>
                  <Text style={[styles.textContentList, {flex: 2}]}>
                    {item.ClassName}
                  </Text>
                  <Text style={[styles.textContentList, {flex: 1}]}>
                    {item.NumberOfSkill}
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
        <View style={styles.containerButton}>
          <ButtonHomeScreen
            title="Export To File"
            onPress={() => this.exportToFile(this.state.array)}
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
  containerTable: {
    flex: 9,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    height: 40,
    justifyContent: 'center',
    borderRadius: 2,
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
  },
  containerItemList: {
    justifyContent: 'center',
    height: 50,
    flexDirection: 'row',
  },
});
const mapStateToProps = (state, ownProps) => {
  return {
    trainee: state.StaticReducer.trainee,
    class: state.StaticReducer.class,
    group_name: state.StaticReducer.group_name,
  };
};
export default connect(mapStateToProps, {
  getAllClass,
  getAllTrainee,
  getAllTrainer,
  getAllSubject,
  valueChange,
})(ReportClassBySkillScreen);
