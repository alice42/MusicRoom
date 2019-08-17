import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { View, TextInput, StyleSheet } from 'react-native'
import { colors } from '../../constants/colors'

export default class SearchBar extends Component {
  handleTextChange = text => {
    this.props.searchActions.searchTracksRequest(text)
  }
  render() {
    return (
      <View style={styles.searchContainer}>
        <Icon name="ios-search" size={20} color={colors.gray02} style={styles.searchIcon} />
        <TextInput
          style={styles.textInput}
          onChangeText={this.handleTextChange}
          placeholder="Search for music..."
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 80
  },
  searchContainer: {
    display: 'flex',
    borderWidth: 1,
    borderColor: colors.gray03,
    backgroundColor: colors.white,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    borderRadius: 3,
    height: 40,
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 21,
    marginRight: 21
  },
  searchIcon: {
    position: 'absolute',
    left: 18,
    top: 9
  },
  textInput: {
    display: 'flex',
    marginTop: 11,
    marginLeft: 44,
    color: colors.gray02
  }
})
