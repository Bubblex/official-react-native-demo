import React, { Component } from 'react'
import { StyleSheet, ScrollView, Image, Text, CameraRoll, TouchableOpacity, View } from 'react-native'
import { Grid, Carousel, List } from 'antd-mobile'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker'
import Icon from 'react-native-vector-icons/Ionicons'
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

    gotoDetail = () => {
        this.props.dispatch(NavigationActions.navigate({ routeName: 'Detail' }))
    }

    linkFlatList = () => {
        this.props.dispatch(NavigationActions.navigate({ routeName: 'FlatList' }))
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

    linkEchart = () => {
        this.props.dispatch(NavigationActions.navigate({ routeName: 'Echart' }))
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
                    <Item arrow='horizontal' onClick={() => {this.handleLink('Swiper')}}>Swiper example</Item>
                </List>
                <List renderHeader='示例页面'>
                    <Item arrow='horizontal' onClick={this.gotoSectionList}>SectionList example</Item>
                    <Item arrow='horizontal' onClick={this.linkFlatList}>FlatList example</Item>
                    <Item arrow='horizontal' onClick={this.linkMaps}>Maps example</Item>
                    <Item arrow='horizontal' onClick={this.linkEchart}>Echart example</Item>
                </List>
                <List renderHeader='常用功能'>
                    <Item arrow='horizontal' onClick={this.gotoDetail}>Goto screen</Item>
                    <Item arrow='horizontal' onClick={this.takePicture}>Scan qrcode</Item>
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
