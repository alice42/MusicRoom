//NOT FINISH

import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Text } from "react-native";
import { colors } from "../constants/colors";
import styles from "../styles/containers/HomeContainer";
import RadioInput from "../components/input/RadioInput";
import RoundedButton from "../components/button/RoundedButton";
import * as userActions from "../actions/userActions";
import ListPlaylists from "../components/list/ListPlaylists";
import Icon from "react-native-vector-icons/FontAwesome";
import Playlists from "../components/homeContainer/Playlists";

import { playlists } from "../mocks/playlists";

class AllPlaylistsScreen extends Component {
  handleCreatePlaylistRequest = () => {
    this.props.navigation.navigate("CreatePlaylist", {
      handleCreatePlaylist: this.handleCreatePlaylist,
      type: "playlist"
    });
  };
  handleCreatePlaylist = (title, privacy) => {
    const newPlaylist = { name: title, privacy: privacy };
    playlists.push(newPlaylist);
    // this.props.actions.updateRequest(token, "playlists", playlists);
  };

  renderPlaylists = () => {
    const { navigation } = this.props;
    return <ListPlaylists list={playlists} navigation={navigation} />;
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.containerWrapper}>
          <Playlists
            renderPlaylists={this.renderPlaylists}
            handleCreatePlaylistRequest={this.handleCreatePlaylistRequest}
          />
        </View>
      </View>
    );
  }
}
function profileActionsMapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}
function profileMapStateToProps(state) {
  const { user } = state;
  return {
    user
  };
}
export default connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(AllPlaylistsScreen);
