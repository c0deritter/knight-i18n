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
    it('should return undefined if the translation was not found and the option was set')
    let i18n = new I18n()

    expect(i18n.translate('en', 'b', {returnUndefinedIfTranslationMissing: true})).to.be.undefined

    i18n.add('en', {
      'a': 'A'
    })

    expect(i18n.translate('en', 'b', {returnUndefinedIfTranslationMissing: true})).to.be.undefined

  })
})