import type { CallbackPromiseGeneric } from "$root";

export type ElementCallbackValue = CallbackPromiseGeneric<{ value: string; pass: boolean; }>;
export type ElementCallbackValueKeydown<T extends HTMLElement> = CallbackPromiseGeneric<{ key: string; key_s: boolean; el: T }>;
export type ElementCallbackValueBlur<T extends HTMLElement> = CallbackPromiseGeneric<{ el: T }>;
export type ElementCallbackValueFocus<T extends HTMLElement> = CallbackPromiseGeneric<{ el: T }>;
export type ElementCallbackMount<T extends HTMLElement> = CallbackPromiseGeneric<{ el: T }>;
