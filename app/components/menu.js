import React, { Component } from 'react'
import {
    StyleSheet,
    Animated,
    ScrollView,
    Dimensions,
    PixelRatio,
    Text,
    TouchableWithoutFeedback,
    TouchableHighlight,
    ART,
    View,
} from 'react-native'
import Triangle from './Triangle'

const { Surface, Shape, Group } = ART

const { width, height } = Dimensions.get('window')

const COLOR_HIGH = '#108ee9'
const COLOR_NORMAL = '#6c6c6c'

const LINE = 1 / PixelRatio.get()

const TopMenuItem = (props) => {
    const onPress = () => {
        props.onSelect(props.index)
    }
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.item}>
                <Text style={props.selected ? styles.menuTextHigh : styles.menuText}>{props.label}</Text>
                <Triangle selected={props.selected} />
            </View>
        </TouchableWithoutFeedback>
    )
}

const Subtitle = (props) => {
    const textStyle = props.selected ?
        [styles.tableItemText, styles.highlight, styles.marginHigh] :
        [styles.tableItemText, styles.margin]

    const rightTextStyle = props.selected ? [styles.tableItemText, styles.highlight] : styles.tableItemText

    const onPress = () => {
        props.onSelectMenu(props.index, props.subindex, props.data)
    }

    return (
        <TouchableHighlight onPress={onPress} underlayColor='#f5f5f5'>
            <View style={styles.tableItem}>
                <View style={styles.row}>
                    {props.selected && <Check />}
                    <Text style={textStyle}>{props.data.title}</Text>
                </View>
                <Text style={rightTextStyle}>{props.data.subtitle}</Text>
            </View>
        </TouchableHighlight>
    )
}

const Title = (props) => {
    const textStyle = props.selected ?
        [styles.tableItemText, styles.highlight, styles.marginHigh] :
        [styles.tableItemText, styles.margin]

    // const rightTextStyle = props.selected ? [styles.tableItemText, styles.highlight] : styles.tableItemText

    const onPress = () => {
        props.onSelectMenu(props.index, props.subindex, props.data)
    }

    return (
        <TouchableHighlight onPress={onPress} underlayColor='#f5f5f5'>
            <View style={styles.titleItem}>
                {props.selected && <Check />}
                <Text style={textStyle}>{props.data.title}</Text>
            </View>
        </TouchableHighlight>
    )
}

const Check = () => {
    return (
        <Surface
            width={18}
            height={12}
        >
            <Group scale={0.03}>
                <Shape
                    fill={COLOR_HIGH}
                    d={`M494,52c-13-13-33-13-46,0L176,324L62,211c-13-13-33-13-46,0s-13,33,0,46l137,136c6,6,15,10,23,10s17-4,23-10L494,99
      C507,86,507,65,494,52z`}
                />
            </Group>
        </Surface>
    )
}

export default class TopMenu extends Component {
    constructor(props) {
        super(props)
        const array = props.config
        const top = []
        const maxHeight = []
        const subselected = []
        const heightArr = []
        // 最大高度
        const max = parseInt(((height - 80) * 0.8) / 43, 10)

        for (let i = 0, c = array.length; i < c; ++i) {
            const item = array[i]
            top[i] = item.data[item.selectedIndex].title
            maxHeight[i] = Math.min(item.data.length, max) * 43
            subselected[i] = item.selectedIndex
            heightArr[i] = new Animated.Value(0)
        }


        // 分析数据
        this.state = {
            top,
            maxHeight,
            subselected,
            heightArr,
            fadeInOpacity: new Animated.Value(0),
            selectedIndex: null,
        }
    }

    onSelect = (index) => {
        if (index === this.state.selectedIndex) {
            // 消失
            this.hide(index)
        } else {
            this.setState({ selectedIndex: index, current: index })
            this.onShow(index)
        }
    }

    onShow = (index) => {
        Animated.parallel([this.createAnimation(index, this.state.maxHeight[index]), this.createFade(1)]).start()
    }

