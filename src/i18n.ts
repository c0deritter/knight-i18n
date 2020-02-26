export default class I18n {

  // https://stackoverflow.com/questions/28483144/i18n-access-locale-resolution-logic-in-javascript

  translations: { [locale: string ]: { [id: string]: string|((parameter: any) => string) } } = {}
  locale?: string

  add(localeOrI18n: string|I18n, translations?: { [id: string]: string|((parameter: any) => string) }) {
    if (localeOrI18n instanceof I18n) {
      let i18n = localeOrI18n

      for (let locale in i18n.translations) {
        this.add(locale, i18n.translations[locale])
      }
    }
    else if (typeof localeOrI18n === 'string') {
      let locale = localeOrI18n
      
      if (! (locale in this.translations)) {
        this.translations[locale] = {}
      }
  
      for (let id in translations) {
        if (Object.prototype.hasOwnProperty.call(translations, id)) {
          this.translations[locale][id] = translations[id]
        }
      }  
    }
  }

  translate(id: string|undefined|null, options?: TranslationOptions): string|undefined
  translate(locale: string,            id: string|undefined|null, options?: TranslationOptions): string|undefined  
  translate(id: string|undefined|null, parameter?: any,           options?: TranslationOptions): string|undefined
  translate(locale: string,            id: string|undefined|null, parameter?: any, options?: TranslationOptions): string|undefined

  translate(localeOrId: string, idOrParameterOrOptions?: string|TranslationOptions|any, parameterOrOptions?: any|TranslationOptions, options?: TranslationOptions): string|undefined {
    let locale = this.locale
    let id
    let parameter = undefined

    // the easiest case first
    if (options != undefined) {
      locale = localeOrId
      id = idOrParameterOrOptions
      parameter = parameterOrOptions
    }
    // otherwise we have to fiddle
    else {
      // lets start from the back (3rd parameter)
      if (parameterOrOptions != undefined) {
        // if it contains any of the properties that are expected in an options object it is our options object
        if (typeof parameterOrOptions == 'object' && 'returnUndefinedIfTranslationMissing' in parameterOrOptions) {
          options = parameterOrOptions
        }
        // otherwise it is parameters
        else {
          parameter = parameterOrOptions
        }
      }

      // for the first and second parameter we have the problem that we cannot differentiate either of it
      // the first parameter is on both cases a string
      // the second parameter is in one case a string but in the other anything
      // the best solution is to look if the first parameter is a locale which then should be a key in the translations object
      // it is the most unlikely thing that a locale is used that was not added
      // it is more likely that an id is used that was not added
      // and the second parameter is also about the id
      // thus the first parameter is our best bet
      if (localeOrId in this.translations) {
        locale = localeOrId
        id = idOrParameterOrOptions
      }
      else {
        id = localeOrId

        if (idOrParameterOrOptions != undefined) {
          if (typeof idOrParameterOrOptions == 'object' && 'returnUndefinedIfTranslationMissing' in idOrParameterOrOptions) {
            options = idOrParameterOrOptions
          }
          else {
            parameter = idOrParameterOrOptions
          }
        }
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
    
    if (options && options.returnUndefinedIfTranslationMissing) {
      return undefined
    }
    
    return id
  }
}

export interface TranslationOptions {
  returnUndefinedIfTranslationMissing?: boolean
}