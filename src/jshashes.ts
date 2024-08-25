import * as jshashes from "jshashes";

export function hash(str: string): string {
    const hasher = new jshashes.SHA256();
    const hash = hasher.b64(str);
    return String(hash);
};

export function hash_obj(obj: any): string {
    const hasher = new jshashes.SHA256();
    const hash = hasher.b64(JSON.stringify(obj));
    return String(hash);
};

export function hashHmac(l: string, hmac_iv: string): string {
    const hasher = new jshashes.SHA256();
    const hash = hasher.b64_hmac(hmac_iv, l);
    return String(hash);
};
