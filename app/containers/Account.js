import React, { Component } from 'react'
import { StyleSheet, View, Button } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'

import { NavigationActions } from '../utils'

@connect()
class Account extends Component {
    static navigationOptions = ({ screenProps }) => ({
        title: '个人中心',
        tabBarLabel: '个人中心',
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon
                name={focused ? 'ios-contact' : 'ios-contact-outline'}
                size={30}
                color={focused ? tintColor : 'gray'}
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
