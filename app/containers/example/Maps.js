import React, { Component } from 'react'
import { StyleSheet, View, Platform } from 'react-native'
import { connect } from 'react-redux'
import MapView from 'react-native-maps'

@connect(state => state)
class Maps extends Component {
    static navigationOptions = {
        title: 'Maps',
    }

    render() {
        console.log(Platform)
        const MapStyle = []
        return (
            <View style={styles.container}>
                <MapView
                    style={[styles.map, MapStyle]}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
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
        ...StyleSheet.absoluteFillObject,
    },
})

export default Maps
