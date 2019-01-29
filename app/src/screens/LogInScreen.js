import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text, KeyboardAvoidingView, StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import NavBarButton from "../components/NavBarButton";
import InputField from "../components/InputField";
import NextArrowButton from "../components/NextArrowButton";
import * as loginActions from "../actions/loginActions";

class LogIn extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <NavBarButton
        handleButtonPress={() => navigation.navigate("ForgotPassword")}
        location="right"
        color={colors.white}
        text="Forgot Password"
      />
    ),
    headerLeft: (
      <NavBarButton
        handleButtonPress={() => navigation.goBack()}
        location="left"
        icon={<Icon name="angle-left" color={colors.white} size={30} />}
      />
    ),
    headerTransparent: true
  });

  state = {
    email: "",
    password: ""
  };

  handleEmailChange = email => {
    this.setState({ email });
  };

  handlePasswordChange = password => {
    this.setState({ password });
  };

  onLoginPress = () => {
    const { email, password } = this.state;
    this.props.actions.loginRequest(email, password);
  };

  componentDidUpdate = () => {
    const { isAppAuthenticated } = this.props.login;
    if (isAppAuthenticated) {
      this.props.navigation.navigate("LoggedIn");
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
        <View style={styles.logInWrapper}>
          <Text style={styles.loginHeader}>Log In</Text>
          <InputField labelText="EMAIL" onChangeText={this.handleEmailChange} />
          <InputField
            labelText="PASSWORD"
            onChangeText={this.handlePasswordChange}
          />
          <NextArrowButton handleOnPress={this.onLoginPress} />
        </View>

        <View />
      </KeyboardAvoidingView>
    );
  }
}
function LoginActionsMapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}
function loginAppMapStateToProps(state) {
  const { login } = state;
  return {
    login: login
  };
}

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flex: 1,
    backgroundColor: colors.green01
  },
  logInWrapper: {
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

export default connect(
  loginAppMapStateToProps,
  LoginActionsMapDispatchToProps
)(LogIn);
