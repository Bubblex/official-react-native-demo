import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, ListView, FlatList } from 'react-native'
import { connect } from 'react-redux'

@connect(state => state)
class Example extends Component {
    static navigationOptions = ({ screenProps }) => ({
        title: '示例',
        tabBarLabel: '示例',
        tabBarIcon: ({ focused, tintColor }) => (
            <Image
                style={[styles.icon, { tintColor: focused ? tintColor : 'gray' }]}
                source={require('../images/person.png')}
            />
        ),
        headerStyle: {
            backgroundColor: screenProps ? screenProps.themeColor : '#4ECBFC',
        },
        headerTitleStyle: {
            alignSelf: 'center',
        },
    })

    constructor(props) {
        super(props)
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })

        // 当前所有元素的列表
        this.rData = []
        this.state = {
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

    renderItem = ({ item, indexs }) => {
        return (
            <View key={indexs} style={styles.item}>
                <Image
                    style={styles.icon}
                    source={{ uri: item.image }}
                />
                <Text>{item.title}</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
    },
    icon: {
        width: 32,
        height: 32,
    },

    item: {
        flex: 1,
        padding: 10,
        borderColor: '#ddd',
        alignItems: 'center',
        borderBottomWidth: 1,
    },
})

export default Example
