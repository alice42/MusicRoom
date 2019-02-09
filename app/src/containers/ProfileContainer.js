import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ListEditableInfos from "../components/list/ListEditableInfos";
import ProfileHeader from "../components/profileContainer/ProfileHeader";
import Tags from "../components/profileContainer/Tags";
import NetworkLinking from "../components/link/NetworkLinking";
import * as loginActions from "../actions/loginActions";
import { colors } from "../constants/colors";
import { infos } from "../constants/infos";
import styles from "../styles/containers/ProfileContainer";

class ProfileContainer extends Component {
  state = {
    username: "John Doe",
    email: "JohnDoe@mail.com",
    avatarUri: "",
    tags: []
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

  handleEmailEdit = email => {
    this.setState({ email });
  };

  getSelectedAvatar = uri => {
    this.setState({ avatarUri: uri });
  };

  onLoginFacebookPress = () => {
    console.log("FACEBOOK", this.props);
    // this.props.actions.loginFacebookRequest();
  };

  onLoginGooglePress = () => {
    console.log("GOOGLE");
    // this.props.actions.loginGoogleRequest();
  };

  render() {
    const { username, avatarUri, tags } = this.state;
    const source = avatarUri
      ? { uri: avatarUri }
      : require("../assets/avatar.png");
    return (
      <View style={styles.wrapper}>
        <ProfileHeader
          state={this.state}
          handleLogOut={this.handleLogOut}
          handleUsernameEdit={this.handleUsernameEdit}
          handleEmailEdit={this.handleEmailEdit}
          handleChangePicture={this.handleChangePicture}
        />
        <View style={styles.containerWrapper}>
          {this.renderListUserInfos()}
          <NetworkLinking
            textColor={colors.green01}
            background={colors.white}
            border={colors.green01}
            onLoginFacebookPress={this.onLoginFacebookPress}
            onLoginGooglePress={this.onLoginGooglePress}
            text="Link with"
          />
        </View>
        <Text style={styles.text}>Music Tastes</Text>
        <Tags all={tags} />
      </View>
    );
  }
}

function profileActionsMapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}
function profileMapStateToProps(state) {
  // const { login } = state;
  return {
    // login: login
  };
}

export default connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(ProfileContainer);
