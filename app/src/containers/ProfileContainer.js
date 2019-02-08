import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ListEditableInfos from "../components/list/ListEditableInfos";
import NetworkLinking from "../components/NetworkLinking";
import ProfileHeader from "../components/ProfileHeader";
import * as loginActions from "../actions/loginActions";
import { colors } from "../constants/colors";
import { infos } from "../constants/infos";
import styles from "../styles/containers/ProfileContainer";

class ProfileContainer extends Component {
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

  onLoginFacebookPress = () => {
    console.log("FACEBOOK");
    // this.props.actions.loginFacebookRequest();
  };

  onLoginGooglePress = () => {
    console.log("GOOGLE");
    // this.props.actions.loginGoogleRequest();
  };

  render() {
    const { username, avatarUri } = this.state;
    const source = avatarUri
      ? { uri: avatarUri }
      : require("../assets/avatar.png");
    return (
      <View style={styles.wrapper}>
        <ProfileHeader
          state={this.state}
          handleLogOut={this.handleLogOut}
          handleUsernameEdit={this.handleUsernameEdit}
          handleChangePicture={this.handleChangePicture}
        />
        <View style={styles.containerWrapper}>
          {this.renderListUserInfos()}
          <NetworkLinking
            textColor={colors.white}
            background={colors.green01}
            border={colors.green01}
            onLoginFacebookPress={this.onLoginFacebookPress}
            onLoginGooglePress={this.onLoginGooglePress}
          />
        </View>
      </View>
    );
  }
}

function profileActionsMapDispatchToProps(dispatch) {
  return {};
}
function profileMapStateToProps(state) {
  return {};
}

export default connect(
  profileActionsMapDispatchToProps,
  profileMapStateToProps
)(ProfileContainer);
