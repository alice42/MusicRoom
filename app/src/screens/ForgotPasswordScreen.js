import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, KeyboardAvoidingView, StyleSheet, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { colors } from '../constants/colors'
import InputField from '../components/input/InputField'
import NextArrowButton from '../components/button/NextArrowButton'
import NavBarButton from '../components/button/NavBarButton'
import * as userActions from '../actions/userActions'
import * as errorActions from '../actions/errorActions'
import styles from '../styles/screens/ForgotPasswordScreen'
import Loader from '../components/Loader'

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
  })

  state = {
    email: '',
    validEmail: false,
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

  onRecoverPress = () => {
    const { email, validEmail, validForm } = this.state
    if (validEmail) {
      this.setState({ validForm: true })
      this.props.actions.recoverPasswordRequest(email)
    } else {
      this.setState({ validForm: false })
    }
  }

  errorEmail = () => {
    const { validForm, validEmail } = this.state
    if (!validForm) {
      return (
        <Text style={styles.errorMessage}>
          {validEmail ? null : 'Please, enter a valid Email.'}
        </Text>
      )
    }
  }

  alertOk = () => {
    return Alert.alert(
      'MUSICROOM PASSWORD RECOVERY',
      'Check email to recover your password',
      [
        {
          text: 'OK',
          onPress: () => {
            this.props.navigation.goBack()
            this.props.errorActions.validMail()
          }
        }
      ],
      { cancelable: false }
    )
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.wrapper} behavior="padding">
        {this.props.user.isFetching ? (
          <Loader />
        ) : (
          <View style={styles.forgotWrapper}>
            {this.props.user.isEmailSend ? this.alertOk() : null}
            <Text style={styles.forgotPasswordHeading}>Forgot your password?</Text>
            <Text style={styles.forgotPasswordSubheading}>
              Enter your email to find your account
            </Text>
            {this.errorEmail()}
            <InputField labelText="EMAIL" onChangeText={this.handleEmailChange} />
            <NextArrowButton
              handleOnPress={this.onRecoverPress}
              color={colors.green01}
              background={colors.white}
            />
          </View>
        )}
      </KeyboardAvoidingView>
    )
  }
}

function recoverPasswordActionsMapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch)
  }
}
function recoverPasswordAppMapStateToProps(state) {
  const { user, error } = state
  return {
    user,
    error
  }
}

export default connect(
  recoverPasswordAppMapStateToProps,
  recoverPasswordActionsMapDispatchToProps
)(ForgotPassword)
