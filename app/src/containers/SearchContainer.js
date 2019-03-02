import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { colors } from "../constants/colors";
import * as userActions from "../actions/userActions";
import * as searchActions from "../actions/searchActions";
import Icon from "react-native-vector-icons/FontAwesome";
import Search from "../components/playlist/Search";

class SearchContainer extends Component {
  test = (track, playlist) => {
    if (playlist === "newPlaylist") {
      this.props.navigation.navigate("CreatePlaylist", {
        handleCreatePlaylist: this.handleCreatePlaylist,
        type: "playlist"
      });
    }
  };

  render() {
    return (
      <View>
        <View style={{ marginTop: 50 }}>
          <SearchConnected
            navigation={this.props.navigation}
            test={this.test}
          />
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

export default SearchContainer;
