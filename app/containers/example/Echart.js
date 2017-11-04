import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryStack, VictoryTheme, VictoryArea } from 'victory-native'
import themeColor from '../../config/theme'

@connect()
class Echart extends Component {
    static navigationOptions = ({ screenProps }) => ({
        title: '统计图',
        headerStyle: {
            backgroundColor: screenProps ? screenProps.themeColor : '#4ECBFC',
        },
    })

    render() {
        const data = [
            { quarter: 1, earnings: 13000 },
            { quarter: 2, earnings: 6500 },
            { quarter: 3, earnings: 14250 },
            { quarter: 4, earnings: 9000 },
            { quarter: 5, earnings: 14000 },
            { quarter: 6, earnings: 10000 },
        ]

        const data1992 = [
            { quarter: 1, earnings: 13000 },
            { quarter: 2, earnings: 16500 },
            { quarter: 3, earnings: 14250 },
            { quarter: 4, earnings: 19000 },
        ]

        const data1993 = [
            { quarter: 1, earnings: 15000 },
            { quarter: 2, earnings: 12500 },
            { quarter: 3, earnings: 19500 },
            { quarter: 4, earnings: 13000 },
        ]

        const data1994 = [
            { quarter: 1, earnings: 11500 },
            { quarter: 2, earnings: 13250 },
            { quarter: 3, earnings: 20000 },
            { quarter: 4, earnings: 15500 },
        ]

        const data1995 = [
            { quarter: 1, earnings: 18000 },
            { quarter: 2, earnings: 13250 },
            { quarter: 3, earnings: 15000 },
            { quarter: 4, earnings: 12000 },
        ]
        return (
            <ScrollView style={styles.container}>
                <VictoryChart domainPadding={40}>
                    <VictoryAxis
                        tickValues={[1, 2, 3, 4, 5, 6]}
                        tickFormat={['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6']}
                    />
                    <VictoryAxis
                        dependentAxis
                        tickFormat={x => (`$${x / 1000}k`)}
                    />
                    <VictoryBar
                        style={{
                            data: { fill: themeColor.brandPrimary },
                        }}
                        data={data}
                        x='quarter'
                        y='earnings'
                    />
                </VictoryChart>
                <Text>统计图</Text>

                <VictoryChart
                    domainPadding={40}
                    theme={VictoryTheme.material}
                >
                    <VictoryAxis
                        tickValues={[1, 2, 3, 4]}
                        tickFormat={['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4']}
                    />
                    <VictoryAxis
                        dependentAxis
                        tickFormat={x => (`$${x / 1000}k`)}
                    />
                    <VictoryStack
                        style={{
                            data: { width: 15, stroke: 'white', strokeWidth: 2 },
                        }}
                        colorScale={['cyan', 'gold', 'orange', 'tomato']}
                    >
                        <VictoryBar
                            data={data1992}
                            x='quarter'
                            y='earnings'
                        />
                        <VictoryBar
                            data={data1993}
                            x='quarter'
                            y='earnings'
                        />
                        <VictoryBar
                            data={data1994}
                            x='quarter'
                            y='earnings'
                        />
                        <VictoryBar
                            data={data1995}
                            x='quarter'
                            y='earnings'
                        />
                    </VictoryStack>
                </VictoryChart>
                <Text>自定义主题统计图</Text>

                <VictoryChart
                    theme={VictoryTheme.material}
                >
                    <VictoryArea
                        style={{ data: { fill: '#c43a31' } }}
                        data={data}
                        interpolation='natural'
                        x='quarter'
                        y='earnings'
                    />
                </VictoryChart>
                <Text>折线统计图</Text>

                <VictoryChart
                    domainPadding={40}
                    theme={VictoryTheme.material}
                >
                    <VictoryAxis
                        tickValues={[1, 2, 3, 4]}
                        tickFormat={['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4']}
                    />
                    <VictoryAxis
                        dependentAxis
                        tickFormat={x => (`$${x / 1000}k`)}
                    />
                    <VictoryStack
                        style={{
                            data: { width: 5, stroke: 'white', strokeWidth: 2 },
                        }}
                        colorScale={['cyan', 'gold', 'orange', 'tomato']}
                    >
                        <VictoryArea
                            style={{
                                data: { fill: 'navy' },
                            }}
                            data={data1992}
                            x='quarter'
                            y='earnings'
                        />
                        <VictoryArea
                            data={data1993}
                            x='quarter'
                            y='earnings'
                        />
                        <VictoryArea
                            data={data1994}
                            x='quarter'
                            y='earnings'
                        />
                        <VictoryArea
                            data={data1995}
                            x='quarter'
                            y='earnings'
                        />
                    </VictoryStack>
                </VictoryChart>
                <Text>阶段折线统计图</Text>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default Echart
