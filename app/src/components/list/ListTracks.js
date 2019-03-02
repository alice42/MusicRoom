import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from "react-native";
import * as userActions from "../../actions/userActions";
import * as searchActions from "../../actions/searchActions";
import { colors } from "../../constants/colors";
import ChoosePlaylistModal from "../playlist/ChoosePlaylistModal";

export default class listTracks extends Component {
  renderplaylist() {
    const { list, buttons } = this.props;

    return list.map((track, index) => (
      <View key={`track-${index}`}>
        <View style={{ display: "flex" }}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                height: 50,
                width: 50,
                backgroundColor: colors.green02,
                alignItems: "center",
                justifyContent: "center",
                margin: 5
              }}
            >
              <Icon name="music" size={24} style={{ color: colors.white }} />
            </View>
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.trackTitle}>{track.name}</Text>
              <Text style={styles.trackTitle}>{track.artist}</Text>
            </View>
            {buttons ? (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center"
                }}
              >
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    marginLeft: 5
                  }}
                >
                  <Icon
                    name="play"
                    size={18}
                    style={{
                      color: colors.white,
                      backgroundColor: colors.green02,
                      padding: 10
                    }}
                  />
                </TouchableOpacity>
                <ChoosePlaylistModalConnected
                  track={track}
                  navigation={this.props.navigation}
                  test={this.props.test}
                />
              </View>
            ) : null}
          </View>
        </View>
      </View>
    ));
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <ScrollView>{this.renderplaylist()}</ScrollView>
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

const ChoosePlaylistModalConnected = connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(ChoosePlaylistModal);

const styles = StyleSheet.create({
  wrapper: {
    display: "flex"
  },
  playlistTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.gray04,
    marginTop: 2
  },
  playlistPrivacy: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.lightGray,
    marginTop: 4,
    marginLeft: 5
  },
  playlistDate: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.green01,
    marginTop: 2
  }
});
