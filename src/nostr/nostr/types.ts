import { type EventTemplate as NostrToolsEventTemplate } from "nostr-tools";

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

export type INostrEventEventSign = {
    secret_key: string;
    event: NostrToolsEventTemplate;
}