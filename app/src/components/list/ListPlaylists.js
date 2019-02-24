import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from "react-native";
import { colors } from "../../constants/colors";

export default class playlists extends Component {
  handleOnPress = playlist => {
    console.log(this.props);
    this.props.navigation.navigate("Playlist", { playlist: playlist });
  };

  renderplaylists() {
    const { list } = this.props;
    return list.map((playlist, index) => (
      <TouchableOpacity
        key={`playlist-${index}`}
        style={{ marginTop: 10 }}
        onPress={() => this.handleOnPress(playlist)}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.playlistTitle}>{playlist.name}</Text>
            <Text style={styles.playlistPrivacy}>{playlist.privacy}</Text>
            <Text style={styles.playlistTitle}>{playlist.artist}</Text>
          </View>
          <View>
            {playlist.date ? (
              <Text style={styles.playlistDate}>
                {playlist.date.toLocaleString()}
              </Text>
            ) : null}
          </View>
          <Icon
            name={"chevron-right"}
            size={20}
            style={{ color: colors.green01 }}
          />
        </View>
      </TouchableOpacity>
    ));
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <ScrollView>{this.renderplaylists()}</ScrollView>
      </View>
    );
  }
}

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
