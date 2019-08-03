import React from 'react'
import { View, ScrollView, Text, SafeAreaView } from 'react-native'
import AddTagButton from '../../button/AddTagButton'
import TagButton from '../../button/TagButton'
import PrivacyModal from './PrivacyModal'
import Icon from 'react-native-vector-icons/FontAwesome'
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
    const { token } = this.props.user
    const { tags } = this.props.user.data
    const valueCheckRegex = /(?=.*[a-zA-Z])/
    if (valueCheckRegex.test(inputvalue)) {
      this.props.actions.updateRequest(token, 'tags', inputvalue)
    }
    this.setState({ inputvalue: '', addNewTag: false })
  }

  onPressDeleteTag = tag => {
    const { tags } = this.props.user.data
    const { token } = this.props.user
    this.props.actions.updateRequest(token, 'tags', tag)
  }

  allTags() {
    const { tags } = this.props.user.data
    console.log('in tags', tags)
    return tags.map((tag, i) => {
      return (
        <TagButton
          onPressDeleteTag={() => {
            this.onPressDeleteTag(tag)
          }}
          key={i}
          title={tag}
        />
      )
    })
  }

  onPressAdd = () => {
    this.setState({ addNewTag: true })
  }

  render() {
    const { inputvalue, addNewTag } = this.state
    return (
      <View>
        <View style={styles.tagsTitleWrapper}>
          <Text style={styles.tagsText}>Your music tastes</Text>
          <Icon style={styles.tagsIcon} name={'eye'} size={16} />
        </View>
        <SafeAreaView>
          <ScrollView style={styles.tagsScrollView}>
            <View style={styles.tagsContainer}>
              <AddTagButton inputvalue={inputvalue} addNewTag={addNewTag} handleInput={this.handleInput} onPressValidNewTag={this.onPressValidNewTag} onPressAdd={this.onPressAdd} />
              {this.allTags()}
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    )
  }
}
