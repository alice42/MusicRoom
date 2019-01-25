import React, { Component } from "react";
import { View, Text, KeyboardAvoidingView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../constants/colors";
import InputField from "../components/InputField";
import NextArrowButton from "../components/NextArrowButton";
import NavBarButton from "../components/NavBarButton";

export default class ForgotPassword extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <NavBarButton
        handleButtonPress={() => navigation.goBack()}
        location="left"
        icon={<Icon name="angle-left" color={colors.white} size={30} />}
      />
    ),
    headerTransparent: true
  });

  render() {
    return (
      <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
        <View style={styles.forgotWrapper}>
          <Text style={styles.forgotPasswordHeading}>
            Forgot your password?
          </Text>
          <Text style={styles.forgotPasswordSubheading}>
            Enter your email to find your account
          </Text>
          <InputField labelText="EMAIL" />
          <NextArrowButton />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flex: 1,
    backgroundColor: colors.green01
  },
  forgotWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 30,
    padding: 20
  },
  forgotPasswordHeading: {
    fontSize: 30,
    color: colors.white,
    fontWeight: "300"
  },
  forgotPasswordSubheading: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 15,
    marginTop: 10,
    marginBottom: 60
  },
  notificationWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  }
});