import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  Linking,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../constants/colors";
import RoundedButton from "../components/button/RoundedButton";
import NavBarButton from "../components/button/NavBarButton";
import NetworkLinking from "../components/link/NetworkLinking";
import { GoogleSignin } from "react-native-google-signin";
import * as loginActions from "../actions/loginActions";
import styles from "../styles/screens/LoggedOutScreen";

GoogleSignin.configure();

const transparentHeaderStyle = {
  borderBottomWidth: 0,
  elevation: 0
};

class LoginScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <NavBarButton
        handleButtonPress={() => navigation.navigate("LogIn")}
        location="right"
        color={colors.white}
        text="Log In"
      />
    ),
    headerTransparent: true
  });

  onLoginFacebookPress = () => {
    this.props.actions.loginFacebookRequest();
  };

  onLoginGooglePress = () => {
    this.props.actions.loginGoogleRequest();
  };

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  onCreateAccountPress = () => {
    this.props.navigation.navigate("CreateAccount");
  };

  componentDidUpdate = () => {
    const { isAppAuthenticated } = this.props.login;
    if (isAppAuthenticated) {
      this.props.actions.initUser(this.props.login.user);
      this.props.navigation.navigate("LoggedIn");
    }
  };

  //DeepLinking
  componentDidMount() {
    if (Platform.OS === "android") {
      Linking.getInitialURL().then(url => {
        this.navigate(url);
      });
    } else {
      Linking.addEventListener("url", this.handleOpenURL);
    }
  }
  componentWillUnmount() {
    Linking.removeEventListener("url", this.handleOpenURL);
  }
  handleOpenURL = event => {
    this.navigate(event.url);
  };
  navigate = url => {
    const { navigate } = this.props.navigation;
    const route = url.replace(/.*?:\/\//g, "");
    const routeName = route.split("/")[0];
  };

  render() {
    const apiError = this.props.login.errorMessage ? (
      <Text style={styles.errorMessage}>{this.props.login.errorMessage}</Text>
    ) : null;
    return (
      <View style={styles.wrapper}>
        <View style={styles.welcomeWrapper}>
          {/* {apiError} */}
          <Text style={styles.welcomeText}>Welcome to Music Room.</Text>
          <NetworkLinking
            textColor={colors.green01}
            background={colors.white}
            onLoginFacebookPress={this.onLoginFacebookPress}
            onLoginGooglePress={this.onLoginGooglePress}
            textFB="Continue with"
            textG="Continue with"
          />
          <RoundedButton
            text="Create Account"
            textColor={colors.white}
            border={colors.white}
            handleOnPress={this.onCreateAccountPress}
          />
          <TouchableOpacity onPress={this.signOut}>
            <Text>delog google</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    login
  };
}

export default connect(
  loginAppMapStateToProps,
  LoginActionsMapDispatchToProps
)(LoginScreen);
