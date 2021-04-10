# Knight I18n by Coderitter

A library for internationalization.

## Install

`npm install knight-i18n`

## Overview

The package consists of the one class `I18n`.

### Add translations

Add translations for different languages.

```typescript
let i18n = new I18n

i18n.add('en', {
  'LoginForm.login': 'Login',
  'LoginForm.forgotPassword': 'Forget password'
})

i18n.add('de', {
  'LoginForm.login': 'Anmelden',
  'LoginForm.forgotPassword': 'Password vergessen'
})
```

### Set the locale

You can set your application wide locale on the `I18n` object.

```typescript
i18n.locale = 'en'
```

### Translate

Now that you have set your application wide locale you can start to translate.

```typescript
i18n.translate('LoginForm.login')
i18n.translate('LoginForm.forgotPassword')
```

You can also determine the locale explicitely.

```typescript
i18n.translate('en', 'LoginForm.login')
i18n.translate('de', 'LoginForm.login')
```

### Using a translation function

If your translation string has placeholders for contextual information you can use functions instead of strings.

```typescript
i18n.add('en', {
  'LoginForm.maxTriesExceeded': (maxTries: number) => `You exceeded ${maxTries} tries`
})

let translated = i18n.translate('LoginForm.maxTriesExceeded', 5)
translated == 'You exceeded 5 tries'
```

You can use any parameter type you like. For example use an object if you have more than one placeholder.

### Automatic fallback to english

If a translation for a certain language is not found but there is an english version, it will fall back to the english version. Otherwise it will return the tranlation id.

```typescript
let translated = i18n.translate('ru', 'LoginForm.login')
// a translation for russian was not found so it fell back to english
translated = 'Login'

translated = i18n.translate('ru', 'LoginForm.forgotPassword')
// a translation for the given id was not found neither in russian nor in english, thus it returned the id
translated = 'LoginForm.forgotPassword'
```

### Add I18n objects

You can also add another `I18n` object. This gives you the possibility to manage the translations for different languages in their own files.

```typescript
/* create the english translations */
let en = new I18n

en.add('en', {
  'User.deleteAccount': 'Delete account'
}

/* create the german translations */
let de = new I18n

en.add('de', {
  'User.deleteAccount': 'Account löschen'
}

/* add both translations to the main I18n object */
let i18n = new I18n()
i18n.add(en)
i18n.add(de)
```
