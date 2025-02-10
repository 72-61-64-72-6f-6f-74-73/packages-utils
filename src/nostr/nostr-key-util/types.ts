export type INostrKeyUtil = {
    generate_key(): string;
    public_key(secret_key_hex: string | undefined): string;
    npub(public_key_hex: string | undefined): string;
    npub_decode(npub: string): string;
    nsec(secret_key_hex: string | undefined): string | undefined;
    nsec_decode(nsec: string): string | undefined;
    nprofile(public_key_hex: string, relays: string[]): string;
    nprofile_decode(nprofile: string): [string, string[]] | undefined;
    secretkey_to_publickey(nsec_or_hex: string): string | undefined;
};
