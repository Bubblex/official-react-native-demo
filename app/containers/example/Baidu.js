import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Dimensions, Button } from 'react-native'
import { connect } from 'react-redux'
import {
    MapView,
    MapTypes,
    Geolocation,
} from 'react-native-baidu-map'

@connect(state => state)
class BaiduMaps extends Component {
    static navigationOptions = {
        title: 'Maps',
    }

    constructor() {
        super()

        this.state = {
            mayType: MapTypes.NORMAL,
            zoom: 15,
            center: {
                longitude: 116.8571251355,
                latitude: 39.6116240420,
            },
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            markers: [{
                longitude: 116.8571251355,
                latitude: 39.6116240420,
                title: 'Window of the world',
            }, {
                longitude: 115.8408438100,
                latitude: 39.7206712364,
                title: '',
            }],
        }
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <MapView
                    trafficEnabled={this.state.trafficEnabled}
                    baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                    zoom={this.state.zoom}
                    mapType={this.state.mapType}
                    center={this.state.center}
                    marker={this.state.marker}
                    markers={this.state.markers}
                    style={styles.map}
                    onMarkerClick={(e) => {
                        console.warn(JSON.stringify(e))
                    }}
                    onMapClick={(e) => {
                        console.warn(JSON.stringify(e))
                    }}
                />
                <View style={styles.row}>
                    <Button
                        title='Normal'
                        onPress={() => {
                            this.setState({
                                mapType: MapTypes.NORMAL,
                            })
                        }}
                    />
                    <Button
                        style={styles.btn}
                        title='Satellite'
                        onPress={() => {
                            this.setState({
                                mapType: MapTypes.SATELLITE,
                            })
                        }}
                    />

                    <Button
                        style={styles.btn}
                        title='Locate'
                        onPress={() => {
                            console.warn('center', this.state.center)
                            Geolocation.getCurrentPosition()
                                .then((data) => {
                                    console.warn(JSON.stringify(data))
                                    this.setState({
                                        zoom: 15,
                                        marker: {
                                            latitude: data.latitude,
                                            longitude: data.longitude,
                                            title: 'Your location',
                                        },
                                        center: {
                                            latitude: data.latitude,
                                            longitude: data.longitude,
                                            rand: Math.random(),
                                        },
                                    })
                                })
                                .catch((e) => {
                                    console.warn(e, 'error')
                                })
                        }}
                    />
                </View>

                <View style={styles.row}>
                    <Button
                        title='Zoom+'
                        onPress={() => {
                            this.setState({
                                zoom: this.state.zoom + 1,
                            })
                        }}
                    />
                    <Button
                        title='Zoom-'
                        onPress={() => {
                            if (this.state.zoom > 0) {
                                this.setState({
                                    zoom: this.state.zoom - 1,
                                })
                            }
                        }}
                    />
                    <Button
                        title='Traffic'
                        onPress={() => {
                            this.setState({
                                trafficEnabled: !this.state.trafficEnabled,
                            })
                        }}
                    />

                    <Button
                        title='Baidu HeatMap'
                        onPress={() => {
                            this.setState({
                                baiduHeatMapEnabled: !this.state.baiduHeatMapEnabled,
                            })
                        }}
                    />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        height: 40,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 200,
        marginBottom: 16,
    },
})

export default BaiduMaps
