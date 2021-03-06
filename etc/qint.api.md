## API Report File for "@pyxo/qint"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import type { MetaOptions } from 'quasar/dist/types/meta';
import type { QSsrContext } from '@quasar/app';
import type { QuasarLanguage } from 'quasar';
import type { Ref } from 'vue';
import type { Vint } from '@pyxo/vint';
import type { VintConf } from '@pyxo/vint';
import type { VintI18n } from '@pyxo/vint';
import type { VintImportVueI18nMsgFn } from '@pyxo/vint';
import type { WintCookieConf } from '@pyxo/wint';
import type { WintLangTagConf } from '@pyxo/wint';

// @beta
export function createQint(conf: QintConf, ssrContext?: QSsrContext | null): Qint;

// @beta
export interface Qint extends Vint {
    conf: QintConf;
    meta: typeof qintMeta;
    setAppLangTag: (options: Partial<SetAppLangTagOptions> & Pick<SetAppLangTagOptions, 'langTag'>) => ReturnType<typeof setAppLangTag>;
    setQLang: (options: Partial<SetQLangOptions> & Pick<SetQLangOptions, 'langTag'>) => ReturnType<typeof setQLang>;
}

// @beta
export interface QintConf extends Omit<VintConf, 'langTagsConf'> {
    langTagsConf?: QintLangTagsConf;
    quasarLangConf: QintQuasarLangConf;
}

// @beta
export type QintImportQLangFn = (isoName: string, custom?: boolean) => Promise<QuasarLanguage>;

// @beta
export interface QintLangTagConf extends WintLangTagConf {
    quasarLang?: {
        isoName?: string;
        custom?: boolean;
    };
}

// @beta
export interface QintLangTagsConf {
    // (undocumented)
    [langTag: string]: QintLangTagConf;
}

// @beta
export const qintMeta: Ref<MetaOptions>;

// @beta
export interface QintQuasarLangConf {
    importQLang: QintImportQLangFn;
}

// @beta
export function setAppLangTag(options: SetAppLangTagOptions): Promise<string | undefined>;

// @beta
export interface SetAppLangTagOptions {
    cookieConf?: WintCookieConf;
    customQLang?: boolean;
    i18n: VintI18n;
    importQLang: QintImportQLangFn;
    importVueI18nMsg: VintImportVueI18nMsgFn;
    langTag: string;
    qLangIsoName?: string;
    ssrContext?: QSsrContext | null;
}

// @beta
export function setQLang(options: SetQLangOptions): Promise<QuasarLanguage | undefined>;

// @beta
export interface SetQLangOptions {
    custom?: boolean;
    importQLang: QintImportQLangFn;
    isoName?: string;
    langTag: string;
    ssrContext?: QSsrContext | null;
}


```
