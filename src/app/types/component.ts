import type { CallbackPromise, CallbackRoute, ElementCallbackMount, ElementCallbackSelect, ElementCallbackValue, ElementCallbackValueBlur, ElementCallbackValueKeydown, FormField, GeometryGlyphDimension, GeometryScreenPosition, GlyphKey, GlyphWeight, ICb, ICbG, ICbGOpt, ICbOpt, IClOpt, IDisabledOpt, IEntryWrap, IGl, IGlOpt, IIdGOpt, IIdOpt, ILabel, ILabelOpt, ILabelTup, ILoadingOpt, ILy, ILyOpt, INavigationRoutePreventRouteNav, LcGeocodeCallback, NavigationParamTuple } from "$root";

export type IToastKind = `simple`;

export type IToast = IClOpt &
    ILabel & IGlOpt & ILyOpt & {
        styles?: IToastKind[];
        position?: GeometryScreenPosition;
    };

export type IGlyph = ICbOpt & IIdOpt & ILyOpt & IClOpt & {
    weight?: GlyphWeight;
    key: GlyphKey;
    dim?: GeometryGlyphDimension;
};

export type IInput<T extends string> = IIdGOpt<T> & IClOpt & ILyOpt & IDisabledOpt & {
    placeholder?: string;
    label?: string;
    hidden?: boolean;
    validate?: RegExp;
    sync?: boolean;
    field?: FormField;
    field_constrain?: boolean;
    callback?: ElementCallbackValue,
    callback_keydown?: ElementCallbackValueKeydown<HTMLInputElement>,
    callback_blur?: ElementCallbackValueBlur<HTMLInputElement>;
    callback_focus?: ElementCallbackValueBlur<HTMLInputElement>;
    callback_mount?: ElementCallbackMount<HTMLInputElement>;
};

export type IInputValue<T extends string> = Omit<IInput<T>, `id` | `sync`>;

export type ISelectOption<T extends string> = IDisabledOpt & {
    value: T;
    label: string;
};

export type ISelect = IIdOpt & IClOpt & ILyOpt & {
    callback?: ElementCallbackSelect;
    sync?: boolean;
    sync_init?: boolean;
    options: { group?: string | true; entries: ISelectOption<string>[] }[];
    show_arrows?: 'l' | 'r';
};

export type ITextArea = IIdOpt & IClOpt & ILyOpt & {
    placeholder?: string;
    label?: string;
    hidden?: boolean;
    validate?: RegExp;
    sync?: true;
    field?: FormField;
    field_constrain?: boolean;
    callback?: ElementCallbackValue,
    callback_keydown?: ElementCallbackValueKeydown<HTMLTextAreaElement>,
    callback_blur?: ElementCallbackValueBlur<HTMLTextAreaElement>;
    callback_focus?: ElementCallbackValueBlur<HTMLTextAreaElement>;
    callback_mount?: ElementCallbackMount<HTMLTextAreaElement>;
};

export type INavigationRoute<T extends string> = {
    route: T | [T, NavigationParamTuple[]];
};

export type IPageToolbar<T extends string> = ICbOpt & {
    header?: IPageHeader<T>;
};

export type IPageHeader<T extends string> = {
    label: string;
    callback_route?: CallbackRoute<T>;
};

export type IGlyphCircle = {
    classes_wrap: string;
    glyph: IGlyph
};

export type ITrellis = ILy &
    IClOpt &
    ITrellisStyles & {
        id?: string;
        view?: string;
        title?: ITrellisTitle;
        description?: ITrellisDescription;
        default_el?: ITrellisDefault;
        list?: (ITrellisKind | undefined)[];
        hide_offset?: true;
    };

export type ITrellisStyles = {
    hide_rounded?: boolean;
    hide_border_top?: boolean;
    hide_border_bottom?: boolean;
    set_title_background?: boolean;
    set_default_background?: boolean;
};

export type ITrellisTitle = ICbOpt &
    IClOpt & {
        mod?: ITrellisBasisOffsetMod,
        value: string | true;
        link?: ICbOpt &
        IClOpt &
        IGlOpt & ILabelOpt;
    };

