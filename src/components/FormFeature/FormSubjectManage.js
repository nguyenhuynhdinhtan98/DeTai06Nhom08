import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import SearchList from '../Input/SearchList';
import {searchFilterSubject} from '../../functions/functions';
import {valueChange} from '../../store/actions/SubjectAction';
import ListSubjectManage from '../PlaceList/ListSubjectManage';
import ButtonGroupManageSubjectScreen from '../Button/ButtonGroupManageSubjectScreen';
class FormSubjectManage extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.containerButton}>
          <ButtonGroupManageSubjectScreen
            navigation={navigation}
            nameAddNavigation="SubjectCreateScreen"
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
          <ListSubjectManage
            data={
              !this.props.search
                ? this.props.subject
                : searchFilterSubject(this.props.subject, this.props.search)
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
  const {subject_name, search, subject} = state.SubjectReducer;
  return {subject_name, search, subject};
};
export default connect(mapStateToProps, {valueChange})(FormSubjectManage);
