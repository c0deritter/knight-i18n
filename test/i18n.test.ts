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
  })
})