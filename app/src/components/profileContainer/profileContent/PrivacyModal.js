import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Picker,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../../../constants/colors";
import styles from "../../../styles/containers/ProfileContainer";

export default class PrivacyModal extends React.Component {
  state = {
    modalVisible: false,
    privacy: "public"
  };

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  render() {
    const { privacy } = this.state;
    let iconPrivacy = null;
    if (privacy === "public") {
      iconPrivacy = "eye";
    } else if (privacy === "private") {
      iconPrivacy = "eye-slash";
    } else if (privacy === "friends") {
      iconPrivacy = "users";
    }
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <View>
                <Text style={styles.modalText}>PRIVACY</Text>
                <Text style={styles.modalText}>
                  choose who can see those informations
                </Text>
              </View>
              <Picker
                style={styles.modalPicker}
                selectedValue={this.state.privacy}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ privacy: itemValue })
                }
              >
                <Picker.Item label="Private" value="private" />
                <Picker.Item label="Public" value="public" />
                <Picker.Item label="Friends only" value="friends" />
              </Picker>
            </View>
            <View style={styles.modalValidationButton}>
              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Icon name={iconPrivacy} size={16} style={styles.privacyIcon} />
        </TouchableOpacity>
      </View>
    );
  }
}
