import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Icon, Button} from 'react-native-elements';
import SearchList from '../Input/SearchList';
import {searchFilterSubject} from '../../functions/functions';
import {valueChange} from '../../store/actions/ClassAction';
import ListAddSubject from '../PlaceList/ListAddSubject';
class FormClassSubjectScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerSearch}>
          <SearchList
            value={this.props.search}
            onChange={(text) =>
              this.props.valueChange({prop: 'search', value: text})
            }
          />
        </View>
        <View style={styles.containerList}>
          <ListAddSubject
            data={
              !this.props.search
                ? this.props.subject
                : searchFilterSubject(this.props.subject, this.props.search)
            }
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
  containerSearch: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
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
    search: state.ClassReducer.search,
    subject: state.ClassReducer.subject,
  };
};
export default connect(mapStateToProps, {valueChange})(FormClassSubjectScreen);
