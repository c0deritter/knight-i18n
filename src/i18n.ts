export default class I18n {

  // https://stackoverflow.com/questions/28483144/i18n-access-locale-resolution-logic-in-javascript

  translations: { [locale: string ]: { [id: string]: string } } = {}

  add(locale: string, translations: { [id: string]: string }) {
    if (! (locale in this.translations)) {
      this.translations[locale] = {}
    }

    for (let id in translations) {
      if (Object.prototype.hasOwnProperty.call(translations, id)) {
        this.translations[locale][id] = translations[id]
      }
    }
  }

  merge(i18n: I18n) {
    for (let locale in i18n.translations) {
      this.add(locale, i18n.translations[locale])
    }
  }

  translate(locale: string, id: string): string {
    if (! (locale in this.translations) && 'en' in this.translations) {
      locale = 'en'
    }

    if (locale in this.translations) {
      let translations = this.translations[locale]

      if (id in translations) {
        return translations[id]
      }
    }
    
    return id
  }
}
