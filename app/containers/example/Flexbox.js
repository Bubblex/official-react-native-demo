import React, { Component } from 'react'
import { ScrollView, View, Text, StyleSheet, PixelRatio } from 'react-native'

class Flexbox extends Component {
    static navigationOptions = () => ({
        title: 'Flexbox',
    })
    render() {
        const FlexItemPowderblue = <View style={{ width: 50, height: 50, backgroundColor: 'powderblue' }} />
        const FlexItemSkyblue = <View style={{ width: 50, height: 50, backgroundColor: 'skyblue' }} />
        const FlexItemSteelblue = <View style={{ width: 50, height: 50, backgroundColor: 'steelblue' }} />
        return (
            <ScrollView>
                <Text style={{ fontWeight: 'bold', color: '#333' }}>{'一、Flex Direction, flexDirection可以决定布局的主轴'}</Text>

                <Text>{"1.1、flexDirection: 'row' => 主轴： 水平轴"}</Text>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    {FlexItemPowderblue}{FlexItemSkyblue}{FlexItemSteelblue}
                </View>

                <Text style={{ marginTop: 20 }}>{"1.2、flexDirection: 'column' => 主轴： 竖直轴"}</Text>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    {FlexItemPowderblue}{FlexItemSkyblue}{FlexItemSteelblue}
                </View>

                <Text style={{ fontWeight: 'bold', color: '#333', marginTop: 20 }}>{'二、Justify Content, justifyContent可以决定其子元素沿着主轴的排列方式'}</Text>

                <Text>{"2.1、flexDirection: 'row' => 主轴： 水平轴"}</Text>
                <Text>{"justifyContent: 'flex-start' => 排列方式： 左对齐"}</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                    {FlexItemPowderblue}{FlexItemSkyblue}{FlexItemSteelblue}
                </View>

                <Text style={{ marginTop: 20 }}>{"2.2、flexDirection: 'row' => 主轴： 水平轴"}</Text>
                <Text>{"justifyContent: 'center' => 排列方式： 居中对齐"}</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                    {FlexItemPowderblue}{FlexItemSkyblue}{FlexItemSteelblue}
                </View>

                <Text style={{ marginTop: 20 }}>{"2.3、flexDirection: 'row' => 主轴： 水平轴"}</Text>
                <Text>{"justifyContent: 'flex-end' => 排列方式： 居右对齐"}</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    {FlexItemPowderblue}{FlexItemSkyblue}{FlexItemSteelblue}
                </View>

                <Text style={{ marginTop: 20 }}>{"2.4、flexDirection: 'row' => 主轴： 水平轴"}</Text>
                <Text>{"justifyContent: 'space-around' => 排列方式： 水平平分居中"}</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                    {FlexItemPowderblue}{FlexItemSkyblue}{FlexItemSteelblue}
                </View>

                <Text style={{ marginTop: 20 }}>{"2.5、flexDirection: 'row' => 主轴： 水平轴"}</Text>
                <Text>{"justifyContent: 'space-between' => 排列方式： 水平贴边平分居中"}</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    {FlexItemPowderblue}{FlexItemSkyblue}{FlexItemSteelblue}
                </View>

                <Text style={{ marginTop: 20 }}>{"2.6、flexDirection: 'column' => 主轴： 竖直轴"}</Text>
                <Text>{"justifyContent: 'flex-start' => 排列方式： 上对齐"}</Text>
                <View style={[styles.border, { flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }]}>
                    {FlexItemPowderblue}{FlexItemSkyblue}{FlexItemSteelblue}
                </View>

                <Text style={{ marginTop: 20 }}>{"2.7、flexDirection: 'column' => 主轴： 竖直轴"}</Text>
                <Text>{"justifyContent: 'center' => 排列方式： 居中对齐"}</Text>
                <View style={[styles.border, { flex: 1, flexDirection: 'column', justifyContent: 'center' }]}>
                    {FlexItemPowderblue}{FlexItemSkyblue}{FlexItemSteelblue}
                </View>

                <Text style={{ marginTop: 20 }}>{"2.8、flexDirection: 'column' => 主轴： 竖直轴"}</Text>
                <Text>{"justifyContent: 'flex-end' => 排列方式： 下对齐"}</Text>
                <View style={[styles.border, { flex: 1, flexDirection: 'column', justifyContent: 'flex-end' }]}>
                    {FlexItemPowderblue}{FlexItemSkyblue}{FlexItemSteelblue}
                </View>

                <Text style={{ marginTop: 20 }}>{"2.9、flexDirection: 'column' => 主轴： 竖直轴"}</Text>
                <Text>{"justifyContent: 'space-around' => 排列方式： 垂直平分居中"}</Text>
                <View style={[styles.border, { flex: 1, flexDirection: 'column', justifyContent: 'space-around' }]}>
                    {FlexItemPowderblue}{FlexItemSkyblue}{FlexItemSteelblue}
                </View>

                <Text style={{ marginTop: 20 }}>{"2.10、flexDirection: 'column' => 主轴： 竖直轴"}</Text>
                <Text>{"justifyContent: 'space-between' => 排列方式： 垂直贴边居中"}</Text>
                <View style={[styles.border, { flex: 1, flexDirection: 'column', justifyContent: 'space-between' }]}>
                    {FlexItemPowderblue}{FlexItemSkyblue}{FlexItemSteelblue}
                </View>

                <Text style={{ fontWeight: 'bold', color: '#333', marginTop: 20 }}>{'三、Align Items, alignItems可以决定其子元素沿着次轴（与主轴垂直的轴，比如若主轴方向为row，则次轴方向为column）的排列方式'}</Text>

                <Text style={{ marginTop: 20 }}>{"3.1、flexDirection: 'row' => 主轴： 水平轴"}</Text>
                <Text>{"justifyContent: 'space-around' => 排列方式： 水平平分居中"}</Text>
                <Text>{"alignItems: 'flex-start' => 排列方式： 顶端对齐"}</Text>
                <View style={[styles.border, { flex: 1, alignItems: 'flex-start', flexDirection: 'row', justifyContent: 'space-around' }]}>
                    {FlexItemPowderblue}{FlexItemSkyblue}{FlexItemSteelblue}
                </View>

                <Text style={{ marginTop: 20 }}>{"3.1、flexDirection: 'row' => 主轴： 水平轴"}</Text>
                <Text>{"justifyContent: 'space-around' => 排列方式： 水平平分居中"}</Text>
                <Text>{"alignItems: 'center' => 排列方式： 垂直居中"}</Text>
                <View style={[styles.border, { flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around' }]}>
                    {FlexItemPowderblue}{FlexItemSkyblue}{FlexItemSteelblue}
                </View>

                <Text style={{ marginTop: 20 }}>{"3.3、flexDirection: 'row' => 主轴： 水平轴"}</Text>
                <Text>{"justifyContent: 'space-around' => 排列方式： 水平平分居中"}</Text>
                <Text>{"alignItems: 'flex-end' => 排列方式： 底部对齐"}</Text>
                <View style={[styles.border, { flex: 1, alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'space-around' }]}>
                    {FlexItemPowderblue}{FlexItemSkyblue}{FlexItemSteelblue}
                </View>

                <Text style={{ marginTop: 20 }}>{"3.4、flexDirection: 'row' => 主轴： 水平轴"}</Text>
                <Text>{"justifyContent: 'space-around' => 排列方式： 水平平分居中"}</Text>
                <Text>{"alignItems: 'stretch' => 排列方式： 铺满"}</Text>
                <View style={[styles.border, { flex: 1, alignItems: 'stretch', flexDirection: 'row', justifyContent: 'space-around' }]}>
                    <View style={{ width: 50, backgroundColor: 'powderblue' }} />
                    <View style={{ width: 50, backgroundColor: 'skyblue' }} />
                    <View style={{ width: 50, backgroundColor: 'steelblue' }} />
                </View>

                <Text style={{ marginTop: 20 }}>{"3.5、flexDirection: 'column' => 主轴： 竖直轴"}</Text>
                <Text>{"justifyContent: 'space-around' => 排列方式： 垂直平分居中"}</Text>
                <Text>{"alignItems: 'flex-start' => 排列方式： 左对齐"}</Text>
                <View style={[styles.border, { flex: 1, alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'space-around' }]}>
                    {FlexItemPowderblue}{FlexItemSkyblue}{FlexItemSteelblue}
                </View>

                <Text style={{ marginTop: 20 }}>{"3.6、flexDirection: 'column' => 主轴： 竖直轴"}</Text>
                <Text>{"justifyContent: 'space-around' => 排列方式： 垂直平分居中"}</Text>
                <Text>{"alignItems: 'center' => 排列方式： 水平居中对齐"}</Text>
                <View style={[styles.border, { flex: 1, alignItems: 'center', flexDirection: 'column', justifyContent: 'space-around' }]}>
                    {FlexItemPowderblue}{FlexItemSkyblue}{FlexItemSteelblue}
                </View>

                <Text style={{ marginTop: 20 }}>{"3.7、flexDirection: 'column' => 主轴： 竖直轴"}</Text>
                <Text>{"justifyContent: 'space-around' => 排列方式： 垂直平分居中"}</Text>
                <Text>{"alignItems: 'flex-end' => 排列方式： 右端对齐"}</Text>
                <View style={[styles.border, { flex: 1, alignItems: 'flex-end', flexDirection: 'column', justifyContent: 'space-around' }]}>
                    {FlexItemPowderblue}{FlexItemSkyblue}{FlexItemSteelblue}
                </View>

                <Text style={{ marginTop: 20 }}>{"3.8、flexDirection: 'column' => 主轴： 竖直轴"}</Text>
                <Text>{"justifyContent: 'space-around' => 排列方式： 垂直平分居中"}</Text>
                <Text>{"alignItems: 'stretch' => 排列方式： 铺满"}</Text>
                <View style={[styles.border, { flex: 1, alignItems: 'stretch', flexDirection: 'column', justifyContent: 'space-around' }]}>
                    <View style={{ height: 50, backgroundColor: 'powderblue' }} />
                    <View style={{ height: 50, backgroundColor: 'skyblue' }} />
                    <View style={{ height: 50, backgroundColor: 'steelblue' }} />
                </View>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    border: {
        borderWidth: 1 / PixelRatio.get(),
        height: 200,
    },
})

export default Flexbox
