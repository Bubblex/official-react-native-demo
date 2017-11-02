import React, { Component } from 'react'
import { StyleSheet, ScrollView, Image, Text, CameraRoll, TouchableOpacity } from 'react-native'
import { Button, Grid, Carousel } from 'antd-mobile'
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
                size={30}
                color={focused ? tintColor : 'gray'}
                name={focused ? 'ios-home' : 'ios-home-outline'}
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

        this.props.dispatch({
            type: 'common/fetchBanner',
        })
    }

    gotoDetail = () => {
        this.props.dispatch(NavigationActions.navigate({ routeName: 'Detail' }))
    }

    fetchTest = () => {
        this.props.dispatch({ type: 'common/fetchTest' })
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
        const { common: { indexBanner } } = this.props

        return (
            <ScrollView style={styles.container}>
                <Carousel
                    style={styles.Carousel}
                    dragging={false}
                    swiping={false}
                    autoplay
                    infinite
                >
                    {
                        indexBanner.banner.map(({ image }, index) => (
                            <Image source={{ uri: image }} style={styles.bannerImage} key={index} />
                        ))
                    }
                </Carousel>
                <Grid
                    hasLine={false}
                    data={indexBanner.grid}
                    renderItem={
                        dataItem => (
                            <TouchableOpacity style={styles.TouchableOpacity}>
                                <Image source={{ uri: dataItem.icon }} style={styles.icon} />
                                <Text style={styles.gridText}>{dataItem.text}</Text>
                            </TouchableOpacity>
                        )
                    }
                />
                <Button onClick={this.gotoDetail}>Goto Detail</Button>
                <Button onClick={this.gotoSectionList}>SectionList Example</Button>
                <Button onClick={this.fetchTest}>Fetch Test</Button>
                <Text>{this.props.common.username}</Text>
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
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 8,
    },
    Carousel: {
        height: 120,
        backgroundColor: '#fff',
    },
    TouchableOpacity: {
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gridText: {
        marginTop: 10,
        color: '#333',
    },
    bannerImage: {
        width: '100%',
        height: 120,
    },
    headerIcon: {
        height: 40,
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
