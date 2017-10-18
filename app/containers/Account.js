import React, { Component } from 'react'
import { StyleSheet, View, Image, Button } from 'react-native'
import { connect } from 'react-redux'

import { NavigationActions } from '../utils'

@connect()
class Account extends Component {
    static navigationOptions = ({ screenProps }) => ({
        title: '个人中心',
        tabBarLabel: '个人中心',
        tabBarIcon: ({ focused, tintColor }) => (
            <Image
                style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
                source={require('../images/person.png')}
            />
        ),
        headerStyle: {
            backgroundColor: screenProps ? screenProps.themeColor : '#4ECBFC',
        },
    })

    gotoLogin = () => {
        this.props.dispatch(NavigationActions.navigate({ routeName: 'Login' }))
    }

    render() {
        return (
            <View style={styles.container}>
                <Button title='去登录' onPress={this.gotoLogin} />
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

export default Account