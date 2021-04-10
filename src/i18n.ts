export default class I18n {

  // https://stackoverflow.com/questions/28483144/i18n-access-locale-resolution-logic-in-javascript

  translations: { [locale: string]: { [id: string]: string|((parameter: any) => string) } } = {}
  locale?: string

  add(locale: string, translations: { [id: string]: string|((parameter: any) => string) }): void
  add(i18n: I18n): void

  add(arg1: any, arg2?: any): void {
    if (arg1 instanceof I18n) {
      let i18n = arg1

      for (let locale in i18n.translations) {
        this.add(locale, i18n.translations[locale])
      }
    }
    else if (typeof arg1 === 'string') {
      let locale = arg1
      let translations = arg2
      
      if (! (locale in this.translations)) {
        this.translations[locale] = {}
      }
  
      for (let id in translations) {
        if (Object.prototype.hasOwnProperty.call(arg2, id)) {
          this.translations[locale][id] = translations[id]
        }
      }  
    }
  }

  translate(id: string): string|undefined
  translate(id: string, parameter?: any): string|undefined
  translate(locale: string, id: string): string|undefined  
  translate(locale: string, id: string, parameter?: any): string|undefined

  translate(arg1: any, arg2?: any, arg3?: any, arg4?: any): string|undefined {
    let locale = this.locale
    let id
    let parameter = undefined

    // the easiest case first
    if (arg4 != undefined) {
      locale = arg1
      id = arg2
      parameter = arg3
    }
    // otherwise we have to fiddle
    else {
      // lets start from the back (3rd parameter)
      if (arg3 != undefined) {
        parameter = arg3
      }

      // for the first and second parameter we have the problem that we cannot differentiate either of it
      // the first parameter is on both cases a string
      // the second parameter is in one case a string but in the other anything
      // the best solution is to look if the first parameter is a locale which then should be a key in the translations object
      // it is the most unlikely thing that a locale is used that was not added
      // it is more likely that an id is used that was not added
      // and the second parameter is also about the id
      // thus the first parameter is our best bet
      if (arg1 in this.translations) {
        locale = arg1
        id = arg2
      }
      else {
        id = arg1
        parameter = arg2
      }
    }

    if (locale == undefined || id == undefined) {
      return undefined
    }

    if (! (locale in this.translations) && 'en' in this.translations) {
      locale = 'en'
    }

    if (locale in this.translations) {
      let translations = this.translations[locale]

      if (id in translations) {
        let t = translations[id]

        if (typeof t == 'function') {
          return t(parameter)
        }
        else {
          return t
        }
      }
    }

    return id
  }
}
