import { NDKEvent } from "@nostr-dev-kit/ndk";
import { type NostrEvent as NostrToolsEvent, type EventTemplate as NostrToolsEventTemplate } from "nostr-tools";

export type INostrEventUtilFormatTagsBasisNip99 = {
    d_tag: string;
    listing: NostrEventTagListing;
    quantity: NostrEventTagQuantity;
    price: NostrEventTagPrice;
    location: NostrEventTagLocation;
    images?: NostrEventTagMediaUpload[];
    client?: NostrEventTagClient;
};

export type INostrEventUtilNeventEncode = {
    id: string;
    relays: string[];
    author: string;
    kind: number;
};

export type INostrEventUtilEventSign = {
    secret_key: string;
    event: NostrToolsEventTemplate;
}

export type INostrEventUtil = {
    first_tag_value(event: NDKEvent, tag_name: string): string;
    fmt_tags_basis_nip99: (opts: INostrEventUtilFormatTagsBasisNip99) => string[][];
    nostr_event_sign: (opts: INostrEventUtilEventSign) => NostrToolsEvent;
    nostr_event_sign_attest: (secret_key: string) => NostrToolsEvent;
    nostr_event_verify_serialized: (event_serialized: string) => boolean;
    nostr_event_verify: (event: NostrToolsEvent) => boolean;
    nevent_encode: (opts: INostrEventUtilNeventEncode) => string;
};

export type NostrEventTagListing = {
    key: string;
    title: string;
    category: string;
    summary?: string;
    process?: string;
    lot?: string;
    location?: string;
    profile?: string;
    year?: string;
};

export type NostrEventTagPrice = {
    amt: string;
    currency: string;
    qty_amt: string;
    qty_unit: string;
};

export type NostrEventTagQuantity = {
    amt: string;
    unit: string;
    label?: string;
};

export type NostrEventTagLocation = {
    city?: string;
    region?: string;
    region_code?: string;
    country?: string;
    country_code?: string;
    lat: number;
    lng: number;
    geohash: string;
};

export type NostrEventTagMediaUpload = {
    url: string;
    size?: {
        w: number;
        h: number;
    };
};

export type NostrEventTagClient = {
    name: string;
    pubkey: string;
    relay: string;
};
