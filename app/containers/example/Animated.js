import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Image, Dimensions, StyleSheet, ScrollView, Animated, Platform } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { NavigationActions } from '../../utils'

const WIDTH = Dimensions.get('window').width
const HEIGHT = 230

@connect(state => state)
class AnimatedScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            scrollY: new Animated.Value(0),
        }
    }
    render() {
        const colorInterpolated = this.state.scrollY.interpolate({
            inputRange: [0, 140],
            outputRange: ['rgba(80,218,185,0)', 'rgba(80,218,185,0.8)'],
            extrapolate: 'clamp',
        })
        const headerCount = (
            <Animated.View style={[styles.animatedView, { backgroundColor: colorInterpolated }]} >
                <Ionicons.Button
                    color='#fff'
                    borderRadius={20}
                    name='ios-contact-outline'
                    backgroundColor='transparent'
                    style={styles.ioniconsButton}
                    onPress={() => {
                        this.props.dispatch(NavigationActions.back())
                    }}
                >
                    <Text
                        numberOfLines={1}
                        style={{paddingRight: 18, fontSize: 15 }}
                    >User: 十一月</Text>
                </Ionicons.Button>
            </Animated.View>
        )
        return (
            <View>
                {headerCount}
                <ScrollView
                    scrollEventThrottle={20}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                    )}
                >
                    <Image
                        source={require('../../images/avatar.jpg')}
                        style={{ width: WIDTH, height: HEIGHT }}
                    />
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                    <Text>人生不会总是如意 ，你必须坚持努力</Text>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ioniconsButton: {
        width: 150,
        height: 30,
        marginTop: Platform.OS === 'ios' ? 10 : 7,
        marginLeft: 15,
        borderWidth: 0.5,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderColor: 'rgba(225,225,225,0.6)',
    },
    animatedView: {
        top: 0,
        right: 0,
        zIndex: 99,
        height: 62,
        paddingTop: 10,
        position: 'absolute',
        flexDirection: 'row',
        width: WIDTH,
    },
})

export default AnimatedScreen
