import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../constants/colors'
import * as eventsActions from '../actions/eventsActions'
import styles from '../styles/containers/HomeContainer'

class EventScreen extends Component {
  handleOnPressEdit = event => {
    this.props.navigation.navigate('EditEvent', { event: event.id })
  }
  render() {
    const event = this.props.event[0]
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => this.handleOnPressEdit(event)}>
          <Text>{event.name} Edit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

function actionsMapDispatchToProps(dispatch) {
  return {
    eventsActions: bindActionCreators(eventsActions, dispatch)
  }
}
function mapStateToProps(state, props) {
  const { events } = state
  const id = props.navigation.state.params.event
  return {
    event: events.list.filter(event => {
      if (event.id === id) {
        return event
      }
    })
  }
}

export default connect(
  mapStateToProps,
  actionsMapDispatchToProps
)(EventScreen)

const stylesBis = StyleSheet.create({
  wrapper: {
    display: 'flex'
  },
  playlistTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.gray04,
    marginTop: 2
  },
  playlistPrivacy: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.lightGray,
    marginTop: 4,
    marginLeft: 5
  },
  playlistDate: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.green01,
    marginTop: 2
  }
})
