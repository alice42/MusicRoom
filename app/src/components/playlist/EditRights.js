import React, { Component } from 'react'
import { View, Text, TouchableHighlight, StyleSheet, Switch } from 'react-native'
import { colors } from '../../constants/colors'

export default class Rights extends Component {
  selectPrivacyOption = privacyOption => {
    this.props.selectPrivacyOption(privacyOption)
  }

  render() {
    const { privacyOption } = this.props
    return (
      <View style={styles.privacyOptions}>
         <Text style={styles.title}>EDIT:</Text>
        <TouchableHighlight
          onPress={() => this.selectPrivacyOption(privacyOption)}
          style={styles.privacyOptionItem}
          underlayColor={colors.gray01}
        >
          <View>
            <Text style={styles.privacyOptionTitle}>{privacyOption ? 'Public' : 'Private'}</Text>
            <Text style={styles.privacyOptionDescription}>
              {privacyOption
                ? 'Everyone can edit this playlist'
                : 'Only you and your allowed friends can edit this playlist'}
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
      </View>
    )
  }
}
const styles = StyleSheet.create({
  privacyOptions: {
    minHeight: 100
  },
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
  },
   divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray06,
    height: 1,
    flex: 1,
    marginLeft: 20,
    marginRight: 20
  },
  title: {
    marginLeft:20,
    color: colors.green01,
    fontWeight: '800',
    marginTop: 10,
    marginBottom: -10
  }
})
