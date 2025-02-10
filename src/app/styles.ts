import type { AppLayoutKey, GeometryGlyphDimension, IToastKind, LoadingDimension } from "$root";

export const glyph_style_map: Map<GeometryGlyphDimension, { gl_1: number; dim_1?: number; }> = new Map([
    ["xs--", { gl_1: 12 }],
    ["xs-", { gl_1: 12, dim_1: 17 }],
    ["xs", { gl_1: 15, dim_1: 18 }],
    ["xs+", { gl_1: 18, dim_1: 20 }],
    ["sm-", { gl_1: 19, dim_1: 22 }],
    ["sm", { gl_1: 20, dim_1: 24 }],
    ["sm+", { gl_1: 21 }],
    ["md-", { gl_1: 23 }],
    ["md", { gl_1: 24 }],
    ["md+", { gl_1: 26 }],
    ["lg-", { gl_1: 27 }],
    ["lg", { gl_1: 28 }],
    ["xl", { gl_1: 30 }],
    ["xl+", { gl_1: 40 }],
]);

export const loading_style_map: Map<LoadingDimension, { dim_1: number; gl_2: number }> = new Map([
    ["glyph-send-button", { dim_1: 20, gl_2: 20 }],
    ["xs", { dim_1: 12, gl_2: 12 }],
    ["sm", { dim_1: 16, gl_2: 16 }],
    ["md", { dim_1: 20, gl_2: 20 }],
    ["lg", { dim_1: 28, gl_2: 28 }],
    ["xl", { dim_1: 36, gl_2: 36 }],
]);

export const toast_layout_map: Map<AppLayoutKey, string> = new Map([
    [`ios0`, `pt-8`],
    [`ios1`, `pt-16`],
    [`webm0`, `pt-8`],
    [`webm1`, `pt-16`],
]);

export const toast_style_map: Map<IToastKind, { inner: string; outer: string }> = new Map([
    [
        `simple`,
        {
            inner: `justify-center`,
            outer: `min-h-toast_min w-full px-4 rounded-2xl shadow-sm`,
        },
    ],
]);