import { Loader } from '@sveltekit-i18n/base';
import i18n, { type Config } from 'sveltekit-i18n';

type LanguageConfig = {
    default?: string;
    value?: string;
};

export const i18n_conf = <T extends string>(opts: {
    default_locale: T;
    translations: Record<T, any>;
    loaders: Loader.LoaderModule[]
}) => {
    const { default_locale: initLocale, translations, loaders } = opts;
    const config: Config<LanguageConfig> = {
        initLocale,
        translations,
        loaders,
    };
    return new i18n(config);
};
