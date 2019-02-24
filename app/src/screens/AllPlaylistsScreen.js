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
// import Events from "../components/homeContainer/Events";

const playlists = [
  {
    name: "Playlist1",
    privacy: "public",
    tracks: [
      { name: "tracks1.mp3", artist: "Toto" },
      { name: "tracks2.mp3", artist: "Toto" },
      { name: "tracks3.mp3", artist: "Toto" }
    ],
    allowed: [{}]
  },
  {
    name: "Playlist2",
    privacy: "private",
    tracks: [
      { name: "tracks1.mp3", artist: "Titi" },
      { name: "tracks2.mp3", artist: "Titi" },
      { name: "tracks3.mp3", artist: "Titi" }
    ],
    allowed: [{ name: "titi", email: "titi@mail.com", editRight: false }]
  }
];

class AllPlaylistsScreen extends Component {
  //TYPE PLAYLIST
  handleCreatePlaylistRequest = () => {
    this.props.navigation.navigate("CreatePlaylist", {
      handleCreatePlaylist: this.handleCreatePlaylist,
      type: "playlist"
    });
  };
  handleCreatePlaylist = (title, privacy) => {
    // const { playlists } = this.props.user.data
    // const { token } = this.props.user
    const newPlaylist = { name: title, privacy: privacy };
    playlists.push(newPlaylist);
    this.props.actions.updateRequest(token, "playlists", playlists);
  };

  renderPlaylists = () => {
    const { navigation } = this.props;
    return <ListPlaylists list={playlists} navigation={navigation} />;
  };
  //TYPE EVENT
  //   handleCreateEventRequest = () => {
  //     this.props.navigation.navigate("CreatePlaylist", {
  //       handleCreateEvent: this.handleCreateEvent,
  //       type: "event"
  //     });
  //   };
  //   handleCreateEvent = (title, privacy, choosenDate) => {
  //     const { events } = this.props.update.user;
  //     const newEvent = { name: title, privacy: privacy, date: choosenDate };
  //     events.push(newEvent);
  //     this.props.actions.updateRequest(events, this.props.update.user, "events");
  //   };
  //   renderEvents = () => {
  //     return <ListPlaylists list={this.props.update.user.events} />;
  //   };

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.containerWrapper}>
          <Playlists
            renderPlaylists={this.renderPlaylists}
            handleCreatePlaylistRequest={this.handleCreatePlaylistRequest}
          />
          {/* <Events
            renderEvents={this.renderEvents}
            handleCreateEventRequest={this.handleCreateEventRequest}
          /> */}
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
