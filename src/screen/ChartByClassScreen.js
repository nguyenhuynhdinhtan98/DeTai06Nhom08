import React, {Component} from 'react';
import PureChart from 'react-native-pure-chart';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import ButtonHomeScreen from '../components/Button/ButtonHomeScreen';
class ChartByClassScreen extends Component {
  render() {
    let sampleData = [
      {
        data: [
          {x: '2018-02-01', y: 30},
          {x: '2018-03-02', y: 200},
          {x: '2018-04-03', y: 1700},
          {x: '2018-05-04', y: 250},
          {x: '2018-06-05', y: 10},
        ],
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
  },
  containerChart: {
    margin: 20,
  },
});
export default ChartByClassScreen;
