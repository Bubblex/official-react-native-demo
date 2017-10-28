import React, { Component } from 'react'
import { StyleSheet, View, Text, CameraRoll, Animated, Easing } from 'react-native'
import { connect } from 'react-redux'
import Camera from 'react-native-camera'

@connect(state => state)

class TakePicture extends Component {
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
        // const {navigator, route} = this.props
        // const {qrCodeRead} = route
        // const {data} = result
        // qrCodeRead && qrCodeRead(data)
        // navigator.pop()

        console.log(result)
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
                this.setState({ pictureData: data })

                CameraRoll.getPhotos({ first: 5 }).done((files) => {
                    console.log(files)
                })
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
                        <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
                    </View>
                </Camera>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    rectangle: {
        width: 200,
        height: 200,
        borderColor: 'red',
        borderWidth: 4,
    },
    border: {
        width: 200,
        height: 4,
        backgroundColor: 'red',
    },
    container: {
        flex: 1,
        // alignItems: 'center',
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
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
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
