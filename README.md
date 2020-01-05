# Mega Nice I18n

A mega nice i18n library.

## Install

`npm install mega-nice-i18n`

## Overview

### Add translations

```typescript
let i18n = new I18n()

i18n.add('en', {
  'LoginForm.login': 'Login',
  'LoginForm.forgotPassword': 'Forget password'
})

i18n.add('de', {
  'LoginForm.login': 'Einloggen',
  'LoginForm.forgotPassword': 'Password vergessen'
})
```

### Translate

```typescript
let translatedEn = i18n.translate('en', 'LoginForm.login')
translatedEn == 'Login'

let translatedDe = i18n.translate('de', 'LoginForm.login')
translatedDe == 'Einloggen'
```

### Combine multiple I18n objects

```typescript
let userI18n = new I18n()

additionalI18n.add('en', {
  'User.deleteAccount': 'Delete account'
}

let appI18n = new I18n()
appI18n.add(userI18n)

// will overwrite any existing keys in that language
appI18n.add('en', {
  'welcome': 'Welcome'
})
```