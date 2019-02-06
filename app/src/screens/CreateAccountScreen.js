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
    password: "",
    validEmail: false,
    validPassword: false,
    validForm: true
  };

  handleEmailChange = email => {
    const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validEmail } = this.state;
    this.setState({ email });

    if (!validEmail) {
      if (emailCheckRegex.test(email)) {
        this.setState({ validEmail: true });
      }
    } else if (!emailCheckRegex.test(email)) {
      this.setState({ validEmail: false });
    }
  };

  handlePasswordChange = password => {
    const { validPassword } = this.state;
    this.setState({ password });
    if (!validPassword) {
      if (password.length > 4) {
        this.setState({ validPassword: true });
      }
    } else if (password <= 4) {
      this.setState({ validPassword: false });
    }
  };

  onLoginPress = () => {
    const {
      email,
      password,
      validEmail,
      validPassword,
      validForm
    } = this.state;
    if (validEmail && validPassword) {
      this.setState({ validForm: true });
      this.props.actions.signinRequest(email, password);
    } else {
      this.setState({ validForm: false });
    }
  };

  render() {
    const { validForm, validEmail, validPassword } = this.state;
    const errorEmail = validForm ? null : (
      <Text style={styles.errorMessage}>
        {validEmail ? null : "Please, enter a valid Email."}
      </Text>
    );
    const errorPassword = validForm ? null : (
      <Text style={styles.errorMessage}>
        {validPassword ? null : "Please, enter a valid Password."}
      </Text>
    );
    return (
      <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
        <View style={styles.createWrapper}>
          <Text style={styles.loginHeader}>Create account</Text>
          {errorEmail}
          <InputField labelText="EMAIL" onChangeText={this.handleEmailChange} />
          {errorPassword}
          <InputField
            labelText="PASSWORD"
            onChangeText={this.handlePasswordChange}
            secureTextEntry={true}
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
  },
  errorMessage: {
    color: colors.darkOrange,
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 5
  }
});

export default connect(
  signinAppMapStateToProps,
  signinActionsMapDispatchToProps
)(SignIn);
