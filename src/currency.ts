import { util_rxp } from "$root";

export type FiatCurrency = `usd` | `eur`;
export const fiat_currencies: FiatCurrency[] = [`usd`, `eur`] as const;

export const parse_currency = (val?: string): FiatCurrency => {
    const cur = val?.trim().toLowerCase()
    switch (cur) {
        case `usd`:
        case `eur`:
            return cur;
        default:
            return `usd`;
    };
};

export const fmt_price = (locale: string, value: string, currency: string): string => {
    const fmt = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency.toUpperCase(),
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    return fmt.format(parseFloat(value));
};

export const parse_currency_marker = (locale: string, currency: string): string => {
    const cur = parse_currency(currency);
    const fmt = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: cur.toUpperCase(),
        minimumFractionDigits: 2,
    });
    const fmt_basis = fmt.format(1);
    let fmt_res: string | undefined = undefined;
    fmt_res = fmt_basis.match(util_rxp.currency_marker)?.[0];
    if (fmt_res) return fmt_res;
    fmt_res = fmt_basis.match(util_rxp.currency_symbol)?.[0];
    if (fmt_res) return fmt_res;
    fmt_res = fmt_basis.match(new RegExp(cur, `i`))?.[0];
    if (fmt_res) return fmt_res;
    return cur.toUpperCase();
};