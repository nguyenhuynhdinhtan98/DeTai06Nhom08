import React, {Component} from 'react';
import {Icon, Button, Text, Input} from 'react-native-elements';
import {View, StyleSheet, Alert} from 'react-native';
import Modal, {
  ModalFooter,
  ModalButton,
  ModalContent,
  SlideAnimation,
  FadeAnimation,
} from 'react-native-modals';
import {connect} from 'react-redux';
import {
  valueChange,
  traineeEdit,
  getAllMarkTrainee,
  getSubjectName,
  getAllSubject,
} from '../../store/actions/TraineeAction';
class ModalAddMarkTrainee extends Component {
  onChangeTextInput = (text) => {
    this.props.valueChange({
      prop: 'subject_item',
      value: {
        value: {
          subject_id: this.props.subject_item.value.subject_id,
          subject_name: this.props.subject_item.value.subject_name,
          mark: text,
        },
        isVisible: true,
      },
    });
    this.props.valueChange({
      prop: 'error',
      value: '',
    });
  };
  changeMark = (subject_id, mark) => {
    for (var i in this.props.mark) {
      if (this.props.mark[i].subject_id == subject_id) {
        this.props.mark[i].mark = mark;
        break; //Stop this loop, i found it!
      }
    }
  };
  onPressAddInputMark = () => {
    const numericRegex = /^[0-9]{0,1}([.][0-9]{0,1})?$|^10$/;
    const mark = parseFloat(this.props.subject_item.value.mark);
    if (numericRegex.test(mark)) {
      this.props.valueChange({
        prop: 'error',
        value: '',
      });
      this.cancelModal();
      this.changeMark(this.props.subject_item.value.subject_id, mark);
    } else {
      this.props.valueChange({
        prop: 'error',
        value: 'Input Valid',
      });
    }
  };
  cancelModal = () => {
    this.props.valueChange({
      prop: 'subject_item',
      value: {value: {}, isVisible: false},
    });
  };
  render() {
    return (
      <>
        <Modal
          style={{margin: 0}}
          transparent={true}
          visible={this.props.subject_item.isVisible}
          width={0.8}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          useNativeDriver={true}
          onSwipeComplete={() => {
            this.cancelModal();
          }}
          onTouchOutside={() => {
            this.cancelModal();
          }}
          onSwipeOut={() => {
            this.cancelModal();
          }}
          modalAnimation={
            new SlideAnimation({
              slideFrom: 'top',
              animationDuration: 1500,
            })
          }
          swipeDirection={['up', 'left', 'right', 'down']}
          footer={
            <ModalFooter>
              <ModalButton text="Cancel" onPress={() => this.cancelModal()} />
              <ModalButton
                text="Add"
                onPress={() => this.onPressAddInputMark()}
              />
            </ModalFooter>
          }>
          <ModalContent>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1}}>
                <Text style={styles.nameSubjectModal}>
                  {this.props.subject_item.value.subject_name}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  height: 50,
                }}>
                <Input
                  defaultValue={'0'}
                  value={String(this.props.subject_item.value.mark)}
                  onChangeText={(text) => this.onChangeTextInput(text)}
                  inputContainerStyle={styles.markInputSubjectModal}
                  numeric
                  keyboardType={'numeric'}
                  autoCapitalize="none"
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                  errorMessage={this.props.error}
                  maxLength={3}
                />
              </View>
            </View>
          </ModalContent>
        </Modal>
      </>
    );
  }
}
const styles = StyleSheet.create({
  nameSubjectModal: {fontSize: 16, fontWeight: '600'},
  markInputSubjectModal: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
  },
});

const mapStateToProps = (state, ownProps) => {
  const {mark, error, subject, subject_item} = state.TraineeReducer;
  return {
    mark,
    error,
    subject,
    subject_item,
  };
};
export default connect(mapStateToProps, {
  valueChange,
  traineeEdit,
  getAllMarkTrainee,
  getSubjectName,
  getAllSubject,
})(ModalAddMarkTrainee);
