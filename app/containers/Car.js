import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    FlatList,
    ListView,
    Dimensions,
    StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import { SearchBar, Flex } from 'antd-mobile'
import Menu from '../components/menu'

const { width } = Dimensions.get('window')
const FlexItem = Flex.Item

@connect(state => state)
class CarExample extends Component {
    static navigationOptions = () => ({
        headerStyle: {
            backgroundColor: '#efeff4',
        },
        headerTitle: <SearchBar placeholder='搜索二手车' />,
        headerRight: <Text>icon</Text>,
    })

    constructor(props) {
        super(props)
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })

        this.rData = []
        this.state = {
            data: {},
            dataSource: dataSource.cloneWithRows(this.rData),
            isLoading: true,
        }
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'example/fetchExampleList',
            payload: {
                page: 1,
            },
        })
    }

    componentWillReceiveProps(nextProps) {
        const exampleList = nextProps.example.exampleList
        const examplePaginate = nextProps.example.examplePaginate

        if (exampleList.length > 0 && examplePaginate.page !== this.props.example.examplePaginate.page) {
            this.rData = this.rData.concat(exampleList)
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            })
        }
        else if (exampleList.length === 0 && this.rData.length === 0) {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                hasMore: false,
            })
        }
    }

    onEndReached = () => {
        const {
            dispatch,
            example: {
                examplePaginate,
            },
        } = this.props

        if (this.state.isLoading && !this.state.hasMore) {
            return
        }

        // if (!examplePaginate || !examplePaginate.page) {
        //     return
        // }

        this.setState({ isLoading: true })

        dispatch({
            type: 'example/fetchExampleList',
            payload: {
                page: examplePaginate.page + 1,
            },
        })
    }

    onRefresh = () => {
        const { dispatch } = this.props

        this.rData = []
        dispatch({
            type: 'example/removeExampleList',
        })

        dispatch({
            type: 'example/fetchExampleList',
            payload: {
                page: 1,
            },
        })
    }

    onSelectMenu = (index, subindex, data) => {
        this.setState({ index, subindex, data })
    }

    renderItem = ({ item, indexs }) => {
        return (
            <View key={indexs} style={styles.item}>
                <Flex>
                    <FlexItem style={styles.imageItem}>
                        <Image
                            style={styles.icon}
                            source={{ uri: item.image }}
                        />
                    </FlexItem>
                    <FlexItem>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text>{item.title}</Text>
                        <Text style={styles.price}>{item.price}万</Text>
                    </FlexItem>
                </Flex>
            </View>
        )
    }

    renderContent = () => {
        return (
            <FlatList
                data={this.rData}
                renderItem={this.renderItem}
                onEndReachedThreshold={0.5}
                onEndReached={this.onEndReached}
                onRefresh={this.onRefresh}
                refreshing={false}
                ListFooterComponent={() => (
                    <View style={styles.container}>
                        <Text>{!this.state.hasMore ? '没有更多了...' : ''}</Text>
                    </View>
                )}
            />
        )
    }

    render() {
        const CONFIG = [
            {
                type: 'subtitle',
                selectedIndex: 0,
                data: [
                    { title: '类型', subtitle: '1200m' },
                    { title: '自助餐', subtitle: '300m' },
                    { title: '自助餐', subtitle: '200m' },
                    { title: '自助餐', subtitle: '500m' },
                    { title: '自助餐', subtitle: '800m' },
                    { title: '自助餐', subtitle: '700m' },
                    { title: '自助餐', subtitle: '900m' },
                ],
            },
            {
                type: 'title',
                selectedIndex: 0,
                data: [{
                    title: '品牌',
                }, {
                    title: '离我最近',
                }, {
                    title: '好评优先',
                }, {
                    title: '人气最高',
                }],
            },
            {
                type: 'price',
                selectedIndex: 0,
                data: [{
                    title: '价格',
                }, {
                    title: '20万',
                }, {
                    title: '30万',
                }, {
                    title: '40万',
                }],
            },
            {
                type: 'more',
                selectedIndex: 0,
                data: [{
                    title: '更多',
                }, {
                    title: '20万',
                }, {
                    title: '30万',
                }, {
                    title: '40万',
                }],
            },
        ]

        return (
            <View style={styles.container}>
                <Menu
                    style={styles.containeree}
                    config={CONFIG}
                    onSelectMenu={this.onSelectMenu}
                    renderContent={this.renderContent}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    containeree: {
        width,
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        margin: 30,
        width: 300,
        height: 70,
    },
    imageItem: {
        flex: 0.3,
    },
    text: {
        width,
        fontSize: 20,
        marginTop: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        flex: 1,
        padding: 10,
        borderColor: '#ddd',
        alignItems: 'center',
        borderBottomWidth: 1,
    },
    price: {
        fontSize: 16,
        color: 'red',
    },
    title: {
        fontSize: 18,
        color: '#333',
    },
})

export default CarExample
