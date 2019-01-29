import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  geolocation,
  Alert
} from "react-native";
import { colors } from "../constants/colors";
import Icon from "react-native-vector-icons/FontAwesome";
import RoundedButton from "../components/RoundedButton";
import ListInfos from "../components/ListInfos";
import NavBarButton from "../components/NavBarButton";
import { infos } from "../constants/infos";

export default class ProfileContainer extends Component {
  handleLogOut = () => {
    this.props.navigation.navigate("LoggedOut");
  };
  handleEdit = () => {
    this.props.navigation.navigate("EditProfile");
  };

  renderListUserInfos = () => {
    return <ListInfos list={infos} />;
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerEditButton}>
              <NavBarButton
                handleButtonPress={this.handleEdit}
                location=""
                color={colors.white}
                text="Edit"
              />
            </View>
            <Text style={styles.name}>John Doe</Text>
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
        <Image style={styles.avatar} source={require("../assets/avatar.png")} />
        <View style={styles.containerWrapper}>
          <View style={[styles.textIconWrapper, { marginBottom: 20 }]}>
            <Icon
              name="envelope"
              size={20}
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
    padding: 50
  },
  headerEditButton: {
    alignItems: "flex-end",
    marginRight: -30
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
    color: "#FFFFFF",
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
