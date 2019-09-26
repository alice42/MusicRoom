import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { View, Text, KeyboardAvoidingView} from 'react-native'
import { colors } from '../constants/colors'
import NavBarButton from '../components/button/NavBarButton'
import InputField from '../components/input/InputField'
import NextArrowButton from '../components/button/NextArrowButton'
import * as userActions from '../actions/userActions'
import * as errorActions from '../actions/errorActions'
import styles from '../styles/screens/LogInScreen'
import Loader from '../components/Loader'

class LogIn extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <NavBarButton
        handleButtonPress={() => navigation.navigate('ForgotPassword')}
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
  })

  state = {
    email: '',
    password: '',
    validEmail: false,
    validPassword: false,
    validForm: true
  }

  handleEmailChange = email => {
    const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const { validEmail } = this.state
    this.setState({ email })

    if (!validEmail) {
      if (emailCheckRegex.test(email)) {
        this.setState({ validEmail: true })
      }
    } else if (!emailCheckRegex.test(email)) {
      this.setState({ validEmail: false })
    }
  }

  handlePasswordChange = password => {
    const { validPassword } = this.state
    this.setState({ password })
    if (!validPassword) {
      if (password.length > 4) {
        this.setState({ validPassword: true })
      }
    } else if (password <= 4) {
      this.setState({ validPassword: false })
    }
  }

  onLoginPress = () => {
    const { email, password, validEmail, validPassword, validForm } = this.state
    if (validEmail && validPassword) {
      this.setState({ validForm: true })
      this.props.actions.loginRequest(email, password)
    } else {
      this.setState({ validForm: false })
    }
  }

  componentDidUpdate = () => {
    const { token } = this.props.user
    if (token) {
      this.props.navigation.navigate('LoggedIn')
    }
  }

  errorEmail = () => {
    const { validForm, validEmail, validPassword } = this.state
    if (!validForm) {
      return (
        <Text style={styles.errorMessage}>
          {validEmail ? null : 'Please, enter a valid Email.'}
        </Text>
      )
    }
  }
  errorPassword = () => {
    const { validForm, validEmail, validPassword } = this.state
    if (!validForm) {
      return (
        <Text style={styles.errorMessage}>
          {validPassword ? null : 'Please, enter a valid Password.'}
        </Text>
      )
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
        {this.props.user.isFetching ? (
          <Loader />
        ) : (
          <View style={styles.logInWrapper}>
            <Text style={styles.loginHeader}>Log In</Text>
            {this.errorEmail()}
            <InputField labelText="EMAIL" onChangeText={this.handleEmailChange} />
            {this.errorPassword()}
            <InputField
              labelText="PASSWORD"
              onChangeText={this.handlePasswordChange}
              secureTextEntry={true}
            />
            <NextArrowButton
              handleOnPress={this.onLoginPress}
              color={colors.green01}
              background={colors.white}
            />
          </View>
        )}
      </KeyboardAvoidingView>
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
)(LogIn)
