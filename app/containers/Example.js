import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux'
import { Tag } from 'antd-mobile'

@connect(state => state)
class Example extends Component {
    static navigationOptions = ({ screenProps }) => ({
        title: '示例',
        tabBarLabel: '示例',
        tabBarIcon: ({ focused, tintColor }) => (
            <Image
                style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
                source={require('../images/person.png')}
            />
        ),
        headerStyle: {
            backgroundColor: screenProps ? screenProps.themeColor : '#4ECBFC',
        },
        headerTitleStyle: {
            alignSelf: 'center',
        },
    })

    render() {
        return (
            <View style={styles.container}>
                <Text>示例页面</Text>
                <Tag data-seed='logId'>Basic</Tag>
                <Tag selected>Selected</Tag>
                <Tag disabled>Disabled</Tag>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 32,
        height: 32,
    },
})

export default Example
