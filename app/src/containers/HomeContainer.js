import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Text } from "react-native";
import { colors } from "../constants/colors";
import styles from "../styles/containers/HomeContainer";
import RadioInput from "../components/input/RadioInput";
import RoundedButton from "../components/button/RoundedButton";
import * as updateActions from "../actions/updateActions";
import ListPlaylists from "../components/list/ListPlaylists";
import Icon from "react-native-vector-icons/FontAwesome";
import Playlists from "../components/homeContainer/Playlists";
import Events from "../components/homeContainer/Events";

class HomeContainer extends Component {
  //TYPE PLAYLIST
  handleCreatePlaylistRequest = () => {
    this.props.navigation.navigate("CreatePlaylist", {
      handleCreatePlaylist: this.handleCreatePlaylist,
      type: "playlist"
    });
  };
  handleCreatePlaylist = (title, privacy) => {
    const { playlists } = this.props.update.user;
    const newPlaylist = { name: title, privacy: privacy };
    playlists.push(newPlaylist);
    this.props.actions.updateRequest(
      playlists,
      this.props.update.user,
      "playlist"
    );
  };
  renderPlaylists = () => {
    return <ListPlaylists list={this.props.update.user.playlists} />;
  };
  //TYPE EVENT
  handleCreateEventRequest = () => {
    this.props.navigation.navigate("CreatePlaylist", {
      handleCreateEvent: this.handleCreateEvent,
      type: "event"
    });
  };
  handleCreateEvent = (title, privacy, choosenDate) => {
    const { events } = this.props.update.user;
    const newEvent = { name: title, privacy: privacy, date: choosenDate };
    events.push(newEvent);
    this.props.actions.updateRequest(events, this.props.update.user, "events");
  };
  renderEvents = () => {
    return <ListPlaylists list={this.props.update.user.events} />;
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.containerWrapper}>
          <Text style={styles.heading}>Welcome to MusicRoom</Text>
          <Playlists
            renderPlaylists={this.renderPlaylists}
            handleCreatePlaylistRequest={this.handleCreatePlaylistRequest}
          />
          <Events
            renderEvents={this.renderEvents}
            handleCreateEventRequest={this.handleCreateEventRequest}
          />
        </View>
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
)(HomeContainer);
