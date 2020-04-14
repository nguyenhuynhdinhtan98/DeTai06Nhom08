import React, {Component} from 'react';
import {Text} from 'react-native-elements';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';

class FormStaticManage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.groupButton}>
          <Button
            title="Report Class By Skill"
            onPress={() =>
              this.props.navigation.navigate('ReportClassBySkillScreen')
            }
            containerStyle={styles.styleButton}
          />
          <Button
            title="Report Number Of Trainee By Skill"
            onPress={() =>
              this.props.navigation.navigate(
                'ReportNumberOfTraineeBySkillScreen',
              )
            }
            containerStyle={styles.styleButton}
          />
        </View>
        <View style={styles.groupButton}>
          <Button
            title="Show Chart By Skill"
            onPress={() => this.props.navigation.navigate('ChartBySkillScreen')}
            containerStyle={styles.styleButton}
          />
          <Button
            title="Show Chart By Class"
            onPress={() => this.props.navigation.navigate('ChartByClassScreen')}
            containerStyle={styles.styleButton}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  groupButton: {
    flex: 1,
    justifyContent: 'center',
  },
  styleButton: {
    margin: 20,
  },
});

export default FormStaticManage;
