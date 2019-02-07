import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import { colors } from "../constants/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import EditableInput from "../components/input/EditableInput";
import RoundedButton from "../components/button/RoundedButton";
import ListEditableInfos from "../components/list/ListEditableInfos";
import NavBarButton from "../components/button/NavBarButton";
import { infos } from "../constants/infos";

export default class ProfileContainer extends Component {
  state = {
    username: "John Doe",
    avatarUri: ""
  };

  renderListUserInfos = () => {
    return <ListEditableInfos list={infos} />;
  };

  handleLogOut = () => {
    this.props.navigation.navigate("LoggedOut");
  };

  handleChangePicture = () => {
    this.props.navigation.navigate("CameraRoll", {
      getSelected: this.getSelectedAvatar
    });
  };

  handleUsernameEdit = username => {
    this.setState({ username });
  };

  getSelectedAvatar = uri => {
    this.setState({ avatarUri: uri });
  };

  render() {
    const { username, avatarUri } = this.state;
    const source = avatarUri
      ? { uri: avatarUri }
      : require("../assets/avatar.png");
    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={{ alignSelf: "center" }}>
              <EditableInput
                style={styles.name}
                defaultValue={username}
                onChangeText={this.handleUsernameEdit}
                size={18}
              />
            </View>
            <View style={styles.textIconWrapper}>
              <Icon
                name="map-marker"
                size={20}
                style={{ color: colors.white, marginRight: 5 }}
              />
              <Text style={styles.location}>Paris</Text>
            </View>
          </View>
        </View>
        <Image style={styles.avatar} source={source} />
        <View style={styles.containerWrapper}>
          <View style={[styles.textIconWrapper, { marginBottom: 20 }]}>
            <Icon
              name="envelope"
              size={16}
              style={{ color: colors.green01, marginRight: 5 }}
            />
            <Text style={{ color: colors.green01 }}>JohnDoe@mail.com</Text>
          </View>
          {this.renderListUserInfos()}
          <RoundedButton
            text="Facebook"
            textColor={colors.green01}
            border={colors.green01}
            icon={
              <Icon
                name="facebook"
                size={20}
                style={styles.networkButtonIcon}
              />
            }
          />
          <RoundedButton
            text="Google"
            textColor={colors.green01}
            border={colors.green01}
            icon={
              <Icon name="google" size={20} style={styles.networkButtonIcon} />
            }
          />
          <TouchableOpacity onPress={this.handleLogOut}>
            <View style={styles.buttonTextWrapper}>
              <Text style={styles.buttonText}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.handleChangePicture}>
          <View style={styles.buttonTextWrapper}>
            <Text style={styles.buttonText}>Change picture</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white
  },
  header: {
    backgroundColor: colors.green01,
    height: 200
  },
  headerContent: {
    padding: 80
  },
  textIconWrapper: {
    flexDirection: "row",
    alignSelf: "center"
  },
  location: {
    fontSize: 15,
    color: colors.white,
    paddingTop: 2
  },
  name: {
    alignSelf: "center",
    fontSize: 22,
    color: colors.white,
    fontWeight: "600"
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130
  },
  containerWrapper: {
    paddingTop: 40,
    flex: 1,
    display: "flex",
    alignContent: "center",
    marginTop: 30,
    padding: 20
  },
  networkButtonIcon: {
    color: colors.green01,
    position: "relative",
    left: 20,
    zIndex: 8
  },
  buttonTextWrapper: {
    flexDirection: "row",
    justifyContent: "center"
  },
  buttonText: {
    width: "100%",
    textAlign: "center",
    color: colors.green01
  }
});
