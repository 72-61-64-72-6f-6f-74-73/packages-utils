import type { AppLayoutKey, AppLayoutKeyIOS, AppLayoutKeyWeb, AppLayoutKeyWebPwa, LabelFieldKind, NavigationParamTuple, ThemeLayer } from "$root";

export const fmt_cl = (classes?: string): string => {
    return classes ? classes : ``;
};

export const get_layout = (val: string | false): AppLayoutKey => {
    switch (val) {
        case `ios0`:
        case `ios1`:
        case `webm0`:
        case `webm1`:
        case `web_mobile`:
        case `web_desktop`:
            return val;
        default:
            return `ios0`;
    };
};

export const get_ios_layout = (val: string | false): AppLayoutKeyIOS => {
    switch (val) {
        case `ios0`:
        case `ios1`:
            return val;
        default:
            return `ios0`;
    };
};

export const get_web_layout = (val: string | false): AppLayoutKeyWeb => {
    switch (val) {
        case `web_mobile`:
        case `web_desktop`:
            return val;
        default:
            return `web_desktop`;
    };
};


export const get_web_pwa_layout = (val: string | false): AppLayoutKeyWebPwa => {
    switch (val) {
        case `webm0`:
        case `webm1`:
            return val;
        default:
            return `webm0`;
    };
};

export const parse_layer = (layer?: number, layer_default?: ThemeLayer): ThemeLayer => {
    switch (layer) {
        case 0:
        case 1:
        case 2:
            return layer;
        default:
            return layer_default ? layer_default : 0;
    };
};

export const value_constrain = (regex_charset: RegExp, value: string): string => {
    return value
        .split(``)
        .filter((char) => regex_charset.test(char))
        .join(``);
};

export const value_constrain_textarea = (regex_charset: RegExp, value: string): string => {
    return value
        .replace(/\u00A0/g, ` `)
        .split(/[\n]/)
        .map(line => line
            .split(``)
            .filter((char) => regex_charset.test(char))
            .join(``)
        )
        .join("\n");
};

export const encode_qp = (params_list?: NavigationParamTuple[]): string => {
    const params = (params_list || []).filter(i => i[0] && i[1])
    if (!params.length) return ``;
    return params.map(([k, v], index) => `${index === 0 ? `?` : ``}&${k.trim()}=${encodeURI(v.trim())}`).join(``).trim();
};

export const encode_qp_route = <T extends string>(route: T, params_list?: NavigationParamTuple[]): string => {
    return `${route}/${encode_qp(params_list)}`.replaceAll(`//`, `/`)
};

export const fmt_trellis = (hide_border_t: boolean, hide_border_b: boolean): string => {
    return `${hide_border_t ? `group-first:border-t-0` : `group-first:border-t-line`} ${hide_border_b ? `group-last:border-b-0` : `group-last:border-b-line`}`;
};

export const get_label_classes_kind = (layer: ThemeLayer, label_kind: LabelFieldKind | undefined, hide_active: boolean): string => {
    return `text-layer-${layer}-glyph${label_kind ? `-${label_kind}` : ``} ${hide_active ? `` : `group-active:text-layer-${layer}-glyph${label_kind ? `-${label_kind}_a` : `_a`}`}`
};

export const fmt_textarea_value = (value: string): string => {
    return value.replace(/ /g, `\u00A0`);
};

export const list_assign = (list_curr: string[], list_new: string[]): string[] => {
    return Array.from(
        new Set([...list_curr, ...list_new]),
    ).filter((i) => !!i);
};