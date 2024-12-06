//import * as ngeohash from "ngeohash";
import { decodeBase32, encodeBase32 } from "geohashing";
import type { LocationPoint } from "./types";

export type GeolocationCoordinatesPoint = {
    lat: number;
    lng: number;
}

export const geohash_encode = (opts: {
    lat: string | number;
    lng: string | number;
}): string => {
    const lat = typeof opts.lat === `string` ? parseFloat(opts.lat) : opts.lat;
    const lng = typeof opts.lng === `string` ? parseFloat(opts.lng) : opts.lng;
    const geohash = encodeBase32(lat, lng);
    return geohash;
};

export const geohash_decode = (geohash: string): LocationPoint => {
    const { lat, lng, error: { lat: lat_err, lng: lng_err } } = decodeBase32(geohash);
    return {
        lat,
        lng,
        error: {
            lat: lat_err,
            lng: lng_err
        }
    };
};

export const location_geohash = (point: GeolocationCoordinatesPoint): string => {
    const { lat, lng } = point;
    const res = geohash_encode({ lat, lng });
    return res;
};