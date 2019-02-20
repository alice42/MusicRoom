import React, { Component } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { colors } from "../../constants/colors";
import Icon from "react-native-vector-icons/Ionicons";
import NavBarButton from "../../components/button/NavBarButton";
import styles from "../../styles/containers/ProfileContainer";

export default class ProfileHeader extends Component {
  handleLogOut = () => {
    this.props.actions.logout();
    this.props.navigation.navigate("LoggedOut");
  };

  handleChangePicture = () => {
    this.props.navigation.navigate("CameraRoll", {
      getSelected: this.getSelectedAvatar
    });
  };

  getSelectedAvatar = avatarUri => {
    const { token } = this.props.user;
    this.props.actions.updateRequest(token, "avatarUri", avatarUri);
  };

  render() {
    const { email, avatarUri } = this.props.user.data;
    const source = avatarUri
      ? { uri: avatarUri }
      : require("../../constants/avatar.png");
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
