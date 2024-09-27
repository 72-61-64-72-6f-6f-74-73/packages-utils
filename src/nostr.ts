export type NostrRelayInformationDocument = {
    id?: string;
    name?: string;
    description?: string;
    contact?: string;
    supported_nips?: number[];
    software?: string;
    version?: string;
    limitation_payment_required?: string;
    limitation_restricted_writes?: boolean;
}

export type NostrRelayInformationDocumentFormFields = { [K in keyof NostrRelayInformationDocument]: string; };

export const parse_nostr_relay_information_document = (data: any): NostrRelayInformationDocument | undefined => {
    const obj = JSON.parse(data);
    return {
        id: typeof obj.id === 'string' ? obj.id : undefined,
        name: typeof obj.name === 'string' ? obj.name : undefined,
        description: typeof obj.description === 'string' ? obj.description : undefined,
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
    const result: Partial<NostrRelayInformationDocumentFormFields> = {};
    Object.entries(info_doc).forEach(([key, value]: [keyof NostrRelayInformationDocument, string]) => {
        if (typeof value === 'boolean') {
            result[key] = value ? '1' : '0';
        } else if (Array.isArray(value)) {
            result[key] = value.join(', ');
        } else if (value === null || value === undefined) {
            result[key] = '';
        } else {
            result[key] = String(value);
        }
    });
    return result;
};
