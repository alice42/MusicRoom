import React from 'react'
import { View, Text, TouchableOpacity, Modal, Picker } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from '../../constants/colors'
import styles from '../../styles/containers/ProfileContainer'

export default class ChoosePlaylistModal extends React.Component {
  state = {
    modalVisible: false,
    choosenPlaylist: 'newPlaylist',
    choosenPlaylistId: 'newPlaylist'
  }

  addToChoosenPlaylist = () => {
    const { track } = this.props
    const playlist = this.state.choosenPlaylistId
    // console.log(playlist)
    this.setState({ modalVisible: false })
    this.props.test(track, playlist)
  }

  setModalVisible = visible => {
    this.setState({ modalVisible: visible })
  }

  render() {
    const { choosenPlaylist } = this.state
    const { playlists } = this.props.user.data
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <View style={styles.modalTitle}>
                <Text style={styles.modalText}>PLAYLISTS</Text>
                <Text style={styles.modalSubtext}>
                  choose a playlist to add track to it
                </Text>
              </View>
              <Picker
                style={styles.modalPicker}
                selectedValue={this.state.choosenPlaylist}
                onValueChange={itemValue => {
                  this.setState({
                    choosenPlaylist: itemValue,
                    choosenPlaylistId: itemValue
                  })
                }}
              >
                <Picker.Item
                  label="Create a new playlist"
                  value="newPlaylist"
                />
                {playlists.map((playlist, index) => (
                  <Picker.Item
                    key={index}
                    label={playlist.title}
                    value={playlist.id}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.modalValidationButton1}>
              <TouchableOpacity
                onPress={playlist => this.addToChoosenPlaylist(playlist)}
              >
                <Text style={styles.modalText}>OK</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalValidationButton}>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                }}
              >
                <Text style={styles.modalText}>CANCEL</Text>
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
            name="plus"
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
