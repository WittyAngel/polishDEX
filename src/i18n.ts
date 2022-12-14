import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import { getI18NLanguage } from 'utils/common';
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    lng: getI18NLanguage() as any,
    fallbackLng: ['en', 'pl', 'spa'],
    debug: false,
    interpolation: {
      escapeValue: false, // react escapes by default
    },
    react: {
      useSuspense: false,
    },
    backend: {
      loadPath: `/locales/{{lng}}.json`,
    },
    load: 'all',
  });

export default i18n;
