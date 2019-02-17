import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { colors } from "../../constants/colors";
import FAIcon from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/Ionicons";
import EditableInput from "../../components/input/EditableInput";
import NavBarButton from "../../components/button/NavBarButton";
import { infos } from "../../constants/infos";
import styles from "../../styles/components/profileContainer/ProfileHeader";

export default class ProfileContainer extends Component {
  render() {
    const { name, firstName, email, avatarUri } = this.props.user;
    const source = avatarUri
      ? { uri: avatarUri }
      : require("../../assets/avatar.png");
    return (
      <View>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerEditButton}>
              <NavBarButton
                handleButtonPress={this.props.handleLogOut}
                color={colors.white}
                text="Logout"
              />
            </View>
            <View style={styles.nameWrapper}>
              <View style={styles.emailWrapper}>
                <FAIcon name="envelope" size={15} style={styles.iconEmail} />
                <EditableInput
                  style={styles.email}
                  defaultValue={email}
                  onChangeText={this.props.handleEmailEdit}
                  size={12}
                  type={"email"}
                />
              </View>
              {/* <EditableInput
                style={styles.name}
                defaultValue={username}
                onChangeText={this.props.handleUsernameEdit}
                size={18}
              /> */}
            </View>
            <View style={styles.locationWrapper}>
              <FAIcon name="map-marker" size={20} style={styles.iconLocation} />
              <Text style={styles.location}>Paris</Text>
            </View>
          </View>
        </View>
        <Image style={styles.avatar} source={source} />
        <TouchableOpacity
          onPress={this.props.handleChangePicture}
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
          <EditableInput
            style={styles.email}
            defaultValue={email}
            onChangeText={this.props.handleEmailEdit}
            size={12}
            type={"email"}
          />
        </View>
      </View>
    );
  }
}
