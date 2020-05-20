import React, {Component} from 'react';
import PureChart from 'react-native-pure-chart';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';
class ChartBySkillScreen extends Component {
  state = {array: []};
  componentDidMount() {
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
        <View style={styles.containerTextChart}>
          <Text style={styles.textColumn}>Number of skill</Text>
          <Text style={styles.textColumn}>Skill name</Text>
        </View>
        <View styles={styles.containerChart}>
          <PureChart
            data={data} // value in chart
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
    flex: 4,
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
export default connect(mapStateToProps, null)(ChartBySkillScreen);
