import { schnorr } from '@noble/curves/secp256k1';
import { hexToBytes } from "@noble/hashes/utils";
import { type NDKEvent } from "@nostr-dev-kit/ndk";
import ngeotags, { type GeoTags as NostrGeotagsGeotags, type InputData as NostrGeotagsInputData } from "nostr-geotags";
import { finalizeEvent, getEventHash, nip19, type NostrEvent as NostrToolsEvent } from "nostr-tools";
import { uuidv4 } from "..";
import type { INostrEventUtil, INostrEventUtilEventSign, INostrEventUtilFormatTagsBasisNip99, INostrEventUtilNeventEncode, NostrEventTagClient, NostrEventTagLocation, NostrEventTagMediaUpload, NostrEventTagPrice, NostrEventTagQuantity } from "./types";

export class NostrEventUtil implements INostrEventUtil {
    public first_tag_value = (event: NDKEvent, tag_name: string): string => {
        const tag = event.getMatchingTags(tag_name)[0];
        return tag ? tag[1] : "";
    }

    private fmt_tag_price = (opts: NostrEventTagPrice): string[] => {
        const tag = [`price`, opts.amt, opts.currency, opts.qty_amt, opts.qty_unit];
        return tag;
    };


    private fmt_tag_quantity = (opts: NostrEventTagQuantity): string[] => {
        const tag = [`quantity`, opts.amt, opts.unit];
        if (opts.label) tag.push(opts.label);
        return tag;
    };

    private fmt_tag_location = (opts: NostrEventTagLocation): string[] => {
        const tag = [`location`];
        if (opts.city) tag.push(opts.city);
        if (opts.region_code && !isNaN(parseInt(opts.region_code))) tag.push(opts.region_code);
        else if (opts.region) tag.push(opts.region); //@todo 
        if (opts.country_code) tag.push(opts.country_code);
        return tag;
    };

    private fmt_tag_image = (opts: NostrEventTagMediaUpload): string[] => {
        const tag = [`image`, opts.url];
        if (opts.size) tag.push(`${opts.size.w}x${opts.size.h}`)
        return tag;
    };

    private fmt_tag_client = (opts: NostrEventTagClient, d_tag?: string): string[] => {
        const tag = [`client`, opts.name];
        if (d_tag) tag.push(`31990:${opts.pubkey}:${d_tag}`);
        tag.push(opts.relay);
        return tag;
    };

    private fmt_tag_geotags = (opts: NostrEventTagLocation): NostrGeotagsGeotags[] => {
        const data: NostrGeotagsInputData = {
            lat: opts.lat,
            lon: opts.lng,
            city: opts.city,
            regionName: opts.region,
            countryName: opts.country,
            countryCode: opts.country_code
        };
        return ngeotags(data, {
            geohash: true,
            gps: true,
            city: true,
            iso31662: true,
        });
    };

    public fmt_tags_basis_nip99 = (opts: INostrEventUtilFormatTagsBasisNip99): string[][] => {
        const { d_tag, listing, quantity, price, location } = opts;
        const tags: string[][] = [[`d`, d_tag]];
        if (opts.client) tags.push(this.fmt_tag_client(opts.client, opts.d_tag));
        for (const [k, v] of Object.entries(listing)) if (v) tags.push([k, v]);
        tags.push(this.fmt_tag_quantity(quantity));
        tags.push(this.fmt_tag_price(price));
        tags.push(this.fmt_tag_location(location));
        if (opts.images) for (const image of opts.images) tags.push(this.fmt_tag_image(image));
        tags.push(...this.fmt_tag_geotags(location));
        return tags;
    };

    public nostr_event_sign = (opts: INostrEventUtilEventSign): NostrToolsEvent => {
        return finalizeEvent(opts.event, hexToBytes(opts.secret_key))
    };

    public nostr_event_sign_attest = (secret_key: string): NostrToolsEvent => {
        return this.nostr_event_sign({
            secret_key,
            event: {
                kind: 1,
                created_at: Math.floor(Date.now() / 1000),
                tags: [],
                content: uuidv4(),
            },
        });
    };

    public nostr_event_verify = (event: NostrToolsEvent): boolean => {
        const hash = getEventHash(event);
        if (hash !== event.id) return false
        const valid = schnorr.verify(event.sig, hash, event.pubkey);
        return valid;
    };

    public nostr_event_verify_serialized = (event_serialized: string): boolean => {
        const event = JSON.parse(event_serialized);
        const hash = getEventHash(event);
        if (hash !== event.id) return false
        const valid = schnorr.verify(event.sig, hash, event.pubkey);
        return valid;
    };

    public nevent_encode = (opts: INostrEventUtilNeventEncode): string => {
        return nip19.neventEncode(opts);
    };
}