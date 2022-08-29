import { createI18n } from 'vue-i18n'
import { messages } from '../locales/localization'
import * as store from './store'

function getNavigatorLanguage() {
  // Default lang is en, but can it can be changed
  return 'en'
  
  if (store.language()) {
    return store.language()
  }
  const language = (
    navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : (navigator as any).userLanguage ||
        navigator.language ||
        (navigator as any).browserLanguage ||
        'en'
  ).substr(0, 2)
  const allowedLanguages = ['en', 'ru']
  if (allowedLanguages.indexOf(language) > -1) {
    return language
  }
  return 'en'
}

export const i18n = createI18n({
  legacy: false,
  locale: getNavigatorLanguage(),
  messages,
})
