/**
 * Language tag utilities.
 */

import type { VintI18n, VintImportVueI18nMsgFn } from '@pyxo/vint'
import { loadVueI18nMsg } from '@pyxo/vint'
import type { WintCookieConf } from '@pyxo/wint'
import { setLangTagCookie } from '@pyxo/wint'
import type { QSsrContext } from '@quasar/app'
import type { QintImportQLangFn } from '.'
import { setQLang } from '.'

/**
 * Options for `setAppLangTag` function.
 */
interface SetAppLangTagOptions {
  /** The language tag to set the app to. */
  langTag: string
  /** The vue-i18n composer or legacy instance. */
  i18n: VintI18n
  /** A function to use for importing vue-i18n locale message. */
  importVueI18nMsg: VintImportVueI18nMsgFn
  /** A function to use for importing Quasar language pack. */
  importQLang: QintImportQLangFn
  /** {@inheritDoc QintLangTagConf.quasarLang.isoName} */
  qLangIsoName?: string
  /** {@inheritDoc QintLangTagConf.quasarLang.custom} */
  customQLang?: boolean
  /** {@inheritDoc @pyxo/wint#WintCookieConf} */
  cookieConf?: WintCookieConf
  /** Used to avoid cross-request state pollution in ssr. */
  ssrContext?: QSsrContext | null
}

/**
 * Sets the app to a specified language tag.
 *
 * @remarks
 *
 * This function loads the corresponding Quasar language pack and vue-i18n
 * locale message and sets a cookie (optional).
 *
 * @beta
 *
 * @param options - Options object.
 * @returns Promise that is fulfilled with the provided language tag when the
 * operation is successful.
 */
export async function setAppLangTag(
  options: SetAppLangTagOptions
): Promise<string | undefined> {
  const {
    langTag,
    i18n,
    importVueI18nMsg,
    importQLang,
    qLangIsoName,
    customQLang,
    cookieConf: { useCookie, cookieKey, cookieOptions } = {},
    ssrContext,
  } = options

  // Validate the language tag.
  if (langTag === '') {
    console.error(`
[Qint setAppLangTag] The language tag cannot be empty.
`)
    return
  }

  try {
    // Load the vue-i18n locale message corresponding to the provided language
    // tag.
    const loadVueI18nMsgPromise = loadVueI18nMsg({
      langTag,
      i18n,
      importMsg: importVueI18nMsg,
    })

    // Load and set the Quasar language pack corresponding to the provided
    // language tag.
    const setQLangPromise = setQLang({
      langTag,
      importQLang,
      isoName: qLangIsoName,
      custom: customQLang,
      ssrContext,
    })

    // Await promises (promises are run in parallel).
    await loadVueI18nMsgPromise
    await setQLangPromise

    // If all goes well, set vue-i18n locale.
    if (typeof i18n.locale === 'string') {
      // For legacy vue-i18n instance.
      i18n.locale = langTag
    } else {
      // For composer vue-i18n instance.
      i18n.locale.value = langTag
    }

    // If all goes well, set the language tag cookie.
    if (useCookie) {
      const serverResponse = ssrContext?.res
      setLangTagCookie({ langTag, cookieKey, cookieOptions, serverResponse })
    }

    // Return the language tag as a sign of operation success.
    return langTag
  } catch (err) {
    console.error(
      `
[Qint setAppLangTag] An error occurred while setting the app language tag:
`,
      err
    )
  }
}
