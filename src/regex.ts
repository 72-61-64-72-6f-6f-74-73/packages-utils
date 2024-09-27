export const regex: Record<string, RegExp> = {
    word_only: /^[a-zA-Z]+$/,
    alpha: /[a-zA-Z ]$/,
    num: /^[0-9]+$/,
    alphanum: /[a-zA-Z0-9., ]$/,
    price: /^\d+(\.\d+)?$/,
    price_charset: /[0-9.]$/,
    profile_name: /^[a-zA-Z0-9._]{1,30}$/,
    profile_name_char: /[a-zA-Z0-9._]/,
};
