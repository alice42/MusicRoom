import React from 'react'
import { View, Text } from 'react-native'
import DeezerManager from '../../../services/deezerService'
import Icon from 'react-native-vector-icons/FontAwesome'
import NetworkLinking from '../../link/NetworkLinking'
import RoundedButton from '../../button/RoundedButton'
import PrivacyModal from './PrivacyModal'
import { colors } from '../../../constants/colors'
import styles from '../../../styles/containers/ProfileContainer'

export default class ProfileContent extends React.Component {
  onLoginFacebookPress = () => {
    const { facebook } = this.props.user.data
    if (!facebook) {
      this.props.actions.linkFacebookRequest()
    } else {
      this.props.actions.unlinkFacebookRequest()
    }
  }

  onLoginGooglePress = () => {
    const { google } = this.props.user.data
    if (!google) {
      this.props.actions.linkGoogleRequest()
    } else {
      this.props.actions.unlinkGoogleRequest()
    }
  }

  componentWillMount() {
    this.connectToDeezer = this.connectToDeezer.bind(this)
  }
  async getPlaylists() {
    let playlists = await DeezerManager.getPlaylists()
    this.props.actions.setPlaylists(playlists)
  }

  async connectToDeezer() {
    const { deezer } = this.props.user.data
    if (!deezer) {
      await DeezerManager.connect(token => {
        this.props.actions.deezerGetTokenSuccess(token)
        this.props.actions.linkDeezerRequest()
        this.getPlaylists()
      })
    } else {
      this.props.actions.unlinkDeezerRequest()
    }
  }

  handlePrivacy = (privacyValue, dataType) => {
    const { token } = this.props.user
    this.props.actions.updatePrivacyRequest(token, privacyValue, dataType)
  }

  render() {
    const { facebook, google, deezer } = this.props.user.data
    const networksPrivacy = this.props.user.data.privacy.networks
    console.log('****************', this.props)
    return (
      <View>
        <View style={styles.contentProfileTitleWrapper}>
          <Text style={styles.contentProfileText}>Your networks</Text>
          <PrivacyModal
            styleIcon={styles.privacyIcon}
            dataType={'networks'}
            onChangePrivacy={this.handlePrivacy}
            dataPrivacy={networksPrivacy}
          />
        </View>
        <View style={styles.contentProfileWrapper}>
          <NetworkLinking
            textColor={colors.green01}
            background={colors.white}
            border={colors.green01}
            onLoginFacebookPress={this.onLoginFacebookPress}
            onLoginGooglePress={this.onLoginGooglePress}
            textFB={facebook ? 'Unlink ' : 'Link '}
            textG={google ? 'Unlink ' : 'Link '}
            privacyButton={true}
          />
          <RoundedButton
            text={deezer ? 'Unlink Deezer' : 'Link Deezer'}
            textColor={colors.white}
            background={colors.green01}
            border={colors.green01}
            icon={<Icon name="music" size={20} style={styles.contentProfileIcon} />}
            handleOnPress={this.connectToDeezer}
          />
        </View>
      </View>
    )
  }
}
