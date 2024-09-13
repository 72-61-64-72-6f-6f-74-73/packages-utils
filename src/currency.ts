export type FiatCurrency = `usd` | `eur`;
export const fiat_currencies: FiatCurrency[] = [`usd`, `eur`] as const;

export type FiatCurrencyGlyphs = `dollar` | `eur`;

export function parse_currency(val?: string): FiatCurrency {
    switch (val) {
        case "usd":
        case "eur":
            return val;
        default:
            return `usd`;
    };
};

export function parse_currency_glyph_key(val?: string): | `currency-${FiatCurrencyGlyphs}` {
    switch (val) {
        case "usd":
            return `currency-dollar`;
        case "eur":
            return `currency-eur`;
        default:
            return `currency-dollar`;
    };
};

export const fmt_currency_tuple = (locale: string, currency: string, amount: number): [string, string, string] => {
    const fmt = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: parse_currency(currency).toUpperCase(),
        minimumFractionDigits: 2,
    });
    const fmt_amt = fmt.format(amount);
    const [a, b] = fmt_amt.split('.');
    return [a.charAt(0), a.slice(1), b.length > 1 ? b : '00'];
};

