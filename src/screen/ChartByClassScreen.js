import React, {Component} from 'react';
import PureChart from 'react-native-pure-chart';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {
  getAllClass,
  getAllTrainee,
  getAllSubject,
  getAllTrainer,
} from '../store/actions/StaticAction';
import _ from 'lodash';
import {connect} from 'react-redux';
class ChartByClassScreen extends Component {
  state = {array: []};
  componentDidMount() {
    console.disableYellowBox = true;
    this.props.getAllClass();
    this.props.getAllTrainee();
    this.props.getAllSubject();
    this.props.getAllTrainer();
    this.groupByClass();
  }
  groupByClass = () => {
    let arr = [];
    var groups = {};
    // group trainee is existing on class
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
    // group of skill members
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
        x: groupName,
        y: groups[groupName].length,
      });
    }
    this.setState({array: myArray});
  };

  render() {
    let sampleData = [
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
            data={sampleData} // value in chart
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
        <Text style={styles.textColumn}>Class name</Text>
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
})(ChartByClassScreen);
