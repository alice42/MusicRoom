import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, ScrollView, SafeAreaView, Dimensions } from 'react-native'
import { colors } from '../../constants/colors'
import * as userActions from '../../actions/userActions'
import * as searchActions from '../../actions/searchActions'
import ListTracks from '../list/ListTracks'
import SearchBar from '../input/SearchBar'

class Search extends Component {
  apiError = () => {
    const { error } = this.props.user
    return <Text style={{ color: 'red' }}>{error}</Text>
  }
  // addToChoosenPlaylist = track => {
  //   console.log()
  //   this.props.test(track)
  // }

  render() {
    const screenHeight = Dimensions.get('window').height
    const { results } = this.props.search
    return (
      <View style={{ flex: 1 }}>
        <SearchBarConnected />
        <View style={{ flex: 0.9 }}>
          <ListTracks
            test={this.props.test}
            list={results}
            buttonPlay={true}
            buttonAdd={true}
            playTrack={this.props.playTrack}
          />
        </View>
        <View style={{ flex: 0.1 }} />
      </View>
    )
  }
}

function profileActionsMapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
    searchActions: bindActionCreators(searchActions, dispatch)
  }
}
function profileMapStateToProps(state) {
  const { user, search } = state
  return {
    user,
    search
  }
}

const SearchBarConnected = connect(
  profileMapStateToProps,
  profileActionsMapDispatchToProps
)(SearchBar)

export default Search
