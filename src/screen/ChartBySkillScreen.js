import React, {Component} from 'react';
import PureChart from 'react-native-pure-chart';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {
  getAllClass,
  getAllTrainee,
  getAllSubject,
  getAllTrainer,
} from '../store/actions/StaticAction';
import {connect} from 'react-redux';
import _ from 'lodash';
class ChartBySkillScreen extends Component {
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
    // group of skill members
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
        x: groupName,
        y: groups[groupName].length,
      });
    }
    if (myArray.length > 0) {
      myArray.sort((a, b) => a.x.localeCompare(b.x));
    }
    this.setState({array: myArray});
  };
  render() {
    let data = [
      {
        data: this.state.array,
        color: '#297AB1',
      },
    ];

    return (
      <View style={styles.container}>
        <Text style={styles.textColumn}>Number of skill</Text>
        <View styles={styles.containerChart}>
          <PureChart
            data={data} // value in chart
            type="bar" //style chart
            height={580}
            width={'100%'}
            xAxisColor={'black'}
            yAxisColor={'black'}
            minValue={0}
            showEvenNumberXaxisLabel={false}
            numberOfYAxisGuideLine={10}
            color="black"
          />
        </View>
        <Text style={styles.textColumn}>Skill name</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textColumn: {fontSize: 10, fontWeight: 'bold', margin: 10},
  containerChart: {
    flex: 1,
    justifyContent: 'center',
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
})(ChartBySkillScreen);
