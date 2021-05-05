/**
 * Miscellaneous utils for use with the composition API.
 */

import type { QSsrContext } from '@quasar/app'
import { inject, InjectionKey } from 'vue'

/**
 * A symbol that can be used as an injection key for Quasar `ssrContext`.
 *
 * @beta
 */
export const ssrContextInjKey: InjectionKey<QSsrContext> = Symbol(
  'ssrContext injection key'
)

/**
 * Gives access to a previously provided Quasar `ssrContext`.
 *
 * @beta
 *
 * @returns A Quasar `ssrContext` or `undefined` if no `ssrContext` was provided.
 */
export function useSsrContext(): QSsrContext | undefined {
  const ssrContext = inject(ssrContextInjKey)
  if (ssrContext === void 0) {
    console.error('[Qint useSsrContext] No ssrContext was provided.')
  }
  return ssrContext
}
