import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {Component} from 'react';
import LoginScreen from '../screen/LoginScreen';
import HomeScreen from '../screen/HomeScreen';
import ManageClassScreen from '../screen/ManageClassScreen';
import ClassCreateScreen from '../screen/ClassCreateScreen';
import ClassEditScreen from '../screen/ClassEditScreen';
import ClassImportScreen from '../screen/ClassImportScreen';
import ClassAddTraineeScreen from '../screen/ClassAddTraineeScreen';
import ClassAddSubjectScreen from '../screen/ClassAddSubjectScreen';
import ManageTraineeScreen from '../screen/ManageTraineeScreen';
import TraineeCreateScreen from '../screen/TraineeCreateScreen';
import TraineeEditScreen from '../screen/TraineeEditScreen';
import TraineeImportScreen from '../screen/TraineeImportScreen';
import ManageTrainerScreen from '../screen/ManageTrainerScreen';
import TrainerCreateScreen from '../screen/TrainerCreateScreen';
import TrainerEditScreen from '../screen/TrainerEditScreen';
import TrainerImportScreen from '../screen/TrainerImportScreen';
import ManageSubjectScreen from '../screen/ManageSubjectScreen';
import SubjectCreateScreen from '../screen/SubjectCreateScreen';
import SubjectEditScreen from '../screen/SubjectEditScreen';
import ManageStaticScreen from '../screen/ManageStaticScreen';
import ReportClassBySkillScreen from '../screen/ReportClassBySkillScreen';
import ReportNumberOfTraineeBySkillScreen from '../screen/ReportNumberOfTraineeBySkillScreen';
import ChartByClassScreen from '../screen/ChartByClassScreen';
import ChartBySkillScreen from '../screen/ChartBySkillScreen';
const Stack = createStackNavigator();
export default class Router extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{
              headerShown: false, //hide header
            }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{
              headerShown: false, //hide header
            }}
          />
          <Stack.Screen
            name="ManageClassScreen"
            component={ManageClassScreen}
            options={{
              title: 'Manage Class',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="ClassAddTraineeScreen"
            component={ClassAddTraineeScreen}
            options={{
              title: 'Add Trainee',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="ClassAddSubjectScreen"
            component={ClassAddSubjectScreen}
            options={{
              title: 'Add Subject',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="ClassImportScreen"
            component={ClassImportScreen}
            options={{
              title: 'Manage Class',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="ClassEditScreen"
            component={ClassEditScreen}
            options={{
              title: 'Manage Class',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="ClassCreateScreen"
            component={ClassCreateScreen}
            options={{
              title: 'Class Manage',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="ManageTraineeScreen"
            component={ManageTraineeScreen}
            options={{
              title: 'Manage Trainee',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="TraineeCreateScreen"
            component={TraineeCreateScreen}
            options={{
              title: 'Trainee Manage',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="TraineeEditScreen"
            component={TraineeEditScreen}
            options={{
              title: 'Manage Trainee',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="TraineeImportScreen"
            component={TraineeImportScreen}
            options={{
              title: 'Manage Trainee',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="ManageSubjectScreen"
            component={ManageSubjectScreen}
            options={{
              title: 'Manage Subject',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="SubjectCreateScreen"
            component={SubjectCreateScreen}
            options={{
              title: 'Manage Subject',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="SubjectEditScreen"
            component={SubjectEditScreen}
            options={{
              title: 'Manage Subject',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="ManageTrainerScreen"
            component={ManageTrainerScreen}
            options={{
              title: 'Manage Trainer',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="TrainerCreateScreen"
            component={TrainerCreateScreen}
            options={{
              title: 'Manage Trainer',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="TrainerEditScreen"
            component={TrainerEditScreen}
            options={{
              title: 'Manage Trainer',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="TrainerImportScreen"
            component={TrainerImportScreen}
            options={{
              title: 'Manage Trainer',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="ManageStaticScreen"
            component={ManageStaticScreen}
            options={{
              title: 'Statistic',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="ChartBySkillScreen"
            component={ChartBySkillScreen}
            options={{
              title: 'Chart',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="ChartByClassScreen"
            component={ChartByClassScreen}
            options={{
              title: 'Chart',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="ReportClassBySkillScreen"
            component={ReportClassBySkillScreen}
            options={{
              title: 'Statistic',
              headerTitleAlign: 'center',
            }}
          />
          <Stack.Screen
            name="ReportNumberOfTraineeBySkillScreen"
            component={ReportNumberOfTraineeBySkillScreen}
            options={{
              title: 'Statistic',
              headerTitleAlign: 'center',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
