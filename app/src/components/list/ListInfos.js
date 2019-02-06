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
import EditableInput from "../input/EditableInput";

export default class Listings extends Component {
  handleInfoEdit = text => {
    console.log("TEST", text);
  };
  renderListings = () => {
    const { list } = this.props;
    return Object.keys(list).map((info, index) => (
      <View key={`list-${index}`} style={styles.listItem}>
        <View style={{ flex: 1 }}>
          <Text style={styles.listKey}>{info} : </Text>
        </View>
        <View style={{ flex: 1 }}>
          <EditableInput
            style={styles.listValue}
            defaultValue={list[info]}
            onChangeText={this.handleInfoEdit}
            size={12}
          />
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
    minWidth: "20%",
    fontWeight: "500",
    fontSize: 17,
    color: colors.grey04
  }
});
