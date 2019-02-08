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
  onLoginFacebookPress = () => {
    this.props.onLoginFacebookPress();
  };

  onLoginGooglePress = () => {
    this.props.onLoginGooglePress();
  };

  render() {
    const { textColor, background, border } = this.props;
    const borderColor = border || "transparent";
    return (
      <View>
        <RoundedButton
          text="Continue with Facebook"
          textColor={colors.green01}
          background={colors.white}
          border={borderColor}
          icon={
            <Icon name="facebook" size={20} style={styles.networkButtonIcon} />
          }
          handleOnPress={this.onLoginFacebookPress}
        />
        <RoundedButton
          text="Continue with Google"
          textColor={colors.green01}
          background={colors.white}
          border={borderColor}
          icon={
            <Icon name="google" size={20} style={styles.networkButtonIcon} />
          }
          handleOnPress={this.onLoginGooglePress}
        />
      </View>
    );
  }
}
