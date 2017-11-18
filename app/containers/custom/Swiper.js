import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import Swiper from 'react-native-swiper'

@connect(state => state)
class SwiperExample extends Component {
    static navigationOptions = {
        title: 'Swiper',
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Swiper style={styles.wrapper} showsButtons autoplay>
                    <View style={styles.slide1}>
                        <Text style={styles.text}>showsButtons</Text>
                    </View>
                    <View style={styles.slide2}>
                        <Text style={styles.text}>Beautiful</Text>
                    </View>
                    <View style={styles.slide3}>
                        <Text style={styles.text}>And simple</Text>
                    </View>
                </Swiper>

                <Swiper
                    style={styles.wrapper}
                    height={200}
                    horizontal={false}
                    autoplay
                    loop
                >
                    <View style={styles.slide1}>
                        <Text style={styles.text}>horizontal</Text>
                    </View>
                    <View style={styles.slide2}>
                        <Text style={styles.text}>autoplay</Text>
                    </View>
                    <View style={styles.slide3}>
                        <Text style={styles.text}>And simple</Text>
                    </View>
                </Swiper>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    wrapper: {
        height: 200,
        marginBottom: 20,
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
})

export default SwiperExample
