import React from 'react'
import { View, ScrollView, Text, SafeAreaView, StyleSheet } from 'react-native'
import AddTagButton from '../../button/AddTagButton'
import TagButton from '../../button/TagButton'
import PrivacyModal from './PrivacyModal'
import { colors } from '../../../constants/colors'
import styles from '../../../styles/containers/ProfileContainer'

export default class TagsView extends React.Component {
  state = {
    inputvalue: '',
    addNewTag: false
  }

  handleInput = text => {
    this.setState({ inputvalue: text })
  }

  onPressValidNewTag = () => {
    const { inputvalue } = this.state
    const tags = [...this.props.allowedUsers]
    const valueCheckRegex = /(?=.*[a-zA-Z])/
    if (valueCheckRegex.test(inputvalue)) {
      tags.push(inputvalue)
        this.props.eventsActions.updateEventRequest(this.props.event, 'vote.allowedUsers', tags.join(','), this.props.location)
    }
    this.setState({ inputvalue: '', addNewTag: false })
  }

  onPressDeleteTag = tag => {
    const tags = [...this.props.allowedUsers]
    var newTags = tags.filter(function(value) {
      return value !== tag
    })
     this.props.eventsActions.updateEventRequest(this.props.event, 'vote.allowedUsers', newTags.join(','), this.props.location)
  }

  handlePrivacy = (privacyValue, dataType) => {
    const { token } = this.props.user
    this.props.eventsActions.updatePrivacyRequest(token, privacyValue, dataType)
  }

  allTags() {
    const tags = [...this.props.allowedUsers]
    return tags.map((tag, i) => {
      return (
        <TagButton
          onPressDeleteTag={() => {
            this.onPressDeleteTag(tag)
          }}
          key={i}
          title={tag}
          allowedUsers={this.props.allowedUsers ? true : false}
        />
      )
    })
  }

  onPressAdd = () => {
    this.setState({ addNewTag: true })
  }

  render() {
    const { inputvalue, addNewTag } = this.state
    const tagsPrivacy = this.props.allowedUsers ? null : this.props.user.data.privacy.tags
    const tags = [...this.props.allowedUsers]
    return (
      <View>
        <View style={styles.tagsTitleWrapper}>
          <Text style={styles.tagsText}>
            {this.props.allowedUsers ? 'Who can vote?' : 'Who can edit?'}
          </Text>
          {!this.props.allowedUsers ? (
            <PrivacyModal
              styleIcon={styles.privacyIcon}
              dataType={'vote.allowedUsers'}
              onChangePrivacy={this.handlePrivacy}
              dataPrivacy={tagsPrivacy}
            />
          ) : null}
        </View>
        <SafeAreaView>
          <ScrollView
            style={[stylesBis.tagsScrollView, {height: this.props.allowedUsers ? this.props.allowedUsersEvent ? 90 : 200 : 200}]}
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
              {tags.length !== 0 ? null : <Text style={{ fontStyle: "italic", color: colors.gray01, marginLeft:15 }}>Add a new { this.props.allowedUsers ? 'friend!' : 'tag!'}</Text>}
              {this.allTags()}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    )
  }
}

const stylesBis = StyleSheet.create({
  tagsScrollView: {
    display: 'flex',
    backgroundColor: colors.green02,
    margin: 10,
    borderRadius: 20,
    borderColor: colors.gray01,
    borderWidth: 2
  }
})
