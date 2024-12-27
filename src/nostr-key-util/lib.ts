import { bytesToHex, hexToBytes } from '@noble/hashes/utils';
import { generateSecretKey, getPublicKey, nip19 } from 'nostr-tools';
import type { INostrKeyUtil } from './types';

export class NostrKeyUtil implements INostrKeyUtil {
    private generate_key_bytes(): Uint8Array {
        const secret_key = generateSecretKey();
        return secret_key;
    };

    private get_key_hex(bytes: Uint8Array): string {
        const hex = bytesToHex(bytes);
        return hex;
    };

    private get_key_bytes(hex: string): Uint8Array {
        const bytes = hexToBytes(hex);
        return bytes;
    };

    /**
     * 
     * @returns nostr secret key hex
     */
    public generate_key(): string {
        const bytes = this.generate_key_bytes();
        const hex = this.get_key_hex(bytes);
        return hex;
    };

    /**
     * 
     * @returns nostr public key hex
     */
    public public_key(secret_key_hex: string | undefined): string {
        try {
            if (!secret_key_hex) return ``;
            const bytes = this.get_key_bytes(secret_key_hex);
            const hex = getPublicKey(bytes)
            return hex;
        } catch (e) {
            return ``
        }
    }

    /**
     * 
     * @returns nostr secret key to public key hex
     */
    public publickey_decode(secret_key_hex?: string): string | undefined {
        try {
            if (secret_key_hex) {
                return getPublicKey(this.get_key_bytes(secret_key_hex))
            }
            return undefined;
        } catch (e) {
            return undefined;
        }
    }

    /**
     * 
     * @returns nostr public key npub
     */
    public npub(public_key_hex: string | undefined, fallback_to_hex?: boolean): string {
        if (!public_key_hex) return ``;
        const npub = nip19.npubEncode(public_key_hex);
        return npub ? npub : fallback_to_hex ? public_key_hex : ``;
    }

    /**
     * 
     * @returns public key hex from npub
     */
    public npub_decode(npub: string): string {
        const decode = nip19.decode(npub);
        console.log(`decode `, decode)
        if (decode && decode.type === `npub` && decode.data) return decode.data
        return ``;
    }

    /**
     * 
     * @returns nostr secret key nsec
     */
    public nsec(secret_key_hex: string | undefined): string {
        if (!secret_key_hex) return ``;
        const bytes = this.get_key_bytes(secret_key_hex);
        const nsec = nip19.nsecEncode(bytes);
        return nsec;
    }

    /**
     * 
     * @returns nostr secret key hex from nsec
     */
    public nsec_decode(nsec: string): string | undefined {
        try {
            if (!nsec) return undefined;
            const decode = nip19.decode(nsec);
            if (decode && decode.type === `nsec` && decode.data) return bytesToHex(decode.data);
            return undefined;
        } catch (e) {
            return undefined;
        }
    }

    /**
     * 
     * @returns
     */
    public nevent(event_pointer: nip19.EventPointer, relays: string[]): string {
        return nip19.neventEncode(event_pointer)
    }

    /**
     * 
     * @returns nostr public key nprofile
     */
    public nprofile(public_key_hex: string, relays: string[]): string {
        if (!public_key_hex || !relays.length) return ``;
        return nip19.nprofileEncode({ pubkey: public_key_hex, relays })
    }

    /**
     * 
     * @returns nostr public key nprofile
     */
    public nprofile_decode(nprofile: string): [string, string[]] | undefined {
        if (!nprofile) return undefined;
        const decode = nip19.decode(nprofile);
        if (decode && decode.type === `nprofile` && decode.data && decode.data.pubkey && decode.data.relays) return [decode.data.pubkey, decode.data.relays]
        return undefined;
    }

    /**
     * 
     * @returns
     */
    public secretkey_to_publickey(nsec_or_hex: string): string | undefined {
        if (nsec_or_hex.startsWith(`nsec1`)) {
            return this.nsec_decode(nsec_or_hex);
        } else if (nsec_or_hex.length === 64) {
            return this.publickey_decode(nsec_or_hex)
        }
        return undefined;
    }
};