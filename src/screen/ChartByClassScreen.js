import React, {Component} from 'react';
import PureChart from 'react-native-pure-chart';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import _ from 'lodash';
import {connect} from 'react-redux';
class ChartByClassScreen extends Component {
  state = {array: []};
  componentDidMount() {
    this.groupByClass();
  }
  groupByClass = () => {
    let arr = [];
    var groups = {};
    // group trainee is exist on class
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
        <View style={styles.containerTextChart}>
          <Text style={styles.textColumn}>Number of skill</Text>
          <Text style={styles.textColumn}>Class name</Text>
        </View>
        <View styles={styles.containerChart}>
          <PureChart
            data={sampleData} // value in chart
            type="bar" //style chart
            height={625}
            width={'100%'}
            xAxisColor={'black'}
            yAxisColor={'black'}
            minValue={0}
            showEvenNumberXaxisLabel={false}
            numberOfYAxisGuideLine={5}
            color="black"
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
    flexDirection: 'row',
  },
  textColumn: {fontSize: 10, fontWeight: 'bold'},
  containerTextChart: {
    width: 80,
    marginTop: 15,
    marginBottom: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  containerChart: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const mapStateToProps = (state, ownProps) => {
  return {
    trainee: state.StaticReducer.trainee,
    class: state.StaticReducer.class,
  };
};
export default connect(mapStateToProps, null)(ChartByClassScreen);
