export type FiatCurrency = `usd` | `eur`;
export const fiat_currencies: FiatCurrency[] = [`usd`, `eur`] as const;

export type FiatCurrencyGlyphs = `dollar` | `eur`;

export type CurrencyPrice = {
    symbol: string;
    currency: FiatCurrency;
    /**
     * integer value
     */
    val_i: number;
    /**
     * fractional value
     */
    val_f: number;
};

export function parse_currency(val?: string): FiatCurrency {
    const _val = val?.trim().toLowerCase()
    switch (_val) {
        case "usd":
        case "eur":
            return _val;
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

export const parse_currency_price = (locale: string, _currency: string, amount: number): CurrencyPrice => {
    const currency = parse_currency(_currency);
    const fmt = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency.toUpperCase(),
        minimumFractionDigits: 2,
    });
    const fmt_amt = fmt.format(amount);
    const [symbol_val_i, val_f] = fmt_amt.split('.');
    return {
        symbol: symbol_val_i.charAt(0),
        currency,
        val_i: Number(symbol_val_i.replaceAll(`,`, ``).slice(1)),
        val_f: Number(val_f),
    }
};

