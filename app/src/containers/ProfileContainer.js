import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Text, TouchableOpacity } from "react-native";
import ListEditableInfos from "../components/list/ListEditableInfos";
import ProfileHeader from "../components/profileContainer/ProfileHeader";
import Tags from "../components/profileContainer/Tags";
import NetworkLinking from "../components/link/NetworkLinking";
import * as updateActions from "../actions/updateActions";
import { colors } from "../constants/colors";
import { infos } from "../constants/infos";
import styles from "../styles/containers/ProfileContainer";
import deezerManager from "../services/deezerService";

class ProfileContainer extends Component {
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
    this.props.actions.updateRequest(
      username,
      this.props.update.user,
      "username"
    );
  };

  handleEmailEdit = email => {
    this.props.actions.updateRequest(email, this.props.update.user, "email");
  };

  getSelectedAvatar = avatarUri => {
    this.props.actions.updateRequest(
      avatarUri,
      this.props.update.user,
      "avatarUri"
    );
  };

  onPressValidNewTag = newTag => {
    const { tags } = this.props.update.user;
    const valueCheckRegex = /(?=.*[a-zA-Z])/;
    if (valueCheckRegex.test(newTag)) {
      tags.push(newTag);
      this.props.actions.updateRequest(tags, this.props.update.user, "tags");
    }
  };

  onPressDeleteTag = tag => {
    const { tags } = this.props.update.user;
    const index = tags.indexOf(tag);
    if (index > -1) {
      tags.splice(index, 1);
    }
    this.props.actions.updateRequest(tags, this.props.update.user, "tags");
  };

  onLoginFacebookPress = () => {
    console.log("FACEBOOK", this.props);
    // this.props.actions.loginFacebookRequest();
  };

  onLoginGooglePress = () => {
    console.log("GOOGLE");
    // this.props.actions.loginGoogleRequest();
  };

  handleDispatchToken = token => {
    this.props.actions.deezerGetTokenSuccess(token);
  };
  render() {
    const { user } = this.props.update;
    const source = user.avatarUri
      ? { uri: avatarUri }
      : require("../assets/avatar.png");
    return (
      <View style={styles.wrapper}>
        <ProfileHeader
          user={this.user}
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
        <Tags
          tags={user.tags}
          onPressValidNewTag={this.onPressValidNewTag}
          onPressDeleteTag={this.onPressDeleteTag}
        />
        <TouchableOpacity
          onPress={() => deezerManager.connect(this.handleDispatchToken)}
        >
          <Text>Deezer</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function profileActionsMapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(updateActions, dispatch)
  };
}
function profileMapStateToProps(state) {
  const { update } = state;
  return {
    update
  };
}

export default connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(ProfileContainer);
