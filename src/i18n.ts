export default class I18n {

  // https://stackoverflow.com/questions/28483144/i18n-access-locale-resolution-logic-in-javascript

  translations: { [locale: string ]: { [id: string]: string } } = {}

  translate(locale: string, id: string) {
    if (! (locale in this.translations) && 'en' in this.translations) {
      locale = 'en'
    }

    if (locale in this.translations) {
      let translations = this.translations[locale]

      if (id in translations) {
        return translations[id]
      }
      else {
        return id
      }
    }
  }
}
