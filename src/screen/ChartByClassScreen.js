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
      var groupName = arr[i].skill;
      if (!groups[groupName]) {
        groups[groupName] = [];
      }
      groups[groupName].push(arr[i].skill);
    }
    let myArray = [];
    for (var groupName in groups) {
      myArray.push({x: groupName, y: groups[groupName].length});
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
        <View styles={styles.containerChart}>
          <PureChart
            data={sampleData}
            type="bar"
            height={550}
            width={'100%'}
            xAxisColor={'black'}
            yAxisColor={'black'}
            showEvenNumberXaxisLabel={false}
            numberOfYAxisGuideLine={10}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerChart: {
    marginTop: 20,
  },
});
const mapStateToProps = (state, ownProps) => {
  return {
    trainee: state.StaticReducer.trainee,
    class: state.StaticReducer.class,
  };
};
export default connect(mapStateToProps, null)(ChartByClassScreen);
