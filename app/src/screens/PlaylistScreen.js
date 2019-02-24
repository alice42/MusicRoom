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
import Events from "../components/homeContainer/Events";
import SearchBar from "../components/input/SearchBar";

class PlaylistScreen extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <SearchBar />
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
)(PlaylistScreen);
