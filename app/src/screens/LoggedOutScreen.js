import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, Alert } from 'react-native'
import { colors } from '../constants/colors'
import RoundedButton from '../components/button/RoundedButton'
import NavBarButton from '../components/button/NavBarButton'
import NetworkLinking from '../components/link/NetworkLinking'
import { GoogleSignin } from 'react-native-google-signin'
import * as userActions from '../actions/userActions'
import * as errorActions from '../actions/errorActions'
import styles from '../styles/screens/LoggedOutScreen'
import Loader from '../components/Loader'

GoogleSignin.configure()

class LoginScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <NavBarButton
        handleButtonPress={() => navigation.navigate('LogIn')}
        location="right"
        color={colors.white}
        text="Log In"
      />
    ),
    headerTransparent: true
  })

  onLoginFacebookPress = () => {
    this.props.actions.loginFacebookRequest()
  }

  onLoginGooglePress = () => {
    this.props.actions.loginGoogleRequest()
  }

  onCreateAccountPress = () => {
    this.props.navigation.navigate('CreateAccount')
  }

  componentDidUpdate = () => {
    const { token } = this.props.user
    if (token) {
      this.props.navigation.navigate('LoggedIn')
    }
  }
  alert = () => {
    return Alert.alert(
      'MUSICROOM',
      `${this.props.error.errorUser}`,
      [{ text: 'OK', onPress: () => this.props.errorActions.deleteError() }],
      { cancelable: false }
    )
  }

  render() {
    return (
      <View style={styles.wrapper}>
        {this.props.user.isFetching ? (
          <Loader />
        ) : (
          <View style={styles.welcomeWrapper}>
            {this.props.error.errorUser ? this.alert() : null}
            <Text style={styles.welcomeText}>Welcome to Music Room.</Text>
            <NetworkLinking
              textColor={colors.green01}
              background={colors.white}
              onLoginFacebookPress={this.onLoginFacebookPress}
              onLoginGooglePress={this.onLoginGooglePress}
              textFB="Continue with Facebook"
              textG="Continue with Google"
            />
            <RoundedButton
              text="Create Account"
              textColor={colors.white}
              border={colors.white}
              handleOnPress={this.onCreateAccountPress}
            />
          </View>
        )}
      </View>
    )
  }
}

function LoginActionsMapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch)
  }
}
function loginAppMapStateToProps(state) {
  const { user, error } = state
  return {
    user,
    error
  }
}

export default connect(
  loginAppMapStateToProps,
  LoginActionsMapDispatchToProps
)(LoginScreen)
