import type { CallbackPromise, CallbackPromiseReturn } from "$root";

export type IBasisOpt<T extends object> = T | undefined;

export type IViewBasis<T extends object> = {
    kv_init_prevent?: boolean;
    lc_on_mount?: CallbackPromise;
    lc_on_destroy?: CallbackPromise;
} & T;

export type IViewBasisLoad<Tv extends object, Tl extends object> = IViewBasis<Tv> & {
    lc_load: CallbackPromiseReturn<Tl | undefined>;
};