import React, { Component } from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { Button, Grid } from 'antd-mobile'
import { connect } from 'react-redux'

import { NavigationActions } from '../utils'

@connect(state => state)
class Home extends Component {
  static navigationOptions = ({ screenProps }) => ({
    title: '主页',
    tabBarLabel: '主页',
    tabBarIcon: ({ focused, tintColor }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
        source={require('../images/house.png')}
      />
    ),
    headerStyle: {
      backgroundColor: screenProps ? screenProps.themeColor : '#4ECBFC',
    },
  })

  gotoDetail = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Detail' }))
  }

  fetchTest = () => {
    this.props.dispatch({ type: 'app/fetchTest' })
  }

  linkExample = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'Example' }))
  }

  render() {
    const { app: { banner } } = this.props

    return (
      <View style={styles.container}>
        <Grid data={banner} />
        <Button onClick={this.gotoDetail}>Goto Detail</Button>
        <Text>{this.props.app.username}</Text>
        <Button onClick={this.fetchTest}>Fetch Test</Button>
        <Button onClick={this.linkExample}>link to example</Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
  icon: {
    width: 32,
    height: 32,
  },
  banner: {
    width: '100%',
    height: 100,
  },
  item: {
    height: 20,
  },
})

export default Home
