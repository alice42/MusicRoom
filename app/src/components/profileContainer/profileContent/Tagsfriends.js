import React from 'react'
import { View, ScrollView, Text, SafeAreaView, StyleSheet } from 'react-native'
import AddTagButton from '../../button/AddTagButton'
import TagButton from '../../button/TagButton'
import PrivacyModal from './PrivacyModal'
import { colors } from '../../../constants/colors'
import styles from '../../../styles/containers/ProfileContainer'

export default class friendsView extends React.Component {
  state = {
    inputvalue: '',
    addNewTag: false
  }

  handleInput = text => {
    this.setState({ inputvalue: text })
  }

  onPressValidNewTag = () => {
    const { inputvalue } = this.state
    const {friends} = this.props.user.data
    const valueCheckRegex = /(?=.*[a-zA-Z])/
    if (valueCheckRegex.test(inputvalue)) {
      friends.push(inputvalue)
      this.props.actions.updateRequest(this.props.user.token, 'friends', friends.join(','))
    }
    this.setState({ inputvalue: '', addNewTag: false })
  }

  onPressDeleteTag = friend => {
    const {friends} = this.props.user.data
    var newfriends = friends.filter(function(value) {
      return value !== friend
    })
    this.props.actions.updateRequest(this.props.user.token, 'friends', newfriends.join(','))
  }

  handlePrivacy = (privacyValue, dataType) => {
    const { token } = this.props.user
    this.props.actions.updatePrivacyRequest(token, privacyValue, dataType)
  }

  allfriends() {
    const {friends} = this.props.user.data
    return friends.map((tag, i) => {
      return (
        <TagButton
          onPressDeleteTag={() => {
            this.onPressDeleteTag(friend)
          }}
          key={i}
          title={friend}
        />
      )
    })
  }

  onPressAdd = () => {
    this.setState({ addNewTag: true })
  }

  render() {
    const { inputvalue, addNewTag } = this.state
    const {friends} = this.props.user.data
    const friendsPrivacy = this.props.user.data.privacy.friends
    return (
      <View>
        <View style={styles.tagsTitleWrapper}>
          <Text style={styles.tagsText}>
           Your friends
          </Text>
            <PrivacyModal
              styleIcon={styles.privacyIcon}
              dataType={'friends'}
              onChangePrivacy={this.handlePrivacy}
              dataPrivacy={friendsPrivacy}
            />
        </View>
        <SafeAreaView>
          <ScrollView
            style={stylesBis.tagsScrollView }
          >
            <View style={styles.tagsContainer}>
              <AddTagButton
                inputvalue={inputvalue}
                addNewTag={addNewTag}
                handleInput={this.handleInput}
                onPressValidNewTag={this.onPressValidNewTag}
                onPressAdd={this.onPressAdd}
                allowedUsers={this.props.allowedUsers ? true : false}
              />
              {friends.length !== 0 ? null : <Text style={{ fontStyle: "italic", color: colors.gray01, marginLeft:15 }}>Add a new friend!</Text>}
              {this.allfriends()}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    )
  }
}

const stylesBis = StyleSheet.create({
  tagsScrollView: {
    height: 200,
    display: 'flex',
    backgroundColor: colors.green02,
    margin: 10,
    borderRadius: 20,
    borderColor: colors.gray01,
    borderWidth: 2
  }
})
