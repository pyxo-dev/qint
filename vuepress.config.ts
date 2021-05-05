import type { DefaultThemeOptions, ViteBundlerOptions } from 'vuepress-vite'
import { defineUserConfig } from 'vuepress-vite'

export default defineUserConfig<DefaultThemeOptions, ViteBundlerOptions>({
  lang: 'en',
  title: 'Qint',
  description: 'Qint, easy i18n for your Quasar app.',

  dest: 'docs/dist',

  bundler: '@vuepress/vite',
  bundlerConfig: {
    viteOptions: {
      build: {
        emptyOutDir: true,
      },
    },
  },
})
