import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { VictoryBar } from 'victory-native'

@connect()
class Echart extends Component {
    static navigationOptions = ({ screenProps }) => ({
        title: '折线图',
        headerStyle: {
            backgroundColor: screenProps ? screenProps.themeColor : '#4ECBFC',
        },
    })

    render() {
        return (
            <View style={styles.container}>
                <Text>折线图</Text>
                <VictoryBar />
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
})

export default Echart
