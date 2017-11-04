import { PixelRatio } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const navIconSize = (__DEV__ === false && Platform.OS === 'android') ? PixelRatio.getPixelSizeForLayoutSize(40) : 40; // eslint-disable-line
const replaceSuffixPattern = /--(active|big|small|very-big)/g
const icons = {
    'ios-list-box': [30, '#ff69b4'],
    'ios-paw': [30, '#ffa07a'],
    'ios-navigate': [30, '#00bfff'],
    'ios-podium': [30, '#00ff7f'],
    'ios-apps': [30, '#ff4500'],
    'ios-search': [30],
    'ios-settings-outline': [30],
    'ios-settings': [30],
    'ios-arrow-round-down': [navIconSize],
    'ios-close': [40],
}

const iconsMap = {}
const iconsLoaded = new Promise((resolve) => {
    Promise.all(
        Object.keys(icons).map(iconName =>
            Ionicons.getImageSource(
                iconName.replace(replaceSuffixPattern, ''),
                icons[iconName][0],
                icons[iconName][1],
            )),
    ).then((sources) => {
        Object.keys(icons)
            .forEach((iconName, idx) => (iconsMap[iconName] = sources[idx]))

        resolve(true)
    })
})

export {
    iconsMap,
    iconsLoaded,
}
