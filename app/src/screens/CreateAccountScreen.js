import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, Text, KeyboardAvoidingView, StyleSheet } from "react-native";
import { colors } from "../constants/colors";
import NavBarButton from "../components/button/NavBarButton";
import InputField from "../components/input/InputField";
import NextArrowButton from "../components/button/NextArrowButton";
import * as loginActions from "../actions/loginActions";

class SignIn extends Component {
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
    this.props.actions.signinRequest(email, password);
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
        <View style={styles.createWrapper}>
          <Text style={styles.loginHeader}>Create account</Text>
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

function signinActionsMapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}
function signinAppMapStateToProps(state) {
  const { signin } = state;
  return {
    signin: signin
  };
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

export default connect(
  signinAppMapStateToProps,
  signinActionsMapDispatchToProps
)(SignIn);
