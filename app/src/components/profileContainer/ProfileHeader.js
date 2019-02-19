import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import FAIcon from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/Ionicons";
import EditableInput from "../../components/input/EditableInput";
import NavBarButton from "../../components/button/NavBarButton";
import { infos } from "../../constants/infos";
import styles from "../../styles/containers/ProfileContainer";

export default class ProfileHeader extends Component {
  handleLogOut = () => {
    this.props.navigation.navigate("LoggedOut");
  };

  handleChangePicture = () => {
    this.props.navigation.navigate("CameraRoll", {
      getSelected: this.getSelectedAvatar
    });
  };

  getSelectedAvatar = avatarUri => {
    this.props.actions.updateRequest(
      avatarUri,
      this.props.update.user,
      "avatarUri"
    );
  };

  render() {
    const { email, avatarUri } = this.props.update.user;
    const source = avatarUri
      ? { uri: avatarUri }
      : require("../../assets/avatar.png");
    return (
      <View>
        <View style={styles.headerProfile}>
          <View style={styles.headerProfileContent}>
            <View style={styles.headerProfileEditButton}>
              <NavBarButton
                handleButtonPress={this.handleLogOut}
                color={colors.white}
                text="Logout"
              />
            </View>
          </View>
        </View>
        <Image style={styles.avatar} source={source} />
        <TouchableOpacity
          onPress={this.handleChangePicture}
          style={styles.editAvatarButton}
        >
          <Icon
            name="md-images"
            size={20}
            style={styles.iconEditAvatarButton}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
