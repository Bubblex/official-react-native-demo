import React, { Component } from 'react'
import { StyleSheet, View, Text, Animated, Easing } from 'react-native'
import { connect } from 'react-redux'
import Camera from 'react-native-camera'
import { NavigationActions } from '../../utils'

import themeConfig from '../../config/theme'

@connect(state => state)

class TakePicture extends Component {
    static navigationOptions = ({ screenProps }) => ({
        title: '扫描二维码',
        headerStyle: {
            backgroundColor: screenProps.themeColor,
        },
    })

    constructor(props) {
        super(props)

        this.state = {
            pictureData: null,
            moveAnim: new Animated.Value(0),
        }
    }

    componentDidMount() {
        this.startAnimation()
    }

    onBarCodeRead = (result) => {
        // const { navigator } = this.props
        // const {qrCodeRead} = route
        // const {data} = result
        // qrCodeRead && qrCodeRead(data)
        // navigator.pop()

        const qrcodeData = result.data

        if (qrcodeData) {
            this.props.dispatch({
                type: 'camera/saveQrcodeData',
                qrcodeData,
            })
            this.props.dispatch(NavigationActions.navigate({ routeName: 'Home' }))
        }
    };

    startAnimation = () => {
        this.state.moveAnim.setValue(0)
        Animated.timing(
            this.state.moveAnim, // 初始值
            {
                toValue: -200,
                duration: 1500,
                easing: Easing.linear,
            }, // 结束值
        ).start(() => this.startAnimation())// 开始
    };

    takePicture() {
        const options = {}
        this.camera.capture({ metadata: options })
            .then((data) => {
                console.log(data)
                this.props.dispatch(NavigationActions.navigate({ routeName: 'Home' }))

                // this.setState({ pictureData: data })
                // CameraRoll.getPhotos({ first: 5 }).done((files) => {
                //     console.log(files)
                // })
            })
            .catch(err => console.error(err))
    }

    render() {
        return (
            <View style={styles.container}>
                <Camera
                    ref={(cam) => {
                        this.camera = cam
                    }}
                    style={styles.preview}
                    onBarCodeRead={this.onBarCodeRead}
                    aspect={Camera.constants.Aspect.fill}
                >
                    <View style={styles.rectangleContainer}>
                        <View style={styles.rectangle} />
                        <Animated.View
                            style={[
                                styles.border,
                                { transform: [{ translateY: this.state.moveAnim }] },
                            ]}
                        />
                        <Text style={styles.rectangleText}>将二维码放入框内，即可自动扫描</Text>
                        {
                            false
                            &&
                            // can get the last phone to show
                            <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[点击拍照]</Text>
                        }
                    </View>
                </Camera>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    preview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rectangle: {
        width: 200,
        height: 200,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderColor: themeConfig.brandPrimary,
        borderWidth: 4,
    },
    border: {
        width: 200,
        height: 4,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: themeConfig.brandPrimary,
    },
    icon: {
        width: 32,
        height: 32,
    },
    banner: {
        width: '100%',
        height: 100,
    },
    item: {
        height: 20,
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40,
    },
})

export default TakePicture
