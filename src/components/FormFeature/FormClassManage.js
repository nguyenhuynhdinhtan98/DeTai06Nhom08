import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import SearchList from '../Input/SearchList';
import {searchFilterClass} from '../../functions/functions';
import {valueChange} from '../../store/actions/ClassAction';
import ListClassManage from '../PlaceList/ListClassManage';
import ButtonGroupManageScreen from '../Button/ButtonGroupManageScreen';
class FormClassManage extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.containerButton}>
          <ButtonGroupManageScreen
            navigation={navigation}
            nameAddNavigation="ClassCreateScreen"
            nameImportNavigation="ClassImportScreen"
          />
        </View>
        <View style={styles.containerSearch}>
          <SearchList
            value={this.props.search}
            onChange={text =>
              this.props.valueChange({prop: 'search', value: text})
            }
          />
        </View>
        <View style={styles.containerList}>
          <ListClassManage
            data={
              !this.props.search
                ? this.props.class
                : searchFilterClass(this.props.class, this.props.search)
            }
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
  containerList: {
    flex: 9,
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 12,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    fontWeight: '600',
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
  };
};
export default connect(mapStateToProps, {valueChange})(FormClassManage);
