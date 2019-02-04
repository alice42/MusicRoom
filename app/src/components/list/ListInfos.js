import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from "react-native";
import { colors } from "../../constants/colors";

export default class Listings extends Component {
  renderListings = () => {
    const { list } = this.props;
    return Object.keys(list).map((info, index) => (
      <View key={`list-${index}`} style={styles.listItem}>
        <View style={{ flex: 1 }}>
          <Text style={styles.listKey}>{info} : </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.listValue}>{list[info]}</Text>
        </View>
      </View>
    ));
  };
  render() {
    return <View style={styles.wrapper}>{this.renderListings()}</View>;
  }
}
const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    marginBottom: 25
  },
  listItem: {
    justifyContent: "space-between",
    marginTop: 2,
    flexDirection: "row"
  },
  listKey: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.green01
  },
  listValue: {
    fontWeight: "500",
    fontSize: 17,
    color: colors.grey04
  }
});
