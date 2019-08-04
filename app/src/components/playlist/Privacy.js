import React, { Component } from 'react'
import { View, Text, TouchableHighlight, StyleSheet, Switch } from 'react-native'
import { colors } from '../../constants/colors'
import RadioInput from '../input/RadioInput'

export default class Privacy extends Component {
  selectPrivacyOption = privacyOption => {
    this.props.selectPrivacyOption(privacyOption)
  }

  selectCollabOption = collabOption => {
    this.props.selectCollabOption(collabOption)
  }

  render() {
    const { privacyOption, collabOption } = this.props
    return (
      <View style={styles.privacyOptions}>
        {/* <Text style={styles.privacyHeading}>Privacy</Text> */}
        <TouchableHighlight
          onPress={() => this.selectPrivacyOption(privacyOption)}
          style={styles.privacyOptionItem}
          underlayColor={colors.gray01}
        >
          <View>
            <Text style={styles.privacyOptionTitle}>{privacyOption ? 'Public' : 'Private'}</Text>
            <Text style={styles.privacyOptionDescription}>
              {privacyOption ? 'Visible to everyone' : 'Only you can seen this playlist'}
            </Text>
            <View style={styles.privacyRadioInput}>
              <Switch
                trackColor={{ true: colors.green01, false: colors.green01 }}
                onValueChange={() => this.selectPrivacyOption(privacyOption)}
                value={privacyOption}
              />
            </View>
          </View>
        </TouchableHighlight>
        <View style={styles.divider} />
        {/* <TouchableHighlight
          onPress={() => this.selectCollabOption(collabOption)}
          style={styles.privacyOptionItem}
          underlayColor={colors.gray01}
          disabled={!privacyOption ? true : false}
        >
          <View>
            <Text style={styles.privacyOptionTitle}>
              {collabOption ? 'Collaborative' : 'Non collaborative'}
            </Text>
            {!privacyOption ? (
              <Text style={styles.privacyOptionDescription}>
                A private playlist can't be collaborative
              </Text>
            ) : (
              <Text style={styles.privacyOptionDescription}>
                {collabOption
                  ? 'Deezer users can edit this playlist'
                  : 'Only you can edit this playlist'}
              </Text>
            )}
            <View style={styles.privacyRadioInput}>
              <Switch
                trackColor={{ true: colors.green01, false: colors.green01 }}
                onValueChange={() => this.selectCollabOption(collabOption)}
                value={collabOption}
                disabled={!privacyOption ? true : false}
              />
            </View>
          </View>
        </TouchableHighlight> */}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  privacyHeading: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.lightBlack,
    marginBottom: 5,
    paddingLeft: 20,
    paddingRight: 20
  },
  privacyOptionItem: {
    flex: 1,
    padding: 20
  },
  privacyOptionTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.lightBlack
  },
  privacyOptionDescription: {
    fontSize: 14,
    fontWeight: '200',
    color: colors.lightBlack,
    marginTop: 10,
    paddingRight: 90
  },
  privacyRadioInput: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray06,
    height: 1,
    flex: 1,
    marginLeft: 20,
    marginRight: 20
  }
})
