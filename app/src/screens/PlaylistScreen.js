import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { colors } from "../constants/colors";
import styles from "../styles/containers/HomeContainer";
import * as userActions from "../actions/userActions";
import * as searchActions from "../actions/searchActions";
import Search from "../components/playlist/Search";
import ListTracks from "../components/list/ListTracks";

class PlaylistScreen extends Component {
  renderPlaylistTracks = () => {
    const { tracks } = this.props.navigation.state.params.playlist;
    return <ListTracksConnected list={tracks} />;
  };

  handleAddTrack = () => {
    this.props.navigation.navigate("Search");
  };

  render() {
    const { playlist } = this.props.navigation.state.params;
    return (
      <View style={styles.wrapper}>
        <View>
          <Text>{playlist.name}</Text>
          <Text>{playlist.privacy}</Text>
        </View>
        <View>{this.renderPlaylistTracks()}</View>
        <View>
          <TouchableOpacity onPress={this.handleAddTrack}>
            <Text>ADD TRACKS</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
function profileActionsMapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    searchActions: bindActionCreators(searchActions, dispatch)
  };
}
function profileMapStateToProps(state) {
  const { user, search } = state;
  return {
    user,
    search
  };
}

const SearchConnected = connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(Search);

const ListTracksConnected = connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(ListTracks);

export default connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(PlaylistScreen);
