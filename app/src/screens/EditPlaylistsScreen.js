import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../constants/colors'
import EditableInput from '../components/input/EditableInput'
import * as playlistsActions from '../actions/playlistsActions'
import Privacy from '../components/playlist/Privacy'
import Tags from '../components/profileContainer/profileContent/Tags'
import Restriction from '../components/Restriction'
import ApiError from '../components/ApiError'

class EditPlaylist extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Icon name="md-close" size={30} color={colors.lightBlack} />
      </TouchableOpacity>
    ),
    headerStyle: styles.headerStyle
  })

  state = {
    privacyOption: this.props.event[0].privacy === 'public' ? true : false
  }
  componentWillMount() {
    const { privacy } = this.props.event[0]
    this.setState({ privacy: privacy === 'public' })
  }

  handleNameEdit = name => {
    const { id } = this.props.event[0]
    const { location } = this.props.navigation.state.params
    this.props.playlistsActions.updatePlaylistRequest(id, 'name', name, location)
  }

  handlePrivacy = privacyValue => {
    this.setState({ privacyOption: !privacyValue })
    const { id } = this.props.event[0]
    const { location } = this.props.navigation.state.params
    const privacy = this.state.privacyOption ? 'private' : 'public'
    this.props.playlistsActions.updatePlaylistRequest(id, 'privacy', privacy, location)
  }

  render() {
    const { privacyOption } = this.state
    const { name } = this.props.event[0]
    return this.props.event ? (
      <View style={styles.wrapper}>
        <Text style={styles.heading}>Edit an playlist</Text>
        <View style={styles.content}>
          <View style={styles.inputWrapper}>
            <Text style={styles.title}>PLAYLIST TITLE</Text>
            <EditableInput
              defaultValue={name}
              onChangeText={this.handleNameEdit}
              size={12}
              type={'name'}
              style={styles.userInfosValue}
            />
          </View>
          <View style={styles.divider} />
          <Privacy privacyOption={privacyOption} selectPrivacyOption={this.handlePrivacy} />
        </View>
        {!privacyOption ? (
          <View style={{ paddingTop: 15, paddingBottom: 5 }}>
            {this.props.events.error ? (
              <ApiError style={{ textAlign: 'center' }} error={this.props.events.error} />
            ) : null}
            <Tags
              allowedUsers={this.props.event[0].allowedUsers}
              event={this.props.event[0].id}
              eventsActions={this.props.playlistsActions}
            />
            <View style={styles.divider} />
          </View>
        ) : null}
      </View>
    ) : null
  }
}
function actionsMapDispatchToProps(dispatch) {
  return {
    playlistsActions: bindActionCreators(playlistsActions, dispatch)
  }
}
function mapStateToProps(state, props) {
  const { events, playlist, user } = state
  const id = props.navigation.state.params.event
  return {
    events,
    playlist,
    user,
    event: playlist.list.filter(item => {
      if (item.id === id) {
        return item
      }
    })
  }
}
export default connect(
  mapStateToProps,
  actionsMapDispatchToProps
)(EditPlaylist)

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  wrapper: {
    display: 'flex',
    flex: 1,
    backgroundColor: colors.white
  },
  content: {
    paddingTop: 10
  },
  closeButton: {
    position: 'absolute',
    left: 20,
    zIndex: 9999
  },
  headerStyle: {
    backgroundColor: colors.white,
    borderBottomWidth: 0
  },
  heading: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.lightBlack,
    paddingLeft: 20,
    paddingRight: 20
  },
  inputWrapper: {
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10
  },
  userInfosValue: {
    color: colors.green01,
    maxWidth: 200,
    fontSize: 16
  },
  title: {
    color: colors.green01,
    fontWeight: '800',
    marginBottom: 20
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray06,
    height: 1,
    flex: 1,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20
  }
})