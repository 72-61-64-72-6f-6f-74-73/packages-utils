export const regex: Record<string, RegExp> = {
    word_only: /^[a-zA-Z]+$/,
    alpha: /[a-zA-Z ]$/,
    num: /^[0-9]+$/,
    alphanum: /[a-zA-Z0-9., ]$/,
    alphanum_ch: /[a-zA-Z0-9., ]/,
    price: /^\d+(\.\d+)?$/,
    price_ch: /[0-9.]$/,
    profile_name: /^[a-zA-Z0-9._]{3,30}$/,
    profile_name_ch: /[a-zA-Z0-9._]/,
};
