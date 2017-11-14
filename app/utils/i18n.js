import I18n from 'react-native-i18n'
import { AsyncStorage } from 'react-native'

export function changeLocale(locale) {
    I18n.locale = locale
}

AsyncStorage.getItem('locale', (errs, result) => {
    if (!errs) {
        changeLocale(result)
    }
})

I18n.defaultLocale = 'zh-CN'
I18n.fallbacks = true
I18n.translations = {
    en: {
        greeting: 'Hi!',
    },
    fr: {
        greeting: 'Bonjour!',
    },
    'zh-CN': {
        greeting: '你好!',
    },
}

export default I18n
