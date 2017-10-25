import React, { Component } from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'
import { Button, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
// import Camera from 'react-native-camera'

import { NavigationActions } from '../utils'

@connect(state => state)
class Home extends Component {
    static navigationOptions = ({ screenProps }) => ({
        title: '主页',
        tabBarLabel: '主页',
        tabBarIcon: ({ focused, tintColor }) => (
            <Image
                style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
                source={require('../images/house.png')}
            />
        ),
        headerStyle: {
            backgroundColor: screenProps ? screenProps.themeColor : '#4ECBFC',
        },
    })

    gotoDetail = () => {
        this.props.dispatch(NavigationActions.navigate({ routeName: 'Detail' }))
    }

    fetchTest = () => {
        this.props.dispatch({ type: 'app/fetchTest' })
    }

    linkExample = () => {
        this.props.dispatch(NavigationActions.navigate({ routeName: 'Example' }))
    }

    gotoSectionList = () => {
        this.props.dispatch(NavigationActions.navigate({ routeName: 'Car' }))
    }

    takePicture() {
        const options = {}
        this.camera.capture({ metadata: options })
            .then((data) => { console.log(data) })
            .catch(err => console.error(err))
    }

    render() {
        const { app: { banner } } = this.props

        return (
            <View style={styles.container}>
                <Grid data={banner} />
                <Button onClick={this.gotoDetail}>Goto Detail</Button>
                <Button onClick={this.gotoSectionList}>SectionList</Button>
                <Button onClick={this.fetchTest}>Fetch Test</Button>
                <Text>{this.props.app.username}</Text>
                <Button onClick={this.linkExample}>FlatList示例</Button>
                {
                    // <Camera
                    //     ref={(cam) => {
                    //         this.camera = cam
                    //     }}
                    //     style={styles.preview}
                    //     aspect={Camera.constants.Aspect.fill}
                    // >
                    //     <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
                    // </Camera>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
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

export default Home
