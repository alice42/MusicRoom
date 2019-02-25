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
  renderplaylist() {
    const { list } = this.props;
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
