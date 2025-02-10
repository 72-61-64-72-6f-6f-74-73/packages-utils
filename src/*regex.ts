import { FormField } from "$root";

export const util_rxp = {
    product_key: /^[A-Za-z_]+$/,
    product_key_ch: /^[A-Za-z_]$/,
    product_title: /[A-Za-z0-9 ]+$/,
    product_title_ch: /[A-Za-z0-9 ]$/,
    float: /^[+-]?(\d+(\.\d*)?|\.\d+)$/,
    float_ch: /^[0-9\.\+\-]$/,
    float_pos: /^\d+(\.\d+)?$/,
    float_pos_ch: /^[0-9\.]$/,
    description: /^(?:\S+(?:\s+\S+)*)$/,
    description_ch: /[^a-zA-Z0-9.,!?;:'"(){}[]\s\u0600-\u06FF\u0900-\u097F\u0400-\u04FF\u0500-\u052F\u1F00-\u1FFF\u4E00-\u9FFF\uAC00-\uD7AF\u3040-\u309F\u30A0-\u30FF ]+/,
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
    lat: /^[-+]?([1-8]?[0-9](\.\d{1,6})?|90(\.0{1,6})?)$/,
    lat_ch: /^[\d\.\+\-]$/,
    lng: /^[-+]?((1[0-7]?[0-9]|180)(\.\d{1,6})?|(\d{1,2})(\.\d{1,6})?)$/,
    lng_ch: /^[\d\.\+\-]$/,
    alphanum: /[a-zA-Z0-9., ]$/,
    alphanum_ch: /[a-zA-Z0-9.,\s\u0600-\u06FF\u0900-\u097F\u0400-\u04FF\u0500-\u052F\u1F00-\u1FFF\u4E00-\u9FFF\uAC00-\uD7AF\u3040-\u309F\u30A0-\u30FF ]+/,
    price: /^\d+(\.\d+)?$/,
    price_ch: /[0-9.]$/,
    price_cur: /^[A-Za-z]{3}$/,
    price_cur_ch: /[A-Za-z]$/,
    profile_name: /^[a-zA-Z0-9._]{3,30}$/,
    profile_name_ch: /[a-zA-Z0-9._]/,
    trade_product_key: /^(?:[a-zA-Z0-9]+(?:\s+[a-zA-Z0-9]+){0,2})$/,
    trade_product_category: /^(?:[a-zA-Z0-9]+(?:\s+[a-zA-Z0-9]+){0,2})$/,
    currency_symbol: /(?:[A-Za-z]{3,5}\$|\p{Sc})/u,
    currency_marker: /(?:[A-Za-z]{2,4}[^\d\s]+|[^\d\s]{1,3}[A-Za-z]{2,4})/,
    ws_proto: /^(wss:\/\/|ws:\/\/)/,
    quantity_unit: /^(kg|lb|g)$/,
    quantity_unit_ch: /[A-Za-z]$/,
    url_image_upload: /^blob:https:\/\/domain\.tld\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
    url_image_upload_dev: /^blob:http:\/\/localhost:\d+\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
    country_code_a2: /^[A-Za-z]{2}$/,
    addr_primary: /[a-zA-Z0-9., ]$/,
    addr_admin: /[a-zA-Z0-9., ]$/,
    num_int: /^[0-9]$/,
    area_unit: /^(ac|ha|ft2|m2)$/,
    area_unit_ch: /[A-Za-z2]$/,
};

export type FormFieldsKey =
    | `product_title`
    | `product_key`
    | `product_process`
    | `product_description`
    | `price`
    | `price_currency`
    | `quantity_unit`
    | `quantity`
    | `quantity_label`
    | `farm_name`
    | `farm_size`
    | `area`
    | `area_unit`
    | `contact_name`
    | `profile_name`


export const form_fields: Record<FormFieldsKey, FormField> = {
    profile_name: {
        charset: util_rxp.profile_name_ch,
        validate: util_rxp.profile_name,
    },
    product_description: {
        charset: util_rxp.alpha_ch,
        validate: util_rxp.alpha,
    },
    product_key: {
        charset: util_rxp.product_key_ch,
        validate: util_rxp.product_key,
    },
    product_title: {
        charset: util_rxp.product_title_ch,
        validate: util_rxp.product_title,
    },
    product_process: {
        charset: util_rxp.alphanum_ch,
        validate: util_rxp.alphanum,
    },
    price: {
        charset: util_rxp.price_ch,
        validate: util_rxp.price,
    },
    price_currency: {
        charset: util_rxp.price_cur_ch,
        validate: util_rxp.price_cur,
    },
    quantity: {
        charset: util_rxp.num,
        validate: util_rxp.num,
    },
    quantity_unit: {
        charset: util_rxp.quantity_unit_ch,
        validate: util_rxp.quantity_unit,
    },
    quantity_label: {
        charset: util_rxp.alphanum_ch,
        validate: util_rxp.alphanum,
    },
    area: {
        charset: util_rxp.float_ch,
        validate: util_rxp.float,
    },
    area_unit: {
        charset: util_rxp.area_unit_ch,
        validate: util_rxp.area_unit,
    },
    farm_name: {
        charset: util_rxp.alpha_ch,
        validate: util_rxp.alpha,
    },
    farm_size: {
        charset: util_rxp.num_int,
        validate: util_rxp.num_int,
    },
    contact_name: {
        charset: util_rxp.alpha_ch,
        validate: util_rxp.alpha,
    },
};
