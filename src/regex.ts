export const regex = {
    nbsp: /[\u00A0]/g,
    nbsp_rp: /[\u00A0]+/g,
    rtlm: /[\u200F]/g,
    rtlm_rp: /[\u200F]+/g,
    commas: /[,]+/g,
    periods: /[.]+/g,
    word_only: /^[a-zA-Z]+$/,
    alpha: /[a-zA-Z ]$/,
    alpha_ch: /[a-zA-Z ]$/,
    num: /^[0-9]+$/,
    alphanum: /[a-zA-Z0-9., ]$/,
    alphanum_ch: /[a-zA-Z0-9., ]/,
    price: /^\d+(\.\d+)?$/,
    price_ch: /[0-9.]$/,
    profile_name: /^[a-zA-Z0-9._]{3,30}$/,
    profile_name_ch: /[a-zA-Z0-9._]/,
    trade_product_key: /^(?:[a-zA-Z0-9]+(?:\s+[a-zA-Z0-9]+){0,2})$/,
    currency_symbol: /(?:[A-Za-z]{3,5}\$|\p{Sc})/u,
    currency_marker: /(?:[A-Za-z]{2,4}[^\d\s]+|[^\d\s]{1,3}[A-Za-z]{2,4})/
    ///(?:[A-Za-z]{2,4}\$|\$(?=[A-Za-z]{2,4}$))/
};
