import React, { Component } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../../constants/colors";
import RoundedButton from "../button/RoundedButton";
import styles from "../../styles/components/link/NetworkLinking";

export default class NetworkLinking extends Component {
  render() {
    const { textColor, background, border, textFB, textG } = this.props;
    const borderColor = border || "transparent";
    const textButtonFB = textFB || "";
    const textButtonG = textG || "";
    return (
      <View>
        <RoundedButton
          text={`${textButtonFB} Facebook`}
          textColor={textColor}
          background={background}
          border={borderColor}
          icon={
            <Icon name="facebook" size={20} style={styles.networkButtonIcon} />
          }
          handleOnPress={this.props.onLoginFacebookPress}
        />
        <RoundedButton
          text={`${textButtonG} Google`}
          textColor={textColor}
          background={background}
          border={borderColor}
          icon={
            <Icon name="google" size={20} style={styles.networkButtonIcon} />
          }
          handleOnPress={this.props.onLoginGooglePress}
        />
      </View>
    );
  }
}
