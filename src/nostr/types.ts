export type NostrRelayInformationDocument = {
    id?: string;
    name?: string;
    description?: string;
    pubkey?: string;
    contact?: string;
    supported_nips?: number[];
    software?: string;
    version?: string;
    limitation_payment_required?: string;
    limitation_restricted_writes?: boolean;
}

export type NostrRelayInformationDocumentFormFields = { [K in keyof NostrRelayInformationDocument]: string; };

export type NostrTagListing = {
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

export type NostrTagPrice = {
    amt: string;
    currency: string;
    qty_amt: string;
    qty_unit: string;
};

export type NostrTagQuantity = {
    amt: string;
    unit: string;
    label?: string;
};

export type NostrTagLocation = {
    city?: string;
    region?: string;
    region_code?: string;
    country?: string;
    country_code?: string;
    lat: number;
    lng: number;
    geohash: string;
};

export type NostrTagMediaUpload = {
    url: string;
    size?: {
        w: number;
        h: number;
    };
};

export type NostrTagClient = {
    name: string;
    pubkey: string;
    relay: string;
};

export type NostrMetadataTmp = {
    name?: string;
    display_name?: string;
    about?: string;
    website?: string;
    picture?: string;
    banner?: string;
    nip05?: string;
    lud06?: string;
    lud16?: string;
    bot?: boolean;
};