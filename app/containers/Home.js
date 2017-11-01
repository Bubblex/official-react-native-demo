import React, { Component } from 'react'
import { StyleSheet, ScrollView, Image, Text, CameraRoll } from 'react-native'
import { Button, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/Ionicons'

import { NavigationActions } from '../utils'
import themeConfig from '../config/theme'

@connect(state => state)
class Home extends Component {
    static navigationOptions = ({ screenProps, navigation }) => ({
        title: '首页',
        tabBarLabel: '首页',
        tabBarIcon: ({ focused, tintColor }) => (
            <Icon
                name={focused ? 'ios-home' : 'ios-home-outline'}
                size={30}
                color={focused ? tintColor : 'gray'}
            />
        ),
        headerStyle: {
            backgroundColor: screenProps ? screenProps.themeColor : '#4ECBFC',
        },
        headerRight: (
            <Icon.Button
                name='ios-qr-scanner'
                backgroundColor={themeConfig.brandPrimary}
                size={30}
                color='#fff'
                style={styles.headerIcon}
                onPress={() => { navigation.navigate('TakePicture') }}
            />
        ),
    })

    constructor(props) {
        super(props)

        this.state = {
            photoSource: null,
            avatarSource: null,
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
            const edges = files.edges
            const photos = []
            for (const i in edges) {
                if (edges.length !== 0) {
                    photos.push(edges[i].node.image.uri)
                }
            }
            this.setState({
                photoSource: { uri: files.edges[0].node.image.uri },
            })
        })
    }

    imagePicker = () => {
        const options = {
            title: '选择图片',
            customButtons: [
                // { name: 'fb', title: 'Choose Photo from Facebook' },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            quality: 0.3,
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '从手机相册选择',
        }
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response)
            if (response.didCancel) {
                console.log('User cancelled image picker')
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton)
            }
            else {
                const source = { uri: response.uri }

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                })
            }
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
                <Button onClick={this.imagePicker}>Select Picture</Button>
                <Image
                    source={this.state.avatarSource}
                    style={styles.picture}
                    resizeMode='cover'
                />
                <Text>----------------我是分割线-------------------</Text>
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
    headerIcon: {
        marginRight: 15,
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
