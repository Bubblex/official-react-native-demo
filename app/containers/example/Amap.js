import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { MapView } from 'react-native-amap3d'

@connect(state => state)
class Amap extends Component {
    static navigationOptions = {
        title: 'Amap',
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>11</Text>
                <MapView
                    coordinate={{
                        latitude: 39.91095,
                        longitude: 116.37296,
                    }}
                    style={styles.map}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
    },
    map: {
        flex: 1,
        width: '100%',
        height: 400,
    },
})

export default Amap
