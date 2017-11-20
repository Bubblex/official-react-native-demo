import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import { connect } from 'react-redux'
import { getTheme, MKButton, MKColor, MKIconToggle } from 'react-native-material-kit'

const theme = getTheme()

@connect(state => state)
class Materialkit extends Component {
    static navigationOptions = {
        title: 'Materialkit',
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={theme.cardStyle}>
                    <Image source={require('../../images/test2.jpg')} style={[theme.cardImageStyle, { width: '100%' }]} />
                    <Text style={theme.cardTitleStyle}>welcome</Text>
                    <Text style={theme.cardContentStyle}>
                        aaaaaaaaaaaaaaaaaaaaaaa.
                        bbbbbbbbbbbbbbbbbbbbbbbbbbbb.
                    </Text>
                    <View style={theme.cardMenuStyle}>
                        <MKIconToggle>
                            <Text>On</Text>
                        </MKIconToggle>
                    </View>
                    <Text style={theme.cardActionStyle}>my action</Text>
                </View>
                <MKButton
                    cornerRadius={20}
                    shadowRadius={2}
                    shadowOffset={{ width: 0, height: 2 }}
                    shadowOpacity={0.7}
                    shadowColor='black'
                    style={{
                        width: 40,
                        height: 40,
                        backgroundColor: MKColor.Teal,
                    }}
                >
                    <Text
                        pointerEvents='none'
                        style={{
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 20,
                            lineHeight: 40,
                            textAlign: 'center',
                        }}
                    >+</Text>
                </MKButton>

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
})

export default Materialkit
