import React from 'react'
import { View, Text, TouchableOpacity, Modal, Picker, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from '../../../constants/colors'
import styles from '../../../styles/containers/ProfileContainer'

export default class PrivacyModal extends React.Component {
  state = {
    modalVisible: false,
    privacy: 'eye'
  }

  setModalVisible = visible => {
    this.setState({ modalVisible: visible })
  }

  handleDispatchPrivacy = () => {
    const { dataType } = this.props
    const privacyValue = {
      eye: 'public',
      'eye-slash': 'private',
      users: 'friends'
    }
    this.props.onChangePrivacy(privacyValue[this.state.privacy], dataType)
    this.setModalVisible(false)
  }

  render() {
    const { dataPrivacy } = this.props
    const privacyValue = {
      public: 'eye',
      private: 'eye-slash',
      friends: 'users'
    }
    const privacy = privacyValue[dataPrivacy] ? privacyValue[dataPrivacy] : this.state.privacy
    return (
      <View>
        <Modal animationType="slide" transparent={true} visible={this.state.modalVisible}>
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <View style={styles.modalTitle}>
                <Text style={styles.modalText}>PRIVACY</Text>
                <Text style={styles.modalSubtext}>choose who can see those informations</Text>
              </View>
              <Picker style={styles.modalPicker} selectedValue={privacy} onValueChange={(itemValue, itemIndex) => this.setState({ privacy: itemValue })}>
                <Picker.Item label="Private" value="eye-slash" />
                <Picker.Item label="Public" value="eye" />
                <Picker.Item label="Friends only" value="users" />
              </Picker>
            </View>
            <View style={styles.modalValidationButton}>
              <TouchableOpacity onPress={this.handleDispatchPrivacy}>
                <Text style={styles.modalText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          onPress={() => {
            this.setModalVisible(true)
          }}
        >
          <Icon name={privacy} size={16} style={styles.privacyIcon} />
        </TouchableOpacity>
      </View>
    )
  }
}
