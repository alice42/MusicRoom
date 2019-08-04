import React, { Component } from 'react'
import { Text } from 'react-native'
import styles from '../styles/screens/LoggedOutScreen'

export default class ApiError extends Component {
  render() {
    return this.props.error ? <Text style={styles.errorMessage}>{this.props.error}</Text> : null
  }
}
