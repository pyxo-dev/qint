import type { DefaultThemeOptions } from 'vuepress'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  lang: 'en',
  title: 'Qint',
  description: 'Qint, easy i18n for your Quasar app.',

  dest: 'docs/dist',
})
