import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { colors } from "../constants/colors";
import FAIcon from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/Ionicons";
import EditableInput from "../components/input/EditableInput";
import RoundedButton from "../components/button/RoundedButton";
import ListEditableInfos from "../components/list/ListEditableInfos";
import NavBarButton from "../components/button/NavBarButton";
import { infos } from "../constants/infos";
import styles from "../styles/components/ProfileHeader";

export default class ProfileContainer extends Component {
  handleLogOut = () => {
    this.props.handleLogOut();
  };

  handleUsernameEdit = username => {
    this.props.handleUsernameEdit(username);
  };

  handleChangePicture = () => {
    this.props.handleChangePicture();
  };

  render() {
    const { username, avatarUri } = this.props.state;
    const source = avatarUri
      ? { uri: avatarUri }
      : require("../assets/avatar.png");
    return (
      <View>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerEditButton}>
              <NavBarButton
                handleButtonPress={this.handleLogOut}
                color={colors.white}
                text="Logout"
              />
            </View>
            <View style={styles.nameWrapper}>
              <EditableInput
                style={styles.name}
                defaultValue={username}
                onChangeText={this.handleUsernameEdit}
                size={18}
              />
            </View>
            <View style={styles.locationWrapper}>
              <FAIcon name="map-marker" size={20} style={styles.iconLocation} />
              <Text style={styles.location}>Paris</Text>
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
        <View style={styles.emailWrapper}>
          <FAIcon name="envelope" size={15} style={styles.iconEmail} />
          <Text style={styles.email}>JohnDoe@mail.com</Text>
        </View>
      </View>
    );
  }
}
