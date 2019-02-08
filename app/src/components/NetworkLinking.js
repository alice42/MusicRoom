import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { View, StyleSheet, Text, Platform, Linking } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../constants/colors";
import RoundedButton from "../components/button/RoundedButton";
import NavBarButton from "../components/button/NavBarButton";
import * as loginActions from "../actions/loginActions";
import styles from "../styles/components/NetworkLinking";

export default class NetworkLinking extends Component {
  render() {
    const { textColor, background, border, text } = this.props;
    const borderColor = border || "transparent";
    const textButton = text || "";
    return (
      <View>
        <RoundedButton
          text={`${textButton} Facebook`}
          textColor={textColor}
          background={background}
          border={borderColor}
          icon={
            <Icon name="facebook" size={20} style={styles.networkButtonIcon} />
          }
          handleOnPress={this.props.onLoginFacebookPress}
        />
        <RoundedButton
          text={`${textButton} Google`}
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
