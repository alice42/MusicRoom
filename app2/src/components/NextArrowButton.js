import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableHighlight, StyleSheet, View } from "react-native";
import { colors } from "../constants/colors";

export default class NextArrowButton extends Component {
  render() {
    const { handleOnPress } = this.props;
    return (
      <View style={styles.buttonWrapper}>
        <TouchableHighlight style={styles.button} onPress={handleOnPress}>
          <Icon name="angle-right" style={styles.icon} size={32} />
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonWrapper: {
    alignItems: "flex-end",
    right: 20,
    bottom: 20,
    paddingTop: 20
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    width: 60,
    height: 60,
    backgroundColor: colors.white,
    opacity: 0.6
  },
  icon: {
    marginRight: -2,
    marginTop: -2,
    color: colors.green01
  }
});