export type ITrellisDescription = string | true;

export type ITrellisBasisOffsetModKey = 'sm' | 'glyph';
export type ITrellisBasisOffsetMod = ITrellisBasisOffsetModKey | (({ glyph: IGlyph } | { glyph_circle: IGlyphCircle }) & {
    loading?: boolean;
});

export type ITrellisDefault = {
    labels?: ITrellisDefaultLabel[];
    show_title?: boolean;
};

export type ITrellisDefaultLabel = ICbOpt & {
    label: string;
    classes?: string;
};

export type ITrellisKind = (
    | ITrellisKindTouch
    | ITrellisKindInput
    | ITrellisKindSelect
);

export type ITrellisBasis = {
    loading?: boolean;
    hide_active?: boolean;
    hide_field?: boolean;
    offset?: ITrellisBasisOffset;
    full_rounded?: boolean;
};

export type ITrellisBasisOffset = ICbGOpt<MouseEvent> &
    IClOpt & {
        mod?: ITrellisBasisOffsetMod;
        classes?: string;
        hide_space?: boolean;
        hide_offset?: boolean;
    };

export type ITrellisKindDisplay = {
    display?: ITrellisKindDisplayValue;
}
export type ITrellisKindDisplayValue = ICbGOpt<MouseEvent> & ILoadingOpt &
    (ITrellisKindDisplayValueIcon | ILabel);


export type ITrellisKindDisplayValueIcon = {
    icon: {
        classes?: string;
        key: GlyphKey;
    };
};
export type ITrellisKindTouch = ITrellisBasis & {
    touch: ITrellisBasisTouch;
};

export type ITrellisBasisTouch = ICbGOpt<MouseEvent> &
    ILabelTup & ITrellisKindDisplay & {
        end?: ITrellisBasisTouchEnd;
    };

export type ITrellisKindInput = ITrellisBasis & {
    input: ITrellisBasisInput;
};

export type ITrellisBasisInput = {
    basis: IInput<string>;
    line_label?: {
        classes?: string;
        value: string;
    };
    action?: {
        visible: boolean;
        loading?: boolean;
        callback?: CallbackPromise;
        glyph?: IGlyph
    };
};

export type ITrellisKindSelect = ITrellisBasis & {
    select: ITrellisBasisSelect;
};

export type ITrellisBasisSelect = ICbGOpt<MouseEvent> &
    ILabelTup & ITrellisKindDisplay & ILoadingOpt & {
        end?: ITrellisBasisTouchEnd;
        el: ISelect & { value: string; };
    };

export type ITrellisBasisTouchEnd = ICbGOpt<MouseEvent> & IGl;

export type INavBasisPrev = IClOpt & ICbG<
    HTMLLabelElement | null
> & IGlOpt & ILabelOpt & IDisabledOpt & {
    loading?: boolean;
};
export type INavBasisOption = IClOpt & ICbG<
    HTMLLabelElement | null
> & IGlOpt & ILabelOpt & IDisabledOpt & {
    loading?: boolean;
};
export type INavBasis<T extends string> = {
    prev: ICbOpt & ILoadingOpt & INavigationRoute<T> & INavigationRoutePreventRouteNav & {
        label?: string;
        kind?: 'arrow'
    };
    title?: ICbOpt & ILabel;
    option?: INavBasisOption;
};

export type IEntrySelect = ILoadingOpt & {
    wrap: IEntryWrap;
    el: ISelect;
    hide_arrows?: boolean;
};

export type IButtonSimple = ILyOpt & {
    label: string;
    callback: CallbackPromise;
    allow_propogation?: boolean;
};

export type IMapMarkerArea = {
    show_display?: boolean;
    no_drag?: boolean;
    lc_geocode: LcGeocodeCallback;
}

export type ILayoutTrellisLine = ILabelOpt &
    IClOpt & {
        notify?: IClOpt &
        ICb &
        ILabelOpt &
        IGlOpt & {
            glyph_first?: boolean;
        };
    };
