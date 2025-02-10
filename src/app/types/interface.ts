import type { CallbackPromise, CallbackPromiseGeneric, EntryStyle, GlyphKey, IGlyph, IInput, IInputValue, ITextArea, LayerGlyphBasisKind, LoadingBlades, LoadingDimension, SvelteTransitionConfig, ThemeLayer } from "$root";

export type IDisabled = {
    disabled: boolean | never;
};

export type IDisabledOpt = Partial<IDisabled>;

export type IBasis<T> = {
    basis: T;
};

export type ICb = {
    callback: CallbackPromise | never;
};

export type ICbOpt = Partial<ICb>;

export type ICbG<T> = {
    callback: CallbackPromiseGeneric<T> | never;
};

export type ICbGOpt<T> = Partial<ICbG<T>>;

export type ICl = {
    classes: string | never;
};

export type IClOpt = Partial<ICl>;

export type IClWrap = {
    classes_wr: string | never;
};

export type IClOptWrap = Partial<IClWrap>;

export type IId = {
    id: string | never;
};

export type IIdOpt = Partial<IId>;

export type IGl = {
    glyph: IGlyph | never;
};

export type IGlOpt = Partial<IGl>;

export type IGlyphKey = {
    glyph: GlyphKey
};

export type ILy = {
    layer: ThemeLayer | never;
};

export type ILyOpt = Partial<ILy>;

export type ILableFieldsSwap = {
    toggle: boolean;
    on: IClOpt & {
        value: string;
    },
    off: IClOpt & {
        value: string;
    },
};

export type ILabelSwap = {
    swap: ILableFieldsSwap;
}

export type ILabelTupFields = {
    left?: ILableFields[];
    right?: ILableFields[];
};

export type ILabelTup = {
    label: ILabelTupFields;
};

export type LabelFieldKind = `link` | `on` | `shade`;

export type ILableFields = & {
    classes_wrap?: string
    classes?: string;
    kind?: LayerGlyphBasisKind;
    hide_truncate?: boolean;
    hide_active?: boolean;
} & (
        ({
            value: string;
        } | ILabelSwap)
        | IGl
    );

export type ILabel = {
    label: ILableFields;
};

export type ILabelOpt = Partial<ILabel>;

export type ILoadSymbol = IClOpt & {
    color?: 'white';
    blades?: LoadingBlades;
    dim?: LoadingDimension;
};

export type IIdG<T extends string> = {
    id: T | never;
};

export type FormField = {
    validate: RegExp;
    charset: RegExp;
};

export type IIdGOpt<T extends string> = Partial<IIdG<T>>;

export type IIdWrap = {
    id_wrap: string | never;
};

export type IIdWrapOpt = Partial<IIdWrap>;

export type ILabelValue = {
    label: IClOpt & {
        value: string;
    };
};

export type ILabelDisplay = IIdWrapOpt & IClOpt & ILabelValue & ILyOpt & {
    style?: EntryStyle;
};


export type ILoading = {
    loading: boolean | never;
};

export type ILoadingOpt = Partial<ILoading>;

export type IEntryWrap = IClOpt & IIdOpt & ILyOpt & {
    style?: EntryStyle;
    style_a?: true;
    no_pad?: true;
    fade?: {
        in?: SvelteTransitionConfig;
        out?: SvelteTransitionConfig;
    };
}

export type IEntryLine = ILoadingOpt & {
    wrap?: IEntryWrap;
    el: IInputValue<string>;
    notify_inline?: {
        glyph: GlyphKey | IGlyph;
    };
};

export type IEntryLineIdb = ILoadingOpt & {
    wrap?: IEntryWrap;
    el: IInput<string>;
    notify_inline?: {
        glyph: GlyphKey | IGlyph;
    };
};

export type IEntryMultiLine = {
    wrap?: IEntryWrap;
    el: ITextArea;
    notify_inline?: {
        glyph: GlyphKey | IGlyph;
    };
}

export type IEnvelopeLower = {
    visible: boolean;
    close: CallbackPromise;
    full_cover?: boolean;
    label_close?: string | true;
};

export type IButtonRound = IClOpt & ILoadingOpt & {
    label: string;
    callback: CallbackPromise;
};

export type INavigationRoutePreventRouteNav = {
    prevent_route?: {
        callback: CallbackPromise;
    };
};

export type INavigationRoutePreventRoute = {
    prevent_route: CallbackPromise;
};

export type IImageBlob = IIdOpt & {
    data: Uint8Array | undefined;
    alt?: string;
};

export type IImagePath = IClOpt &
    ICbGOpt<
        MouseEvent & {
            currentTarget: EventTarget & HTMLImageElement;
        }
    > &
    IIdOpt & {
        path?: string;
        alt?: string;
    };

