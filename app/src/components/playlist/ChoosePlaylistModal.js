import React from "react";
import { View, Text, TouchableOpacity, Modal, Picker } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../../constants/colors";
import styles from "../../styles/containers/ProfileContainer";

export default class ChoosePlaylistModal extends React.Component {
  state = {
    modalVisible: false,
    choosenPlaylist: "newPlaylist"
  };

  addToChoosenPlaylist = () => {
    const { track } = this.props;
    const playlist = this.state.choosenPlaylist;
    this.setState({ modalVisible: false });
    this.props.test(track, playlist);
  };

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  render() {
    const { choosenPlaylist } = this.state;
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
                <Text>{this.props.track.name}</Text>
                <Text style={styles.modalSubtext}>
                  choose a playlist to add track to it
                </Text>
              </View>
              <Picker
                style={styles.modalPicker}
                selectedValue={this.state.choosenPlaylist}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ choosenPlaylist: itemValue })
                }
              >
                <Picker.Item
                  label="Create a new playlist"
                  value="newPlaylist"
                />
                {this.props.user.data.playlists.map((playlist, index) => (
                  <Picker.Item
                    key={index}
                    label={playlist.name}
                    value={playlist.name}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.modalValidationButton1}>
              <TouchableOpacity onPress={this.addToChoosenPlaylist}>
                <Text style={styles.modalText}>OK</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.modalValidationButton}>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text style={styles.modalText}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Icon name="plus" size={16} style={styles.choosenPlaylistIcon} />
        </TouchableOpacity>
      </View>
    );
  }
}
