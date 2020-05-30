import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Input, Icon, Button} from 'react-native-elements';
import {Picker, Item} from 'native-base';
import {connect} from 'react-redux';
import SearchList from '../Input/SearchList';
import {searchFilterTrainee} from '../../functions/functions';
import {valueChange, getAllClass} from '../../store/actions/TraineeAction';
import ListTraineeManage from '../PlaceList/ListTraineeManage';
import ButtonGroupManageScreen from '../Button/ButtonGroupManageScreen';
class FormTraineeManage extends Component {
  render() {
    const {navigation} = this.props;
    let pickerItems = this.props.class.map((element, i) => (
      <Picker.Item
        key={i}
        style={{fontFamily: 'SourceSansPro-Regular'}}
        label={element.class_name}
        value={element.class_id}
      />
    ));
    let filterList = () => {
      let getAllTraineeInClass = [];
      let findClass = this.props.class.find(
        (item) => item.class_id === this.props.group_name,
      );
      if (findClass) {
        if (findClass.trainee_id !== undefined) {
          this.props.trainee.map((item) => {
            if (findClass.trainee_id.includes(item.trainee_id) === true) {
              getAllTraineeInClass.push(item);
            }
          });
        }
      }
      return getAllTraineeInClass;
    };
    let showList = () => {
      if (this.props.group_name === '0') {
        if (this.props.search === '') {
          return this.props.trainee;
        } else {
          return searchFilterTrainee(this.props.trainee, this.props.search);
        }
      } else {
        return filterList();
      }
    };
    let statusSearchBar = () => {
      if (this.props.group_name === '0') {
        return (
          <View style={styles.containerSearch}>
            <SearchList
              value={this.props.search}
              onChange={(text) =>
                this.props.valueChange({prop: 'search', value: text})
              }
            />
          </View>
        );
      }
    };
    return (
      <View style={styles.container}>
        <View style={styles.containerButton}>
          <ButtonGroupManageScreen
            navigation={navigation}
            nameAddNavigation="TraineeCreateScreen"
            nameImportNavigation="TraineeImportScreen"
          />
        </View>
        {statusSearchBar()}
        <View style={styles.inputContainer}>
          <Picker
            mode="dialog"
            iosIcon={<Icon name="arrow-down" />}
            style={{flex: 1}}
            selectedValue={this.props.group_name}
            onValueChange={(value) =>
              this.props.valueChange({prop: 'group_name', value: value})
            }>
            <Picker.Item label="Show All" value="0" />
            {pickerItems}
          </Picker>
        </View>
        <View style={styles.containerList}>
          <ListTraineeManage
            data={showList()}
            navigation={navigation}
            search={this.props.search}
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
  containerButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  containerSearch: {
    flex: 1,
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
  containerList: {
    flex: 8,
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 12,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    fontWeight: '600',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 2,
    borderRadius: 2,
    elevation: 1,
    shadowOpacity: 0.1,
  },
  containerItem: {
    borderBottomColor: 'black',
    borderWidth: 1,
  },
  searchBar: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    marginLeft: 20,
    marginRight: 20,
    height: 40,
  },
});

const mapStateToProps = (state, ownProps) => {
  return {
    trainee: state.TraineeReducer.trainee,
    search: state.TraineeReducer.search,
    class: state.TraineeReducer.class,
    group_name: state.TraineeReducer.group_name,
  };
};
export default connect(mapStateToProps, {valueChange, getAllClass})(
  FormTraineeManage,
);
