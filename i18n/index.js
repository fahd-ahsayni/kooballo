import * as Localization from 'expo-localization';
import { useSelector } from 'react-redux';
import { translations } from './translations';


export const languages = ['en', 'ar', 'fr']; // Add the languages you support here



let currentLanguage = Localization.locale.split('-')[0];

export const getCurrentLanguage = () => currentLanguage;

export const setLanguage = (lang) => {
  if (languages.includes(lang)) {
    currentLanguage = lang;
  }
}

export const t = (key) => {
  const language = useSelector((state) => state.language);
  const keys = key.split('.');
  let translation = translations[language];

  keys.forEach((k) => {
    if (translation) {
      translation = translation[k];
    }
  });

  return translation || '';
}