    onHide = (index) => {
        // 其他的设置为0
        for (let i = 0, c = this.state.heightArr.length; i < c; ++i) {
            if (index !== i) {
                this.state.heightArr[i].setValue(0)
            }
        }
        Animated.parallel([this.createAnimation(index, 0), this.createFade(0)]).start()
    }

    onSelectMenu = (index, subindex) => {
        this.hide(index, subindex)
        // this.props.onSelectMenu && this.props.onSelectMenu(index, subindex, data)
    }


    hide = (index, subselected) => {
        let opts = { selectedIndex: null, current: index }
        if (subselected !== undefined) {
            this.state.subselected[index] = subselected
            this.state.top[index] = this.props.config[index].data[subselected].title
            opts = { selectedIndex: null, current: index, subselected: this.state.subselected.concat() }
        }
        this.setState(opts)
        this.onHide(index)
    }

    createFade = (value) => {
        return Animated.timing(
            this.state.fadeInOpacity,
            {
                toValue: value,
                duration: 250,
            },
        )
    }

    createAnimation = (index, heights) => {
        return Animated.timing(
            this.state.heightArr[index],
            {
                toValue: heights,
                duration: 250,
            },
        )
    }


    renderList = (d, index) => {
        const subselected = this.state.subselected[index]
        let Comp = null
        if (d.type === 'title') {
            Comp = Title
        } else {
            Comp = Subtitle
        }

        const enabled = this.state.selectedIndex === index || this.state.current === index

        return (
            <Animated.View
                key={index}
                pointerEvents={enabled ? 'auto' : 'none'}
                style={[styles.content, { opacity: enabled ? 1 : 0, height: this.state.heightArr[index] }]}
            >
                <ScrollView style={styles.scroll}>
                    {d.data.map((data, subindex) => {
                        return (
                            <Comp
                                onSelectMenu={this.onSelectMenu}
                                index={index}
                                subindex={subindex}
                                data={data}
                                selected={subselected === subindex}
                                key={subindex}
                            />
                        )
                    })}
                </ScrollView>
            </Animated.View>
        )
    }

    render() {
        let list = null
        if (this.state.selectedIndex !== null) {
            list = this.props.config[this.state.selectedIndex].data
        }
        console.log(list)
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.topMenu}>
                    {this.state.top.map((t, index) => {
                        return (
                            <TopMenuItem
                                key={index}
                                index={index}
                                onSelect={this.onSelect}
                                label={t}
                                selected={this.state.selectedIndex === index}
                            />
                        )
                    })}
                </View>
                {this.props.renderContent()}
                <View style={styles.bgContainer} pointerEvents={this.state.selectedIndex !== null ? 'auto' : 'none'}>
                    <Animated.View style={[styles.bg, { opacity: this.state.fadeInOpacity }]} />
                    {this.props.config.map((d, index) => {
                        return this.renderList(d, index)
                    })}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        backgroundColor: '#fff',
    },
    bgContainer: {
        width,
        height,
        top: 40,
        position: 'absolute',
    },
    bg: {
        flex: 1,
        backgroundColor: 'rgba(50,50,50,0.2)',
    },
    content: {
        position: 'absolute',
        width,
    },

    highlight: {
        color: COLOR_HIGH,
    },

    marginHigh: {
        marginLeft: 10,
    },
    margin: {
        marginLeft: 28,
    },

    titleItem: {
        height: 43,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: LINE,
        borderBottomColor: '#eee',
    },

    tableItem: {
        height: 43,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: LINE,
        borderBottomColor: '#eee',
        justifyContent: 'space-between',
    },
    tableItemText: {
        fontSize: 14,
        fontWeight: '300',
    },
    row: {
        flexDirection: 'row',
    },

    item: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    menuTextHigh: {
        fontSize: 13,
        marginRight: 3,
        color: COLOR_HIGH,
    },
    menuText: {
        fontSize: 13,
        marginRight: 3,
        color: COLOR_NORMAL,
    },
    topMenu: {
        height: 40,
        zIndex: 999,
        borderTopWidth: LINE,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderTopColor: '#bdbdbd',
        borderBottomColor: '#f2f2f2',
    },
})
