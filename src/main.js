import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import 'vuetify/styles'
// import { createVuetify } from 'vuetify'
import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import ar from './locales/ar.json';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const vuetify = createVuetify({
    components,
    directives,
    icons:{
      defaultSet: 'mdi',

    },
  })
  const storedLanguage = localStorage.getItem('lang') || 'en';
  const i18n = createI18n({
    locale: storedLanguage, // default language
    fallbackLocale: 'en', // fallback if the key is missing
    messages: {
      en, // English translations
      ar, // French translations
    },
  });

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(i18n)
app.mount('#app')

