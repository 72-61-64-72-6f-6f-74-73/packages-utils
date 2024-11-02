import { hmac } from '@noble/hashes/hmac';
import { sha256 } from '@noble/hashes/sha2';

export const hash_sha256 = (msg: string): Uint8Array => {
    const result = sha256(msg);
    return result;
};

export const hash_sha256_bin = (msg_data: number[]): Uint8Array => {
    const result = sha256
        .create()
        .update(Uint8Array.from(msg_data))
        .digest();
    return result;
};

export const hash_hmac = (key: string, msg: string): Uint8Array => {
    const result = hmac(sha256, key, msg);
    return result;
};

export const hash_hmac_bin = (key_data: number[], msg_data: number[]): Uint8Array => {
    const result = hmac
        .create(sha256, Uint8Array.from(key_data))
        .update(Uint8Array.from(msg_data))
        .digest();
    return result;
};
