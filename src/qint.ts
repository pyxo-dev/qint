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
  const vint = createVint(conf, ssrContext || void 0)

  // The following will make the standalone functions available in the Qint
  // instance. These functions can then be used in a much easier way, as there
  // will be no need to provide the options that are already present in the
  // instance configuration or ssrContext.

  const setAppLangTagFn = async (
    options: Partial<SetAppLangTagOptions> &
      Pick<SetAppLangTagOptions, 'langTag'>
  ) => {
    const { isoName, custom } =
      langTagsConf?.[options.langTag]?.quasarLang || {}
    const fallbackOpts: Omit<SetAppLangTagOptions, 'langTag'> = {
      i18n: vint.i18n,
      importVueI18nMsg: importGeneralMsg,
      importQLang,
      qLangIsoName: isoName,
      customQLang: custom,
      cookieConf,
      ssrContext,
    }
    return await setAppLangTag(Object.assign({}, fallbackOpts, options))
  }

  const setQLangFn = async (
    options: Partial<SetQLangOptions> & Pick<SetQLangOptions, 'langTag'>
  ) => {
    const { isoName, custom } =
      langTagsConf?.[options.langTag]?.quasarLang || {}
    const fallbackOpts: Omit<SetQLangOptions, 'langTag'> = {
      importQLang,
      isoName,
      custom,
    }
    return await setQLang(Object.assign({}, fallbackOpts, options))
  }

  // Build and return the Qint instance.
  return Object.assign({}, vint, {
    conf,
    setAppLangTag: setAppLangTagFn,
    setQLang: setQLangFn,
    meta: qintMeta,
  })
}
