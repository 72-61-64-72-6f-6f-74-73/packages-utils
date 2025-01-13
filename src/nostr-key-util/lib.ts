import { getPublicKey, nip19 } from 'nostr-tools';
import { lib_nostr_get_key_bytes, lib_nostr_key_generate, lib_nostr_nsec_decode, lib_nostr_nsec_encode } from '../nostr/key';
import type { INostrKeyUtil } from './types';

export class NostrKeyUtil implements INostrKeyUtil {
    /**
     * 
     * @returns nostr secret key hex
     */
    public generate_key(): string {
        return lib_nostr_key_generate();
    };


    /**
     * 
     * @returns nostr public key hex from secret key
     */
    public public_key(secret_key_hex: string | undefined): string {
        try {
            if (!secret_key_hex) return ``;
            const bytes = lib_nostr_get_key_bytes(secret_key_hex);
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
                return getPublicKey(lib_nostr_get_key_bytes(secret_key_hex))
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
    public nsec(secret_key_hex?: string): string | undefined {
        return lib_nostr_nsec_encode(secret_key_hex);
    }

    /**
     * 
     * @returns nostr secret key hex from nsec
     */
    public nsec_decode(nsec: string): string | undefined {
        return lib_nostr_nsec_decode(nsec);
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
