import { expect } from 'chai'
import 'mocha'
import I18n from '../src/i18n'

describe('i18n', function() {
  describe('add', function() {
    it('should add all translations', function() {
      let i18n = new I18n()

      i18n.add('en', {
        'a': '1',
        'b': '2'
      })

      expect(i18n.translate('en', 'a')).to.equal('1')
      expect(i18n.translate('en', 'b')).to.equal('2')
    })

    it('should overwrite translations', function() {
      let i18n = new I18n()

      i18n.add('en', {
        'a': '1',
        'b': '2'
      })

      i18n.add('en', {
        'b': '3'
      })

      expect(i18n.translate('en', 'a')).to.equal('1')
      expect(i18n.translate('en', 'b')).to.equal('3')
    })

    it('should add another I18n', function() {
      let i18n1 = new I18n()

      i18n1.add('en', {
        'a': '1',
        'b': '2'
      })

      let i18n2 = new I18n()

      i18n2.add('en', {
        'b': '3',
        'c': '4'
      })

      i18n1.add(i18n2)

      expect(i18n1.translate('en', 'a')).to.equal('1')
      expect(i18n1.translate('en', 'b')).to.equal('3')
      expect(i18n1.translate('en', 'c')).to.equal('4')
    })
  })

  describe('translate', function() {
    it('should return the set translation string given an id', function() {
      let i18n = new I18n
      i18n.locale = 'en'

      i18n.add('en', {
        'a': 'a-en'
      })
      
      i18n.add('de', {
        'a': 'a-de'
      })

      expect(i18n.translate('a')).to.equal('a-en')
    })

    it('should return the set translation string given a locale and an id', function() {
      let i18n = new I18n
      i18n.locale = 'en'

      i18n.add('en', {
        'a': 'a-en'
      })
      
      i18n.add('de', {
        'a': 'a-de'
      })

      expect(i18n.translate('de', 'a')).to.equal('a-de')
    })

    it('should return the id if it was not found', function() {
      let i18n = new I18n()    
      i18n.locale = 'en'

      expect(i18n.translate('b')).to.equal('b')
      expect(i18n.translate('b', 'parameter')).to.equal('b')
      expect(i18n.translate('de', 'b')).to.equal('de') // if the locale is not present it will be treated as an id
      expect(i18n.translate('de', 'b', 'parameter')).to.equal('de') // if the locale is not present it will be treated as an id

      i18n.add('en', {
        'a': 'a-en'
      })
      
      i18n.add('de', {
        'a': 'a-de'
      })

      expect(i18n.translate('b')).to.equal('b')
      expect(i18n.translate('b', 'parameter')).to.equal('b')
      expect(i18n.translate('de', 'b')).to.equal('b')
      expect(i18n.translate('de', 'b', 'parameter')).to.equal('b')
    })

    it('should return undefined if the translation was not found and the option was set', function() {
      let i18n = new I18n()    
      i18n.locale = 'en'

      expect(i18n.translate('b', { returnUndefinedIfTranslationMissing: true })).to.be.undefined
      expect(i18n.translate('b', 'parameter', { returnUndefinedIfTranslationMissing: true })).to.be.undefined
      expect(i18n.translate('de', 'b', { returnUndefinedIfTranslationMissing: true })).to.be.undefined
      expect(i18n.translate('de', 'b', 'parameter', { returnUndefinedIfTranslationMissing: true })).to.be.undefined

      i18n.add('en', {
        'a': 'a-en'
      })
      
      i18n.add('de', {
        'a': 'a-de'
      })

      expect(i18n.translate('b', { returnUndefinedIfTranslationMissing: true })).to.be.undefined
      expect(i18n.translate('b', 'parameter', { returnUndefinedIfTranslationMissing: true })).to.be.undefined
      expect(i18n.translate('de', 'b', { returnUndefinedIfTranslationMissing: true })).to.be.undefined
      expect(i18n.translate('de', 'b', 'parameter', { returnUndefinedIfTranslationMissing: true })).to.be.undefined
    })

    it('should return the value of the translation function given an id', function() {
      let i18n = new I18n
      i18n.locale = 'en'

      i18n.add('en', {
        'a': (parameter: any) => 'a-en-' + parameter
      })
      
      i18n.add('de', {
        'a': (parameter: any) => 'a-de-' + parameter
      })

      expect(i18n.translate('a')).to.equal('a-en-undefined')
    })

    it('should return the value of the translation function given a locale and an id', function() {
      let i18n = new I18n
      i18n.locale = 'en'

      i18n.add('en', {
        'a': (parameter: any) => 'a-en-' + parameter
      })
      
      i18n.add('de', {
        'a': (parameter: any) => 'a-de-' + parameter
      })

      expect(i18n.translate('de', 'a')).to.equal('a-de-undefined')
    })

    it('should return the value of the translation function given an id and parameter', function() {
      let i18n = new I18n
      i18n.locale = 'en'

      i18n.add('en', {
        'a': (parameter: any) => 'a-en-' + parameter
      })
      
      i18n.add('de', {
        'a': (parameter: any) => 'a-de-' + parameter
      })

      expect(i18n.translate('a', 'parameter')).to.equal('a-en-parameter')
    })

    it('should return the value of the translation function given a locale and an id', function() {
      let i18n = new I18n
      i18n.locale = 'en'

      i18n.add('en', {
        'a': (parameter: any) => 'a-en-' + parameter
      })
      
      i18n.add('de', {
        'a': (parameter: any) => 'a-de-' + parameter
      })

      expect(i18n.translate('de', 'a', 'parameter')).to.equal('a-de-parameter')
    })

    it('should return the id the corresponding function was not found', function() {
      let i18n = new I18n()
      i18n.locale = 'en'  

      expect(i18n.translate('b')).to.equal('b')
      expect(i18n.translate('b', 'parameter')).to.equal('b')
      expect(i18n.translate('de', 'b')).to.equal('de') // if the locale is not present it will be treated as an id
      expect(i18n.translate('de', 'b', 'parameter')).to.equal('de') // if the locale is not present it will be treated as an id

      i18n.add('en', {
        'a': (parameter: any) => 'a-en-' + parameter
      })
      
      i18n.add('de', {
        'a': (parameter: any) => 'a-de-' + parameter
      })

      expect(i18n.translate('b')).to.equal('b')
      expect(i18n.translate('b', 'parameter')).to.equal('b')
      expect(i18n.translate('de', 'b')).to.equal('b')
      expect(i18n.translate('de', 'b', 'parameter')).to.equal('b')
    })

    it('should return undefined if the corresponding function was not found and the option was set', function() {
      let i18n = new I18n()
      i18n.locale = 'en'

      expect(i18n.translate('b', { returnUndefinedIfTranslationMissing: true })).to.be.undefined
      expect(i18n.translate('b', 'parameter', { returnUndefinedIfTranslationMissing: true })).to.be.undefined
      expect(i18n.translate('de', 'b', { returnUndefinedIfTranslationMissing: true })).to.be.undefined
      expect(i18n.translate('de', 'b', 'parameter', { returnUndefinedIfTranslationMissing: true })).to.be.undefined

      i18n.add('en', {
        'a': (parameter: any) => 'a-en-' + parameter
      })
      
      i18n.add('de', {
        'a': (parameter: any) => 'a-de-' + parameter
      })

      expect(i18n.translate('b', { returnUndefinedIfTranslationMissing: true })).to.be.undefined
      expect(i18n.translate('b', 'parameter', { returnUndefinedIfTranslationMissing: true })).to.be.undefined
      expect(i18n.translate('de', 'b', { returnUndefinedIfTranslationMissing: true })).to.be.undefined
      expect(i18n.translate('de', 'b', 'parameter', { returnUndefinedIfTranslationMissing: true })).to.be.undefined
    })
  })
})