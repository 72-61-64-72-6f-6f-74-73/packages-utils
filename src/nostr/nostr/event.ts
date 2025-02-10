import { uuidv4, type INostrEventEventSign, type INostrEventUtilNeventEncode } from "$root";
import { schnorr } from "@noble/curves/secp256k1";
import { hexToBytes } from "@noble/hashes/utils";
import { finalizeEvent, getEventHash, nip19, type NostrEvent as NostrToolsEvent } from "nostr-tools";

export const lib_nostr_event_verify = (event: NostrToolsEvent): boolean => {
    const hash = getEventHash(event);
    if (hash !== event.id) return false
    const valid = schnorr.verify(event.sig, hash, event.pubkey);
    return valid;
};

export const lib_nostr_event_sign = (opts: INostrEventEventSign): NostrToolsEvent => {
    return finalizeEvent(opts.event, hexToBytes(opts.secret_key))
};

export const lib_nostr_event_sign_attest = (secret_key: string): NostrToolsEvent => {
    return lib_nostr_event_sign({
        secret_key,
        event: {
            kind: 1,
            created_at: Math.floor(Date.now() / 1000),
            tags: [],
            content: uuidv4(),
        },
    });
};


export const lib_nostr_event_verify_serialized = async (event_serialized: string): Promise<{ public_key: string } | undefined> => {
    try {
        const event = JSON.parse(event_serialized);
        const hash = getEventHash(event);
        if (hash !== event.id) return undefined;
        const valid = schnorr.verify(event.sig, hash, event.pubkey);
        if (valid) return { public_key: String(event.pubkey) };
        return undefined;
    } catch {
        return undefined;
    }
};

export const lib_nostr_nevent_encode = (opts: INostrEventUtilNeventEncode): string => {
    return nip19.neventEncode(opts);
};