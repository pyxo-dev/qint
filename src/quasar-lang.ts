/**
 * Quasar Language packs utilities.
 */

import type { QSsrContext } from '@quasar/app'
import type { QuasarLanguage } from 'quasar'
import { Quasar } from 'quasar'
import type { QintImportQLangFn } from '.'

/**
 * Options for `setQLang` function.
 *
 * @beta
 */
export interface SetQLangOptions {
  /** The language tag that corresponds to the Quasar language pack. */
  langTag: string
  /** A function to use for importing Quasar language pack. */
  importQLang: QintImportQLangFn
  /** {@inheritDoc QintLangTagConf.quasarLang.isoName} */
  isoName?: string
  /** {@inheritDoc QintLangTagConf.quasarLang.custom} */
  custom?: boolean
  /** Quasar ssr context. */
  ssrContext?: QSsrContext | null
}

/**
 * Loads and sets the Quasar language pack corresponding to a specified language
 * tag.
 *
 * @beta
 *
 * @param options - Options object.
 * @returns Promise that is fulfilled with the loaded Quasar language pack when
 * the operation is successful.
 */
export async function setQLang(
  options: SetQLangOptions
): Promise<QuasarLanguage | undefined> {
  const { langTag, importQLang, isoName, custom, ssrContext } = options

  // Validate the language tag.
  if (langTag === '') {
    console.error(`
[Qint setQLang] The language tag cannot be empty.
`)
    return
  }

  // The `isoName` corresponding to the `langTag`. Defaults to `langTag`.
  const iso = isoName || langTag

  try {
    // Import Quasar language pack.
    const qLang = await importQLang(iso, custom)

    // Set the language pack.
    Quasar.lang.set(qLang, ssrContext)

    // Return the language pack as a sign of operation success.
    return qLang
  } catch (err) {
    console.error(
      `
[Qint setQLang] Error loading the ${custom ? 'custom ' : ''}"${iso}" language
pack:
`,
      err
    )
  }
}
