import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'

@connect()
class Albums extends Component {
    static navigationOptions = ({ screenProps }) => ({
        title: '分类',
        tabBarLabel: '分类',
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon
                name={focused ? 'ios-albums' : 'ios-albums-outline'}
                size={30}
                color={focused ? tintColor : 'gray'}
            />
        ),
        headerStyle: {
            backgroundColor: screenProps ? screenProps.themeColor : '#4ECBFC',
        },
    })

    render() {
        return (
            <View style={styles.container}>
                <Text>分类</Text>
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
        width: 22,
        height: 22,
    },
})

export default Albums
