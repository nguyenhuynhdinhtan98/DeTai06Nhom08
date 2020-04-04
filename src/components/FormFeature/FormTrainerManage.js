import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import SearchList from '../Input/SearchList';
import {searchFilterTrainer} from '../../functions/functions';
import {valueChange} from '../../store/actions/TrainerAction';
import ListTrainerManage from '../PlaceList/ListTrainerManage';
import ButtonGroupManageScreen from '../Button/ButtonGroupManageScreen';
class FormTrainerManage extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.containerButton}>
          <ButtonGroupManageScreen
            navigation={navigation}
            nameAddNavigation="TrainerCreateScreen"
            nameImportNavigation="TrainerImportScreen"
          />
        </View>
        <View style={styles.containerSearch}>
          <SearchList
            value={this.props.search}
            onChange={(text) =>
              this.props.valueChange({prop: 'search', value: text})
            }
          />
        </View>
        <View style={styles.containerList}>
          <ListTrainerManage
            data={
              !this.props.search
                ? this.props.trainer
                : searchFilterTrainer(this.props.trainer, this.props.search)
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
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
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
  const {trainer, search} = state.TrainerReducer;
  return {trainer, search};
};
export default connect(mapStateToProps, {valueChange})(FormTrainerManage);
