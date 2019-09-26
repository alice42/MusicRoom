import React from 'react'
import { View, Text, StyleSheet, Switch, Slider } from 'react-native'
import DateTimePicker from 'react-native-modal-datetime-picker'
import { colors } from '../constants/colors'
import Icon from 'react-native-vector-icons/FontAwesome'
import Map from './MapComponent'

export default class Restriction extends React.Component {
  state = {
    isDateTimePickerVisible: false,
    whichDate: null
  }
  showDateTimePicker = whichDate => {
    this.setState({ isDateTimePickerVisible: true, whichDate })
  }

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false, whichDate: null })
  }

  selectRestrictionOption = isRestricted => {
    this.props.selectRestrictionOption(isRestricted)
  }

  handleDatePicked = date => {
    this.props.handleDatePicked(date, this.state.whichDate)
    this.hideDateTimePicker()
  }

  render() {
    const { isRestricted, maxDistance, startDate, endDate } = this.props
    return (
      <View style={{ padding: 20 }}>
        <View style={styles.content}>
          <Text style={styles.privacyOptionTitle}>
            {isRestricted ? 'Restrictions enables' : 'Restrictions disables'}
          </Text>
          <Switch
            trackColor={{ true: colors.green01, false: colors.green01 }}
            onValueChange={() => this.selectRestrictionOption(isRestricted)}
            value={isRestricted}
          />
        </View>
        {isRestricted ? (
          <View style={{ marginTop: 15 }}>
            <View style={styles.contentInfo}>
              <Text style={styles.title}>Start Date:</Text>
              <Text>{startDate ? startDate : 'none'}</Text>
              <Icon
                name="edit"
                size={20}
                color={colors.green01}
                onPress={() => this.showDateTimePicker('start')}
              />
            </View>
            {startDate !== endDate ? (
              <View style={styles.contentInfo}>
                <Text style={styles.title}>End Date: </Text>
                <Text>{endDate ? endDate : 'none'}</Text>
                <Icon
                  name="edit"
                  size={20}
                  color={colors.green01}
                  onPress={() => this.showDateTimePicker('end')}
                />
              </View>
            ) : null}

            <DateTimePicker
              mode={'datetime'}
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
              minimumDate={new Date(startDate)}
            />
            <View>
              <Text style={styles.title}>location:</Text>
              <Map
              markerCoord={this.props.markerCoord}
                marker={this.props.marker}
                onPressZoomOut={this.props.onPressZoomOut}
                onPressZoomIn={this.props.onPressZoomIn}
                maxDistance={this.props.maxDistance}
                mapRegion={this.props.mapRegion}
                latitude={this.props.latitude}
                longitude={this.props.longitude}
                latitudeDelta={this.props.latitudeDelta}
                longitudeDelta={this.props.longitudeDelta}
                onMapPress={this.props.onMapPress}
                onRegionChange={this.props.onRegionChange}
              />
            </View>
            <View style={styles.content}>
              <Text style={styles.title}>Distance max:</Text>
              <Text>{maxDistance} m</Text>
            </View>
            <Slider
              onSlidingComplete={this.props.handleMaxDistance}
              style={{ height: 40 }}
              minimumValue={0}
              step={1}
              maximumValue={1000}
              minimumTrackTintColor={colors.green02}
              maximumTrackTintColor={colors.gray02}
              value={maxDistance}
            />
          </View>
        ) : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    color: colors.green01,
    fontWeight: '600'
  },
  contentInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5
  },
  privacyOptionTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.lightBlack
  }
})
