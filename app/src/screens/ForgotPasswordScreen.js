import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../constants/colors";
import InputField from "../components/input/InputField";
import NextArrowButton from "../components/button/NextArrowButton";
import NavBarButton from "../components/button/NavBarButton";
import * as loginActions from "../actions/loginActions";
import styles from "../styles/screens/ForgotPasswordScreen";

class ForgotPassword extends Component {
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
    validEmail: false,
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

  onRecoverPress = () => {
    const { email, validEmail, validForm } = this.state;
    if (validEmail) {
      this.setState({ validForm: true });
      this.props.actions.recoverPasswordRequest(email);
    } else {
      this.setState({ validForm: false });
    }
  };

  render() {
    const { validForm, validEmail } = this.state;
    const errorEmail = validForm ? null : (
      <Text style={styles.errorMessage}>
        {validEmail ? null : "Please, enter a valid Email."}
      </Text>
    );
    this.props.login.emailSendMessage
      ? Alert.alert("Email send!", this.props.login.emailSendMessage, [
          { text: "OK", onPress: () => this.props.navigation.navigate("LogIn") }
        ])
      : null;
    return (
      <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
        <View style={styles.forgotWrapper}>
          <Text style={styles.forgotPasswordHeading}>
            Forgot your password?
          </Text>
          <Text style={styles.forgotPasswordSubheading}>
            Enter your email to find your account
          </Text>
          {errorEmail}
          <InputField labelText="EMAIL" onChangeText={this.handleEmailChange} />
          <NextArrowButton
            handleOnPress={this.onRecoverPress}
            color={colors.green01}
            background={colors.white}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

function recoverPasswordActionsMapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}
function recoverPasswordAppMapStateToProps(state) {
  const { login } = state;
  return {
    login
  };
}

export default connect(
  recoverPasswordAppMapStateToProps,
  recoverPasswordActionsMapDispatchToProps
)(ForgotPassword);
