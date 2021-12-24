import Vue from 'vue';
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

const defaultLang = 'zh_CN';
const localeCookieKey = 'lang';
const messages = {
  'zh_CN': require('@/locale/zh_CN.json'),
  'en_US': require('@/locale/en_US.json')
}

export const setLanguage = (lang) => {
  // validate
  if (!messages[lang]) {
    throw new Error('Set language error! Invalid language option.')
  }

  Vue.$i18n.locale = lang;
  // set cookie
  Vue.$cookies.set(localeCookieKey, lang);
};

const i18n = () => {
  const cookieLang = Vue.$cookies.get(localeCookieKey)
  if (!cookieLang || cookieLang === "") {
    Vue.$cookies.set(localeCookieKey, defaultLang);
  }

  return new VueI18n({
    locale: cookieLang || defaultLang,
    messages: messages,
  })
}

export default i18n;

