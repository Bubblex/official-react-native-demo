import React, { Component } from 'react'
import { Text, View, Image, Dimensions, ScrollView, StyleSheet } from 'react-native'
import Interactable from 'react-native-interactable'

const WIDTH = Dimensions.get('window').width
const HEIGHT = 230

class Interaction extends Component {
    static navigationOptions = () => ({
        title: 'Interactable示例',
    })
    render() {
        return (
            <ScrollView>
                <Interactable.View
                    horizontalOnly // 横向
                    snapPoints={[{ x: 0 }, { x: -200 }]}
                    onSnap={() => { console.log('onsnap') }}
                >
                    <Image
                        source={require('../../images/avatar.jpg')}
                        style={styles.testImg}
                    />
                </Interactable.View>

                <Interactable.View
                    verticalOnly // 垂直
                    snapPoints={[{ x: 0 }, { x: -200 }]}
                    springPoints={[{
                        x: 0,
                        tension: 6000,
                        damping: 0.5,
                        influenceArea: { left: 0 },
                    }]}
                >
                    <Image
                        source={require('../../images/test1.jpg')}
                        style={styles.testImg}
                    />
                </Interactable.View>

                <Interactable.View
                    horizontalOnly
                    snapPoints={[{ x: 0 }, { x: -200 }]}
                    gravityPoints={[{
                        x: 0,
                        y: 0,
                        strength: 8000,
                        falloff: 40,
                        damping: 0.5,
                    }]}
                >
                    <Image
                        source={require('../../images/test2.jpg')}
                        style={styles.testImg}
                    />
                </Interactable.View>

                <Interactable.View
                    verticalOnly
                    snapPoints={[{ x: 0 }, { y: -200 }]}
                    frictionAreas={[{
                        damping: 0.5,
                        influenceArea: { top: 0 },
                    }]}
                >
                    <Image
                        source={require('../../images/test3.jpg')}
                        style={styles.testImg}
                    />
                </Interactable.View>

                <View>
                    <Text style={styles.text}>十一月</Text>
                    <Interactable.View
                        verticalOnly
                        snapPoints={[{ y: -200 }, { y: 0 }]}
                        alertAreas={[{
                            id: 'myArea',
                            influenceArea: { top: 0 },
                        }]}
                    >
                        <Image
                            source={require('../../images/test1.jpg')}
                            style={styles.testImg}
                        />
                    </Interactable.View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    testImg: {
        width: WIDTH,
        height: HEIGHT,
    },
    text: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
})

export default Interaction
