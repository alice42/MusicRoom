import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Text } from "react-native";
import * as updateActions from "../actions/updateActions";
import ProfileHeader from "../components/profileContainer/ProfileHeader";
import ProfileContent from "../components/profileContainer/profileContent";
import Tags from "../components/profileContainer/Tags";
import { colors } from "../constants/colors";
import styles from "../styles/containers/ProfileContainer";

class ProfileContainer extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <ProfileHeaderConnected navigation={this.props.navigation} />
        <ProfileContentConnected navigation={this.props.navigation} />
        <TagsConnected />
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

const ProfileHeaderConnected = connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(ProfileHeader);

const TagsConnected = connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(Tags);

const ProfileContentConnected = connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(ProfileContent);

export default connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(ProfileContainer);
