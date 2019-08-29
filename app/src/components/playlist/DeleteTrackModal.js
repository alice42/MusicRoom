import React from 'react'
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from '../../constants/colors'

export default class DeleteTracktModal extends React.Component {
  state = {
    modalVisible: false
  }
  setModalVisible = visible => {
    this.setState({ modalVisible: visible })
  }
  deleteTrack = () => {
    const track = this.props.track
    this.props.handleOnPressDelete(track)
    this.setState({ modalVisible: false })
  }
  render() {
    const { track } = this.props
    return (
      <View>
        <Modal animationType="slide" transparent={true} visible={this.state.modalVisible}>
          <View style={styleModal.modal}>
            <View style={styleModal.modalContent}>
              <Text style={styleModal.modalTextInvers}>{track.title}</Text>
              <Text style={styleModal.modalSubtextInvers}>this action can't be undone</Text>
              <View style={styleModal.modalTitle}>
                <Text style={styleModal.modalText}>DELETE</Text>
                <Text style={styleModal.modalSubtext}>
                  are you sure you want to delete this
                  {' track'}?
                </Text>
              </View>
            </View>
            <View style={styleModal.modalValidationButton1}>
              <TouchableOpacity onPress={this.deleteTrack}>
                <Text style={styleModal.modalText}>OK</Text>
              </TouchableOpacity>
            </View>
            <View style={styleModal.modalValidationButton}>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                }}
              >
                <Text style={styleModal.modalText}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity
          onPress={() => {
            this.setModalVisible(true)
          }}
          style={{ flex: 1, justifyContent: 'center' }}
        >
          <Icon
            name="trash"
            size={18}
            style={{
              color: colors.white
            }}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styleModal = StyleSheet.create({
  modal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: colors.white,
    width: 300,
    height: 210,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    display: 'flex'
  },
  modalTitle: {
    backgroundColor: colors.darkOrange,
    width: 300,
    height: 70,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 8,
    marginBottom: 15,
    position: 'absolute'
  },
  modalText: {
    color: colors.white,
    fontSize: 26,
    fontWeight: '800'
  },
  modalTextInvers: {
    textAlign: 'center',
    marginTop: 110,
    marginRight: 10,
    color: colors.darkOrange,
    fontSize: 26,
    fontWeight: '800'
  },
  modalSubtext: {
    textAlign: 'center',
    color: colors.gray01,
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10
  },
  modalSubtextInvers: {
    textAlign: 'center',
    color: colors.gray02,
    fontSize: 14,
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 10
  },
  modalPicker: {
    position: 'relative',
    marginTop: 30
  },
  modalValidationButton: {
    backgroundColor: colors.darkOrange,
    width: 300,
    height: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalValidationButton1: {
    backgroundColor: colors.darkOrange,
    width: 300,
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  privacyIcon: {
    color: colors.black,
    marginRight: 15,
    marginTop: 10
  }
})