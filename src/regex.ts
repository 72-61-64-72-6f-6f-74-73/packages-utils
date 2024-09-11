export const regex: Record<string, RegExp> = {
    word_only: /^[a-zA-Z]+$/,
    alpha: /[a-zA-Z ]$/,
    num: /^[0-9]+$/,
    alphanum: /[a-zA-Z0-9., ]$/,
    price: /^\d+(\.\d+)?$/,
    price_charset: /[0-9.]$/,
};
