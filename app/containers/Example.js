import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'

@connect(state => state)
class Example extends Component {
  static navigationOptions = {
    title: 'Example',
  }
  render() {
    return (
      <View>
        <Text>示例页面</Text>
      </View>
    )
  }
}

export default Example
