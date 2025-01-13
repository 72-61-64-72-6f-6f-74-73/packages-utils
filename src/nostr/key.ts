import { bytesToHex, hexToBytes } from "@noble/hashes/utils";
import { generateSecretKey, getPublicKey, nip19 } from "nostr-tools";

export const lib_nostr_get_key_bytes = (hex: string): Uint8Array => {
    return hexToBytes(hex);
};

export const lib_nostr_get_key_hex = (bytes: Uint8Array): string => {
    return bytesToHex(bytes);
};

export const lib_nostr_key_generate = (): string => {
    const bytes = generateSecretKey();
    return lib_nostr_get_key_hex(bytes);
};

export const lib_nostr_nsec_encode = (secret_key_hex?: string): string | undefined => {
    if (!secret_key_hex) return undefined;
    const bytes = lib_nostr_get_key_bytes(secret_key_hex);
    return nip19.nsecEncode(bytes);
};

export const lib_nostr_nsec_decode = (nsec?: string): string | undefined => {
    if (!nsec) return undefined;
    const decode = nip19.decode(nsec);
    if (decode && decode.type === `nsec` && decode.data) return bytesToHex(decode.data);
    return undefined;
};


export const lib_nostr_public_key = (secret_key_hex: string): string => {
    const bytes = lib_nostr_get_key_bytes(secret_key_hex);
    return getPublicKey(bytes);
};

export const lib_nostr_secret_key_validate = (secret_key: string): string | undefined => {
    const is_valid_hex = lib_nostr_public_key(secret_key);
    if (is_valid_hex) return secret_key;
    const is_valid_nsec = lib_nostr_nsec_decode(secret_key);
    if (is_valid_nsec) return is_valid_nsec;
    return undefined;
};