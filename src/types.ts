/**
 * Misc types used by Qint.
 */

import type { VintConf } from '@pyxo/vint'
import type { WintLangTagConf } from '@pyxo/wint'
import type { QuasarLanguage } from 'quasar'

/**
 * Configuration for a language tag.
 *
 * @beta
 */
export interface QintLangTagConf extends WintLangTagConf {
  /** Quasar language options. */
  quasarLang?: {
    /**
     * The `isoName` of the Quasar language corresponding to the language tag.
     *
     * @remarks
     *
     * Needed when it is different from the language tag. e.g. using `en`
     * language tag with the `en-US` Quasar language pack.
     */
    isoName?: string
    /**
     * Whether the Quasar language pack is a custom pack or supplied by Quasar.
     *
     * @defaultValue `undefined` (treated as `false`).
     */
    custom?: boolean
  }
}

/**
 * App language tags configuration.
 *
 * @beta
 */
export interface QintLangTagsConf {
  [langTag: string]: QintLangTagConf
}

/**
 * A function to use for importing a Quasar language pack.
 *
 * @beta
 *
 * @param isoName - The `isoName` of the Quasar language pack to import.
 * @param custom - Whether the Quasar language pack is a custom pack or supplied
 * by Quasar.
 * @returns Promise that should resolve to a Quasar language pack.
 */
export type QintImportQLangFn = (
  isoName: string,
  custom?: boolean
) => Promise<QuasarLanguage>

/**
 * Quasar language related configurations.
 *
 * @beta
 */
export interface QintQuasarLangConf {
  /** {@inheritDoc QintImportQLangFn} */
  importQLang: QintImportQLangFn
}

/**
 * Qint configuration.
 *
 * @beta
 */
export interface QintConf extends Omit<VintConf, 'langTagsConf'> {
  /** {@inheritDoc QintLangTagsConf} */
  langTagsConf?: QintLangTagsConf
  /** {@inheritDoc QintQuasarLangConf} */
  quasarLangConf: QintQuasarLangConf
}

/** Add Quasar ssr related types. */
declare module 'quasar/dist/types/feature-flag' {
  interface QuasarFeatureFlags {
    ssr: true
  }
}
