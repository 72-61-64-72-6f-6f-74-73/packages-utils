import ngeotags, { type GeoTags, type InputData, type Options } from 'nostr-geotags';
import type { NostrTagLocation } from './types';

const options: Options = {
    geohash: true,
    gps: true,
    city: true,
    iso31662: true,
};

export const fmt_tag_geotags = (opts: NostrTagLocation): GeoTags[] => {
    const data: InputData = {
        lat: opts.lat,
        lon: opts.lng,
        city: opts.city,
        regionName: opts.region,
        countryName: opts.country,
        countryCode: opts.country_code
    };
    return ngeotags(data, options)
};