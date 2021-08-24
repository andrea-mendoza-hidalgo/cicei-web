import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { es, en } from './locales';

const options = {
  debug: false,

  resources: {
    'es-ES': {
      shared: es.shared,
      pages: es.pages,
      project: es.project,
      publication: es.publication,
      researchers: es.researchers,
      news: es.news
    },
    'en-US': {
      shared: en.shared,
      pages: en.pages,
      project: en.project,
      publication: en.publication,
      researchers: en.researchers,
      news: en.news
    }
  },

  fallbackLng: 'es-ES',

  ns: ['shared', 'pages', 'project', 'publication'],

  defaultNS: 'shared',

  react: {
    wait: true
  }
};

i18n.use(initReactI18next).use(LanguageDetector).init(options);

export default i18n;
