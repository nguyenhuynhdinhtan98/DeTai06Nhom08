import React, {Component} from 'react';
import Router from './router/Router';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import AllReducers from './store/reducers/AllReducers';
class App extends Component {
  componentDidMount() {
    console.disableYellowBox = true;
  }
  render() {
    return (
      <Provider
        store={createStore(AllReducers, {}, applyMiddleware(ReduxThunk))}>
        <SafeAreaView style={styles.container}>
          <Router />
        </SafeAreaView>
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
