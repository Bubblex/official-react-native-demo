import React, { Component } from 'react'
import { StyleSheet, View, Image, Text, CameraRoll } from 'react-native'
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

    choosePicture = () => {
        CameraRoll.getPhotos({ first: 5 }).done((files) => {
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
                photoSource: { uri: files.edges[3].node.image.uri },
            })
        })
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
                <Button onClick={this.takePicture}>拍照</Button>
                <Button onClick={this.choosePicture}>选择照片</Button>
                <Image
                    style={styles.icon}
                    source={this.state.photoSource}
                    resizeMode='cover'
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
