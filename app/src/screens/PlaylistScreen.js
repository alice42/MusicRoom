import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Text } from "react-native";
import { colors } from "../constants/colors";
import styles from "../styles/containers/HomeContainer";
import RadioInput from "../components/input/RadioInput";
import RoundedButton from "../components/button/RoundedButton";
import * as userActions from "../actions/userActions";
import * as playlistsActions from "../actions/playlistsActions";
import ListPlaylists from "../components/list/ListPlaylists";
import Icon from "react-native-vector-icons/FontAwesome";
import Playlists from "../components/homeContainer/Playlists";
import Events from "../components/homeContainer/Events";
import SearchBar from "../components/input/SearchBar";

class PlaylistScreen extends Component {
  render() {
    const { playlist } = this.props.navigation.state.params;
    return (
      <View style={styles.wrapper}>
        <View>
          <Text>{playlist.name}</Text>
          <Text>{playlist.privacy}</Text>
        </View>
        <SearchBarConnected />
      </View>
    );
  }
}
function profileActionsMapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    playlistsActions: bindActionCreators(playlistsActions, dispatch)
  };
}
function profileMapStateToProps(state) {
  const { user } = state;
  return {
    user
  };
}

const SearchBarConnected = connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(SearchBar);

export default connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(PlaylistScreen);
