import React, { Component } from "react";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text, KeyboardAvoidingView, StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import NavBarButton from "../components/NavBarButton";
import InputField from "../components/InputField";
import NextArrowButton from "../components/NextArrowButton";

class LogIn extends Component {
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
        <View style={styles.createWrapper}>
          <Text style={styles.loginHeader}>Create account</Text>
          <InputField labelText="EMAIL" />
          <InputField labelText="PASSWORD" />
          <NextArrowButton />
        </View>

        <View />
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
  createWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 30,
    padding: 20
  },
  loginHeader: {
    fontSize: 30,
    color: colors.white,
    fontWeight: "300",
    marginBottom: 40
  }
});

export default connect()(LogIn);
