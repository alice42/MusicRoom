import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import RoundedButton from '../components/button/RoundedButton'
import styles from '../styles/containers/HomeContainer'
import * as eventsActions from '../actions/eventsActions'
import ListEvents from '../components/list/ListEvents'
import { colors } from '../constants/colors'

class AllEventsScreen extends Component {
  componentWillMount() {
    this.props.eventsActions.getEvents()
  }

  handleCreateEvent = name => {
    this.props.eventsActions.createEventRequest(name)
  }

  handleCreateEventRequest = () => {
    this.props.navigation.navigate('CreateEvent', {
      handleCreateEvent: this.handleCreateEvent
    })
  }

  renderEventslist = () => {
    const { list } = this.props.events
    return <ListEvents list={list} {...this.props} />
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <ScrollView style={{ backgroundColor: colors.gray03 }}>
          {this.renderEventslist()}
        </ScrollView>
        <RoundedButton
          text={'Create a new event'}
          textColor={colors.white}
          background={colors.green01}
          border={colors.white}
          icon={
            <View style={{ flexDirection: 'row', paddingLeft: 100 }}>
              <Icon name="music" size={20} style={{ color: colors.white, paddingLeft: 5 }} />
              <Icon name="plus" size={20} style={{ color: colors.white, paddingLeft: 5 }} />
            </View>
          }
          handleOnPress={this.handleCreateEventRequest}
        />
      </View>
    )
  }
}
function actionsMapDispatchToProps(dispatch) {
  return {
    eventsActions: bindActionCreators(eventsActions, dispatch)
  }
}
function mapStateToProps(state) {
  const { events } = state
  return {
    events
  }
}

export default connect(
  mapStateToProps,
  actionsMapDispatchToProps
)(AllEventsScreen)
