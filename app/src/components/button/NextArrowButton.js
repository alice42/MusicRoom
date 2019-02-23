import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableHighlight, View } from "react-native";
import { colors } from "../../constants/colors";
import styles from "../../styles/components/button/NextArrowButton";

export default class NextArrowButton extends Component {
  render() {
    const { handleOnPress, background, color, disable } = this.props;
    const backgroundColor = background || "transparent";
    const iconColor = color || colors.black;
    const isDisable = disable || false;
    return (
      <View style={styles.buttonWrapper}>
        <TouchableHighlight
          style={[styles.button, { backgroundColor: backgroundColor }]}
          onPress={handleOnPress}
          disabled={isDisable}
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
