import { lib_nostr_event_sign, lib_nostr_event_sign_attest, lib_nostr_event_verify, lib_nostr_event_verify_serialized, lib_nostr_nevent_encode, type INostrEventEventSign, type INostrEventUtil, type INostrEventUtilFormatTagsBasisNip99, type INostrEventUtilNeventEncode, type NostrEventTagClient, type NostrEventTagLocation, type NostrEventTagMediaUpload, type NostrEventTagPrice, type NostrEventTagQuantity } from "$root";
import { type NDKEvent } from "@nostr-dev-kit/ndk";
import ngeotags, { type GeoTags as NostrGeotagsGeotags, type InputData as NostrGeotagsInputData } from "nostr-geotags";
import { type NostrEvent as NostrToolsEvent } from "nostr-tools";

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

    public nostr_event_sign = (opts: INostrEventEventSign): NostrToolsEvent => {
        return lib_nostr_event_sign(opts);
    };

    public nostr_event_sign_attest = (secret_key: string): NostrToolsEvent => {
        return lib_nostr_event_sign_attest(secret_key);
    };

    public nostr_event_verify = (event: NostrToolsEvent): boolean => {
        return lib_nostr_event_verify(event);
    };

    public nostr_event_verify_serialized = (event_serialized: string): boolean => {
        const result = lib_nostr_event_verify_serialized(event_serialized);
        return !!result;
    };

    public nevent_encode = (opts: INostrEventUtilNeventEncode): string => {
        return lib_nostr_nevent_encode(opts);
    };
}