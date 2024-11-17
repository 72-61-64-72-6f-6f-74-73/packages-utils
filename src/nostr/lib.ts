import { schnorr } from '@noble/curves/secp256k1';
import { hexToBytes } from '@noble/hashes/utils';
import { type EventTemplate, finalizeEvent, getEventHash, type NostrEvent } from "nostr-tools";
import { uuidv4 } from '../uuid';
import { fmt_tag_geotags } from './geotags';
import type { NostrRelayInformationDocument, NostrRelayInformationDocumentFormFields, NostrTagListing, NostrTagLocation, NostrTagPrice, NostrTagQuantity } from "./types";

export const parse_nostr_relay_information_document = (data: any): NostrRelayInformationDocument | undefined => {
    const obj = JSON.parse(data);
    return {
        id: typeof obj.id === 'string' ? obj.id : undefined,
        name: typeof obj.name === 'string' ? obj.name : undefined,
        description: typeof obj.description === 'string' ? obj.description : undefined,
        pubkey: typeof obj.pubkey === 'string' ? obj.pubkey : undefined,
        contact: typeof obj.contact === 'string' ? obj.contact : undefined,
        supported_nips: Array.isArray(obj.supported_nips) && obj.supported_nips.every((nip: any) => typeof nip === 'number')
            ? obj.supported_nips
            : undefined,
        software: typeof obj.software === 'string' ? obj.software : undefined,
        version: typeof obj.version === 'string' ? obj.version : undefined,
        limitation_payment_required: obj.limitation && typeof obj.limitation === 'object' && typeof obj.limitation.payment_required === 'string' ? obj.limitation.payment_required : undefined,
        limitation_restricted_writes: obj.limitation && typeof obj.limitation === 'object' && typeof obj.limitation.restricted_writes === 'boolean' ? obj.limitation.restricted_writes : undefined,
    };
};

export const parse_nostr_relay_information_document_fields = (data: any): NostrRelayInformationDocumentFormFields | undefined => {
    const info_doc = parse_nostr_relay_information_document(data);
    if (!info_doc) return;
    const result: Partial<NostrRelayInformationDocumentFormFields> = {};
    Object.entries(info_doc).forEach(([key, value]) => {
        if (typeof value === 'boolean') {
            result[key as keyof NostrRelayInformationDocument] = value ? '1' : '0';
        } else if (Array.isArray(value)) {
            result[key as keyof NostrRelayInformationDocument] = value.join(', ');
        } else if (value === null || value === undefined) {
            result[key as keyof NostrRelayInformationDocument] = '';
        } else {
            result[key as keyof NostrRelayInformationDocument] = String(value);
        }
    });
    return result;
};


export const fmt_tag_price = (opts: NostrTagPrice): string[] => {
    const tag = [`price`, opts.amt, opts.currency, opts.qty_amt, opts.qty_unit];
    return tag;
};


export const fmt_tag_quantity = (opts: NostrTagQuantity): string[] => {
    const tag = [`quantity`, opts.amt, opts.unit];
    if (opts.label) tag.push(opts.label);
    return tag;
};


export const fmt_tag_location = (opts: NostrTagLocation): string[] => {
    const tag = [`location`];
    if (opts.city) tag.push(opts.city);
    if (opts.region_code) tag.push(opts.region_code);
    if (opts.country_code) tag.push(opts.country_code);
    return tag;
};

type NostrTagMediaUpload = {
    url: string;
    size?: {
        w: number;
        h: number;
    };
};
export const fmt_tag_image = (opts: NostrTagMediaUpload): string[] => {
    const tag = ["image", opts.url];
    if (opts.size) tag.push(`${opts.size.w}x${opts.size.h}`)
    return tag;
};

export const fmt_tags_basis_nip99 = async (opts: {
    d_tag: string;
    listing: NostrTagListing;
    quantity: NostrTagQuantity;
    price: NostrTagPrice;
    location: NostrTagLocation;
    images?: NostrTagMediaUpload[];
}): Promise<string[][] | undefined> => {
    try {
        const tags: string[][] = [
            [`d`, opts.d_tag],
        ];
        for (const [k, v] of Object.entries(opts.listing)) if (v) tags.push([k, v]);
        tags.push(fmt_tag_quantity(opts.quantity));
        tags.push(fmt_tag_price(opts.price));
        tags.push(fmt_tag_location(opts.location));
        if (opts.images) for (const image of opts.images) tags.push(fmt_tag_image(image));
        tags.push(...fmt_tag_geotags(opts.location))
        return tags;
    } catch (e) {
        console.log(`(error) fmt_tags_nip99 `, e);
    }
};

export const nostr_event_sign = (opts: {
    secret_key: string;
    event: EventTemplate;
}): NostrEvent => {
    return finalizeEvent(opts.event, hexToBytes(opts.secret_key))
};

export const nostr_event_sign_attest = (secret_key: string): NostrEvent => {
    return nostr_event_sign({
        secret_key,
        event: {
            kind: 1,
            created_at: Math.floor(Date.now() / 1000),
            tags: [],
            content: uuidv4(),
        },
    });
};


export const nostr_event_verify = async (event: NostrEvent): Promise<boolean> => {
    try {
        const hash = getEventHash(event);
        console.log(`hash `, hash)
        if (hash !== event.id) return false
        const valid = schnorr.verify(event.sig, hash, event.pubkey);
        return valid;
    } catch {
        return false;
    }
};

export const nostr_event_verify_serialized = async (event_serialized: string): Promise<boolean> => {
    try {
        const event = JSON.parse(event_serialized);
        const hash = getEventHash(event);
        console.log(`hash `, hash)
        if (hash !== event.id) return false
        const valid = schnorr.verify(event.sig, hash, event.pubkey);
        return valid;
    } catch {
        return false;
    }
};