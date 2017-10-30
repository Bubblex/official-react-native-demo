import React, { Component } from 'react'
import { StyleSheet, ScrollView, Image, Text, CameraRoll } from 'react-native'
import { Button, Grid } from 'antd-mobile'
import { connect } from 'react-redux'

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

    constructor(props) {
        super(props)

        this.state = {
            photoSource: null,
            isShowCamera: false,
        }
    }

    componentDidMount = () => {
        this.choosePicture()
    }

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

    takePicture = () => {
        this.props.dispatch(NavigationActions.navigate({ routeName: 'TakePicture' }))
    }

    linkMaps = () => {
        this.props.dispatch(NavigationActions.navigate({ routeName: 'Maps' }))
    }

    choosePicture = () => {
        CameraRoll.getPhotos({ first: 1 }).done((files) => {
            console.log(files)
            const edges = files.edges
            const photos = []
            for (const i in edges) {
                if (edges.length !== 0) {
                    photos.push(edges[i].node.image.uri)
                }
            }
            console.log(photos)
            this.setState({
                photoSource: { uri: files.edges[0].node.image.uri },
            })
        })
    }

    render() {
        const { app: { banner } } = this.props

        return (
            <ScrollView style={styles.container}>
                <Grid data={banner} />
                <Button onClick={this.gotoDetail}>Goto Detail</Button>
                <Button onClick={this.gotoSectionList}>SectionList Example</Button>
                <Button onClick={this.fetchTest}>Fetch Test</Button>
                <Text>{this.props.app.username}</Text>
                <Button onClick={this.linkExample}>FlatList Example</Button>
                <Button onClick={this.linkMaps}>Maps Example</Button>
                <Button onClick={this.takePicture}>Camera & Qrcode Example</Button>
                <Text> Scan result：{this.props.camera.qrcodeData}</Text>
                <Button onClick={this.choosePicture}>Select Picture</Button>
                <Image
                    style={styles.picture}
                    source={this.state.photoSource}
                    resizeMode='cover'
                />
            </ScrollView>
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
    picture: {
        width: '100%',
        height: 200,
        marginBottom: 100,
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
