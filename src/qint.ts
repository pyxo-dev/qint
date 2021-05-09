import type { Vint } from '@pyxo/vint'
import { createVint } from '@pyxo/vint'
import type { QSsrContext } from '@quasar/app'
import type { QintConf, SetAppLangTagOptions, SetQLangOptions } from '.'
import { qintMeta, setAppLangTag, setQLang } from '.'

/**
 * Qint instance.
 *
 * @beta
 */
export interface Qint extends Vint {
  /** The configuration used when creating the Qint instance. */
  conf: QintConf
  /**
   * Selects a language tag based on the URL mode, a previously set cookie and
   * the user's client preferences.
   */
  getLangTag: Vint['getLangTag']

  /** {@inheritDoc setAppLangTag} */
  setAppLangTag: (
    options: Partial<SetAppLangTagOptions> &
      Pick<SetAppLangTagOptions, 'langTag'>
  ) => ReturnType<typeof setAppLangTag>

  /** {@inheritDoc setQLang} */
  setQLang: (
    options: Partial<SetQLangOptions> & Pick<SetQLangOptions, 'langTag'>
  ) => ReturnType<typeof setQLang>

  /** {@inheritDoc qintMeta} */
  meta: typeof qintMeta

  /** The `ssrContext` used when creating the Qint instance. */
  ssrContext?: QSsrContext | null
}

/**
 * Creates a Qint instance.
 *
 * @beta
 *
 * @param conf - Configuration object.
 * @param ssrContext - Quasar ssrContext.
 * @returns Qint instance.
 */
export function createQint(
  conf: QintConf,
  ssrContext?: QSsrContext | null
): Qint {
  // Destructure the configuration.
  const {
    langTagsConf,
    cookieConf,
    quasarLangConf: { importQLang },
    vueI18nConf: { importGeneralMsg },
  } = conf

  // Create a Vint instance.
  const vint = createVint(conf)

  // The following will make the standalone functions available in the Qint
  // instance. These functions can then be used in a much easier way, as there
  // will be no need to provide the options that are already present in the
  // instance configuration or ssrContext.

  const getLangTagFn = (options?: Parameters<Vint['getLangTag']>[0]) => {
    const req = ssrContext?.req
    const fallbackOpts: Parameters<Vint['getLangTag']>[0] = {
      urlHost: req?.hostname,
      urlPath: req?.path,
      cookies: req?.header('Cookie'),
      clientPreferredLangTags: req?.header('Accept-Language'),
    }
    return vint.getLangTag(Object.assign({}, fallbackOpts, options))
  }

  const setAppLangTagFn = async (
    options: Partial<SetAppLangTagOptions> &
      Pick<SetAppLangTagOptions, 'langTag'>
  ) => {
    const fallbackOpts: Omit<SetAppLangTagOptions, 'langTag'> = {
      i18n: vint.i18n,
      importVueI18nMsg: importGeneralMsg,
      importQLang,
      qLangIsoName: langTagsConf?.[options.langTag]?.quasarLang?.isoName,
      customQLang: langTagsConf?.[options.langTag]?.quasarLang?.custom,
      cookieConf,
      ssrContext,
    }
    return await setAppLangTag(Object.assign({}, fallbackOpts, options))
  }

  const setQLangFn = async (
    options: Partial<SetQLangOptions> & Pick<SetQLangOptions, 'langTag'>
  ) => {
    const fallbackOpts: Omit<SetQLangOptions, 'langTag'> = {
      importQLang,
      isoName: langTagsConf?.[options.langTag]?.quasarLang?.isoName,
      custom: langTagsConf?.[options.langTag]?.quasarLang?.custom,
    }
    return await setQLang(Object.assign({}, fallbackOpts, options))
  }

  // Build and return the Qint instance.
  return Object.assign({}, vint, {
    conf,
    getLangTag: getLangTagFn,
    setAppLangTag: setAppLangTagFn,
    setQLang: setQLangFn,
    meta: qintMeta,
    ssrContext,
  })
}
