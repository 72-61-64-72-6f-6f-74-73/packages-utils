import type { NostrRelayInformationDocument, NostrRelayInformationDocumentFormFields } from "./types";

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

export const fmt_tags_basis_nip99 = async (opts: {
    d_tag: string;
    title: string;
    image?: {
        url: string;
        size: string;
    };
    summary?: string;
    location?: string;
    price?: {
        amt: string;
        currency: string;
    };
}): Promise<string[][] | undefined> => {
    try {
        const tags: string[][] = [
            ["d", opts.d_tag],
            ["title", opts.title],
        ];
        if (opts.image) tags.push(["image", opts.image.url, opts.image.size],)
        if (opts.summary) tags.push(["summary", opts.summary])
        if (opts.location) tags.push(["location", opts.location])
        if (opts.price) tags.push(["price", opts.price.amt, opts.price.currency])
        return tags;
    } catch (e) {
        console.log(`(error) fmt_tags_nip99 `, e);
    }
};