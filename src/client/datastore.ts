import type { ErrorMessage, ResultObj, ResultPass, ResultsList } from "..";

export const ds_map = {
    key_nostr: `nostr:publickey`,
    role: `config:role`,
    eula: `eula:date`
};

export const ds_map_param = {
    radroots_profile: (public_key: string) => `radroots:profile:${public_key}`
};

export type IClientDatastoreSetResolve = ResultPass | ErrorMessage<string>;
export type IClientDatastoreGetResolve = ResultObj<string> | ErrorMessage<string>;
export type IClientDatastoreSetPResolve = ResultPass | ErrorMessage<string>;
export type IClientDatastoreGetPResolve = ResultObj<string> | ErrorMessage<string>;
export type IClientDatastoreKeysResolve = ResultsList<string> | ErrorMessage<string>;
export type IClientDatastoreEntriesResolve = ResultsList<[string, unknown]> | ErrorMessage<string>;
export type IClientDatastoreRemoveResolve = ResultPass | ErrorMessage<string>;

export type IClientDatastore = {
    init(): Promise<void>;
    set(key: keyof typeof ds_map, value: string): Promise<IClientDatastoreSetResolve>;
    get(key: keyof typeof ds_map): Promise<IClientDatastoreGetResolve>;
    setp(key: keyof typeof ds_map_param, key_param: string, value: string): Promise<IClientDatastoreSetPResolve>;
    getp(key: keyof typeof ds_map_param, key_param: string): Promise<IClientDatastoreGetPResolve>;
    keys(): Promise<IClientDatastoreKeysResolve>;
    entries(): Promise<IClientDatastoreEntriesResolve>
    remove(key: string): Promise<IClientDatastoreRemoveResolve>;
};