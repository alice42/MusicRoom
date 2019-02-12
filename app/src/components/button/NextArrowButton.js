import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableHighlight, View } from "react-native";
import { colors } from "../../constants/colors";
import styles from "../../styles/components/button/NextArrowButton";

export default class NextArrowButton extends Component {
  render() {
    const { handleOnPress, background, color } = this.props;
    const backgroundColor = background || "transparent";
    const iconColor = color || colors.black;
    return (
      <View style={styles.buttonWrapper}>
        <TouchableHighlight
          style={[styles.button, { backgroundColor: backgroundColor }]}
          onPress={handleOnPress}
        >
          <Icon
            name="angle-right"
            style={[styles.icon, { color: iconColor }]}
            size={32}
          />
        </TouchableHighlight>
      </View>
    );
  }
}
