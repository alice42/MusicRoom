import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import { colors } from "../constants/colors";
import styles from "../styles/containers/HomeContainer";
import RadioInput from "../components/input/RadioInput";
import RoundedButton from "../components/button/RoundedButton";
import * as userActions from "../actions/userActions";
import * as searchActions from "../actions/searchActions";
import ListPlaylists from "../components/list/ListPlaylists";
import Icon from "react-native-vector-icons/FontAwesome";
import Playlists from "../components/homeContainer/Playlists";
import Events from "../components/homeContainer/Events";
import Search from "../components/playlist/Search";
import ListTracks from "../components/list/ListTracks";
class PlaylistScreen extends Component {
  state = {
    modalVisible: false
  };

  renderPlaylistTracks = () => {
    const { tracks } = this.props.navigation.state.params.playlist;
    return <ListTracks list={tracks} />;
  };

  handleOpenAddTrackModal = () => {
    this.setState({ modalVisible: true });
  };
  handleCloseAddTrackModal = () => {
    this.setState({ modalVisible: false });
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
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
          >
            <View style={{ marginTop: 50 }}>
              <SearchConnected />
              <TouchableOpacity onPress={this.handleCloseAddTrackModal}>
                <Text>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <TouchableOpacity onPress={this.handleOpenAddTrackModal}>
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

export default connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(PlaylistScreen);
