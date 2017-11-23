import React, { Component } from 'react'
import { StyleSheet, ScrollView, Image, Text, CameraRoll, TouchableOpacity, View } from 'react-native'
import { Grid, Carousel, List } from 'antd-mobile'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/Ionicons'
import Markdown from 'react-native-simple-markdown'
import { NavigationActions } from '../utils'
import themeConfig from '../config/theme'
import { iconsMap } from '../utils/icon'
import I18n from '../utils/i18n'

const Item = List.Item

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
        this.props.dispatch({
            type: 'common/fetchBanner',
        })
    }

    handleLink = (screen) => {
        this.props.dispatch(NavigationActions.navigate({ routeName: screen }))
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
            // customButtons: [
            //     { name: 'fb', title: 'Choose Photo from Facebook' },
            // ],
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

    handleCilckGrid = (val) => {
        this.props.dispatch(NavigationActions.navigate({ routeName: val.screen }))
    }

    render() {
        const { common: { indexBanner } } = this.props

        const gridData = [
            {
                icon: iconsMap['ios-list-box'],
                text: '列表',
                index: 0,
                screen: 'FlatList',
            },
            {
                icon: iconsMap['ios-apps'],
                text: '筛选列表',
                index: 1,
                screen: 'Car',
            },
            {
                icon: iconsMap['ios-navigate'],
                text: '谷歌地图',
                index: 2,
                screen: 'Maps',
            },
            {
                icon: iconsMap['ios-podium'],
                text: '统计图',
                index: 3,
                screen: 'Echart',
            },
            {
                icon: iconsMap['ios-color-wand'],
                text: '动画',
                index: 4,
                screen: 'Animated',
            },
            {
                icon: iconsMap['ios-navigate'],
                text: '高德地图',
                index: 5,
                screen: 'Amap',
            },
            {
                icon: iconsMap['ios-flower'],
                text: 'Interaction',
                index: 6,
                screen: 'Interaction',
            },
            {
                icon: iconsMap['ios-grid'],
                text: 'Flexbox',
                index: 7,
                screen: 'Flexbox',
            },
        ]

        const markdownStyles = {
            heading1: {
                fontSize: 24,
                color: 'purple',
            },
            link: {
                color: 'pink',
            },
            mailTo: {
                color: 'orange',
            },
            text: {
                color: '#555555',
            },
        }

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
                    data={gridData}
                    onClick={(val) => { this.handleCilckGrid(val) }}
                    renderItem={
                        dataItem => (
                            <View style={styles.TouchableOpacity}>
                                <Image source={dataItem.icon} style={styles.iconCustom} />
                                <Text style={styles.gridText}>{dataItem.text}</Text>
                            </View>
                        )
                    }
                />
                {
                    false
                    &&
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
                }
                <List renderHeader='示例组件'>
                    <Item arrow='horizontal' onClick={() => { this.handleLink('Swiper') }}>Swiper example</Item>
                    <Item arrow='horizontal' onClick={() => { this.handleLink('Materialkit') }}>Materialkit example</Item>
                    <Item arrow='horizontal' onClick={() => { this.handleLink('Kline') }}>Kline example</Item>
                </List>
                <List renderHeader='示例页面'>
                    <Item arrow='horizontal' onClick={() => { this.handleLink('Car') }}>SectionList example</Item>
                    <Item arrow='horizontal' onClick={() => { this.handleLink('FlatList') }}>FlatList example</Item>
                    <Item arrow='horizontal' onClick={() => { this.handleLink('Maps') }}>Maps example</Item>
                    <Item arrow='horizontal' onClick={() => { this.handleLink('Echart') }}>Echart example</Item>
                </List>
                <List renderHeader='常用功能'>
                    <Item arrow='horizontal' onClick={() => { this.handleLink('Detail') }}>Goto screen</Item>
                    <Item arrow='horizontal' onClick={() => { this.handleLink('TakePicture') }}>Scan qrcode</Item>
                    <Text>  Scan result：{this.props.camera.qrcodeData}</Text>
                    <Item arrow='horizontal' onClick={this.imagePicker}>Image picker</Item>
                    <Text>  Show image:</Text>
                    <Image
                        source={this.state.avatarSource}
                        style={styles.picture}
                        resizeMode='cover'
                    />
                    <Item arrow='horizontal' onClick={this.choosePicture}>Get first image</Item>
                    <Text>  Show first image:</Text>
                    <Image
                        style={styles.picture}
                        source={this.state.photoSource}
                        resizeMode='cover'
                    />
                </List>
                <Text>{I18n.t('greeting')}</Text>
                <Markdown styles={markdownStyles}>
                    #Markdown in react-native is so cool! {'\n\n'}

                    You can **emphasize** what you want, or just _suggest it_ 😏…{'\n'}

                    You can even [**link your website**](http://carlito.ninja) or if you prefer: [email somebody](mailto:email@somebody.com){'\n'}

                    Spice it up with some GIFs 💃:

                    ![Some GIF](https://media.giphy.com/media/dkGhBWE3SyzXW/giphy.gif){'\n'}

                    And even add a cool video 😎!{'\n'}

                    [![A cool video from YT](https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg)](http://www.youtube.com/watch?v=dQw4w9WgXcQ)

                    [![Another one from Vimeo](https://i.vimeocdn.com/video/399486266_640.jpg)](https://vimeo.com/57580368)
                </Markdown>
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
    iconCustom: {
        width: 30,
        height: 30,
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
})

export default Home
