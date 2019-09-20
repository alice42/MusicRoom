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
    const tags = this.props.allowedUsers
      ? [...this.props.allowedUsers]
      : [...this.props.user.data.tags]
    const valueCheckRegex = /(?=.*[a-zA-Z])/
    if (valueCheckRegex.test(inputvalue)) {
      tags.push(inputvalue)
      this.props.allowedUsers
        ? this.props.eventsActions.updateEventRequest(
            this.props.event,
            'allowedUsers',
            tags.join(','),
            this.props.location
          )
        : this.props.actions.updateRequest(this.props.user.token, 'tags', tags.join(','))
    }
    this.setState({ inputvalue: '', addNewTag: false })
  }

  onPressDeleteTag = tag => {
    const tags = this.props.allowedUsers
      ? [...this.props.allowedUsers]
      : [...this.props.user.data.tags]
    var newTags = tags.filter(function(value) {
      return value !== tag
    })
    this.props.allowedUsers
      ? this.props.eventsActions.updateEventRequest(
          this.props.event,
          'allowedUsers',
          newTags.join(','),
          this.props.location
        )
      : this.props.actions.updateRequest(this.props.user.token, 'tags', newTags.join(','))
  }

  handlePrivacy = (privacyValue, dataType) => {
    const { token } = this.props.user
    this.props.actions.updatePrivacyRequest(token, privacyValue, dataType)
  }

  allTags() {
    const tags = this.props.allowedUsers
      ? [...this.props.allowedUsers]
      : [...this.props.user.data.tags]
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
    return (
      <View>
        <View style={styles.tagsTitleWrapper}>
          <Text style={styles.tagsText}>
            {this.props.allowedUsers ? 'Your allowed friends' : 'Your music tastes'}
          </Text>
          {!this.props.allowedUsers ? (
            <PrivacyModal
              styleIcon={styles.privacyIcon}
              dataType={'tags'}
              onChangePrivacy={this.handlePrivacy}
              dataPrivacy={tagsPrivacy}
            />
          ) : null}
        </View>
        <SafeAreaView>
          <ScrollView
            style={this.props.allowedUsers ? stylesBis.tagsScrollView : styles.tagsScrollView}
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
    maxHeight: 100,
    display: 'flex',
    backgroundColor: colors.green02,
    margin: 10,
    borderRadius: 20,
    borderColor: colors.gray01,
    borderWidth: 2
  }
})
