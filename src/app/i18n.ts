import i18n, { type Loader } from "@sveltekit-i18n/base";
import type { Config, Parser } from "@sveltekit-i18n/parser-icu";
import parser from "@sveltekit-i18n/parser-icu";

type LanguageConfig = {
	default?: string;
	value?: string;
};
export const i18n_conf = <T extends string>(opts: {
	default_locale: T;
	translations: Record<T, any>;
	loaders: Loader.LoaderModule[]
}): i18n<Parser.Params<LanguageConfig>> => {
	const { default_locale: initLocale, translations, loaders } = opts;
	const config: Config<LanguageConfig> = {
		initLocale,
		translations,
		parser: parser(),
		loaders,
	};
	return new i18n(config);
};