import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import { colors } from "../constants/colors";
import styles from "../styles/containers/HomeContainer";
import * as userActions from "../actions/userActions";
import * as searchActions from "../actions/searchActions";
import Search from "../components/searchContainer/Search";
import ListTracks from "../components/list/ListTracks";
import RoundedButton from "../components/button/RoundedButton";
import Icon from "react-native-vector-icons/FontAwesome";
import Icons from "react-native-vector-icons/MaterialIcons";

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
        <ScrollView style={{ backgroundColor: colors.gray03 }}>
          {this.renderPlaylistTracks()}
        </ScrollView>
        <View style={{ marginTop: 10, marginBottom: 20 }}>
          <RoundedButton
            text="add track"
            textColor={colors.white}
            background={colors.green01}
            border={colors.white}
            icon={
              <View style={{ flexDirection: "row", paddingLeft: 100 }}>
                <Icons
                  name="queue-music"
                  size={20}
                  style={{ color: colors.white, paddingLeft: 5 }}
                />
                <Icon
                  name="plus"
                  size={20}
                  style={{ color: colors.white, paddingLeft: 5 }}
                />
              </View>
            }
            handleOnPress={this.handleAddTrack}
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

const ListTracksConnected = connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(ListTracks);

export default connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(PlaylistScreen);
