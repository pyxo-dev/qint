/**
 * Miscellaneous helpers.
 */

import type { MetaOptions } from 'quasar/dist/types/meta'
import type { Ref } from 'vue'
import { ref } from 'vue'

/**
 * A reactive object to be used as an app meta holder.
 *
 * @remarks
 *
 * Intended to be used as a central place for manipulating Qint related app meta
 * from different places of the app code.
 *
 * @beta
 */
export const qintMeta: Ref<MetaOptions> = ref({})
