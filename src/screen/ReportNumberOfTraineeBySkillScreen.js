import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {
  getAllClass,
  getAllTrainee,
  getAllSubject,
  getAllTrainer,
} from '../store/actions/StaticAction';
import {Picker, Item} from 'native-base';
import {Input, Icon, Button} from 'react-native-elements';
import ButtonHomeScreen from '../components/Button/ButtonHomeScreen';
import {connect} from 'react-redux';
import {saveFile} from '../functions/functions';
class ReportNumberOfTraineeBySkillScreen extends Component {
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
    var groups = {};
    // group of trainee members on class
    for (var i = 0; i < this.props.trainee.length; i++) {
      var groupName = this.props.trainee[i].skill;
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(this.props.trainee[i].skill);
    }
    let myArray = [];
    for (var groupName in groups) {
      myArray.push({
        Skill: groupName,
        NumberOfClass: groups[groupName].length,
      });
    }
    if (myArray.length > 0) {
      myArray.sort((a, b) => a.Skill.localeCompare(b.Skill));
    }
    this.setState({array: myArray});
  };

  exportToFile = (value) => {
    saveFile(value, 'ReportNumberOfTraineeBySkill');
  };

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
              data={this.state.array}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <View style={styles.containerItemList}>
                  <Text style={[styles.textContentList, {flex: 3}]}>
                    {item.Skill}
                  </Text>
                  <Text style={[styles.textContentList, {flex: 1}]}>
                    {item.NumberOfClass}
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
const mapStateToProps = (state, ownProps) => {
  return {
    trainee: state.StaticReducer.trainee,
    class: state.StaticReducer.class,
  };
};
export default connect(mapStateToProps, {
  getAllClass,
  getAllTrainee,
  getAllTrainer,
  getAllSubject,
})(ReportNumberOfTraineeBySkillScreen);
