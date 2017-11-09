import { PixelRatio } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import theme from '../config/theme'

const navIconSize = (__DEV__ === false && Platform.OS === 'android') ? PixelRatio.getPixelSizeForLayoutSize(40) : 40; // eslint-disable-line
const replaceSuffixPattern = /--(active|big|small|very-big)/g

const iconColor = theme.brandPrimary
const icons = {
    'ios-list-box': [30, iconColor],
    'ios-paw': [30, iconColor],
    'ios-navigate': [30, iconColor],
    'ios-podium': [30, iconColor],
    'ios-color-wand': [30, iconColor],
    'ios-apps': [30, iconColor],
    'logo-google': [30, iconColor],
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
