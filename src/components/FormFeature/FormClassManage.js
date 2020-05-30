import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Input, Icon, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {Picker, Item} from 'native-base';
import SearchList from '../Input/SearchList';
import {searchFilterClass} from '../../functions/functions';
import {valueChange} from '../../store/actions/ClassAction';
import ListClassManage from '../PlaceList/ListClassManage';
import _ from 'lodash';
import ButtonGroupManageScreen from '../Button/ButtonGroupManageScreen';
class FormClassManage extends Component {
  render() {
    // move screen
    const {navigation} = this.props;
    let valueDropdownClass = () => {
      let value = _.compact(
        this.props.class.map((item) => {
          if (item.class_name.indexOf('_') != -1) {
            return item.class_name.split('_').shift();
          } else {
            return null;
          }
        }),
      );
      return Array.from(new Set(value));
    };

    let pickerItems = valueDropdownClass().map((element, i) => (
      <Picker.Item
        key={i}
        style={{fontFamily: 'SourceSansPro-Regular'}}
        label={element}
        value={element}
      />
    ));

    let showList = () => {
      if (this.props.group_name === '0') {
        if (this.props.search === '') {
          return this.props.class;
        } else {
          return searchFilterClass(this.props.class, this.props.search);
        }
      } else {
        return searchFilterClass(this.props.class, this.props.group_name);
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
            nameAddNavigation="ClassCreateScreen"
            nameImportNavigation="ClassImportScreen"
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
          <ListClassManage
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
    class_name: state.ClassReducer.class_name,
    trainer_id: state.ClassReducer.trainer_id,
    search: state.ClassReducer.search,
    class: state.ClassReducer.class,
    group_name: state.ClassReducer.group_name,
  };
};
export default connect(mapStateToProps, {valueChange})(FormClassManage);
