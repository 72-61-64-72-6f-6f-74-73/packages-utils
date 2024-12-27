import { NDKEvent } from "@nostr-dev-kit/ndk";

export type INostrRealyUtil = {
    first_tag_value(event: NDKEvent, tag_name: string): string;
    parse_nostr_relay_information_document_fields: (data: any) => NostrRelayInformationDocumentFormFields | undefined;
};

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
