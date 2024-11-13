import { regex } from "./regex";

export type FiatCurrency = `usd` | `eur`;
export const fiat_currencies: FiatCurrency[] = [`usd`, `eur`] as const;

export type FiatCurrencyGlyphs = `dollar` | `eur`;

export type CurrencyPriceFmt = [string, FiatCurrency, number, number]

export function parse_currency(val?: string): FiatCurrency {
    const _val = val?.trim().toLowerCase()
    switch (_val) {
        case `usd`:
        case `eur`:
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

export type CurrencyDecimalSeparator = `,` | `.`;

export type CurrencyMetadata = {
    cur: FiatCurrency;
    /**
     * currency symbol
     */
    cur_s: string;
    /**
     * currency marker
     */
    cur_m: string;
    /**
     * true if symbol is at the start
     */
    cur_pos: boolean;
    dec_s: CurrencyDecimalSeparator;
}


export type CurrencyPrice = CurrencyMetadata & {
    /**
     * integer num
     */
    num_i: number;
    /**
     * fractional num
     */
    num_f: number;
    /**
     * integer value
     */
    val_i: string;
    /**
     * fractional value
     */
    val_f: string;
};

export const locale_fractional_decimal = (locale: string): CurrencyDecimalSeparator => {
    const formatter = new Intl.NumberFormat(locale);
    const formatted = formatter.format(1.1);
    return formatted.includes(',') ? `,` : `.`;
};

export const parse_currency_marker = (locale: string, currency: string): string => {
    const cur = parse_currency(currency);
    const fmt = new Intl.NumberFormat(`en-US`, {
        style: 'currency',
        currency: cur.toUpperCase(),
        minimumFractionDigits: 2,
    });
    const fmt_basis = fmt.format(1);
    let fmt_res: string | undefined = undefined;
    fmt_res = fmt_basis.match(regex.currency_marker)?.[0];
    if (fmt_res) return fmt_res;
    fmt_res = fmt_basis.match(regex.currency_symbol)?.[0];
    if (fmt_res) return fmt_res;
    fmt_res = fmt_basis.match(new RegExp(cur, `i`))?.[0];
    if (fmt_res) return fmt_res;
    return cur.toUpperCase();
}

export const parse_currency_price = (locale: string, currency: string, price: number | string): CurrencyPrice | undefined => {
    const num_amt = Math.max(typeof price === `number` ? price : Number(price.replace(/[^0-9.]/g, ``)), 0);
    const cur = parse_currency(currency);
    const fmt = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: cur.toUpperCase(),
        minimumFractionDigits: 2,
    });
    const fmt_amt = fmt.format(num_amt);
    const fmt_num = fmt_amt.replace(/[^0-9.,\s\u200F\u00A0]+/g, ``).trim()
    const cur_s = fmt_amt.match(regex.currency_symbol)?.[0] || fmt_amt.match(new RegExp(cur, `i`))?.[0];
    if (!cur_s) return undefined;
    const cur_m = fmt_amt.match(regex.currency_marker)?.[0] || cur_s;
    const cur_pos = fmt_amt.startsWith(cur_m);
    const dec_s = locale_fractional_decimal(locale);
    const [_val_i, _val_f] = fmt_num.split(dec_s);
    const val_i = _val_i.replace(regex.nbsp_rp, ``).replace(regex.rtlm_rp, ``);
    const val_f = _val_f.replace(regex.nbsp_rp, ``).replace(regex.rtlm_rp, ``)
    const num_i = parseInt(val_i.replace(dec_s === `,` ? regex.periods : regex.commas, ``));
    const num_f = parseInt(val_f);
    return {
        cur,
        cur_s,
        cur_m,
        cur_pos,
        dec_s,
        num_i,
        num_f,
        val_i,
        val_f,
    };
};

export const fmt_currency_price = (currency_price: CurrencyPrice, hide_currency_marker?: boolean): string => {
    const cur_val = hide_currency_marker ? currency_price.cur_s : currency_price.cur_m;
    return `${currency_price.cur_pos ? `${cur_val} ` : ``}${currency_price.val_i}${currency_price.dec_s}${currency_price.val_f}${currency_price.cur_pos ? `` : ` ${cur_val}`}`
};

export const sum_currency_price = (currency_price: CurrencyPrice): number => {
    return currency_price.num_i + (currency_price.num_f / 100);
};

export const parse_currency_price_fmt = (locale: string, _currency: string, amount: number): CurrencyPriceFmt => {
    const currency = parse_currency(_currency);
    const fmt = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency.toUpperCase(),
        minimumFractionDigits: 2,
    });
    const fmt_amt = fmt.format(amount);
    const [symbol_val_i, val_f] = fmt_amt.split('.');
    return [symbol_val_i.charAt(0), currency, Number(symbol_val_i.replaceAll(`,`, ``).slice(1)), Number(val_f)];
};

export const price_fmt = (locale: string, _currency: string): Intl.NumberFormat => {
    const currency = parse_currency(_currency);
    const fmt = new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency.toUpperCase(),
        minimumFractionDigits: 2,
    });
    return fmt;
};


