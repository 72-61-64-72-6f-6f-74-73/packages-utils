import * as ngeohash from "ngeohash";
import type { LocationPoint } from "./types";

export type GeolocationCoordinatesPoint = {
    lat: number;
    lng: number;
}

export const geohash_encode = (opts: {
    lat: string | number;
    lng: string | number;
}): string => {
    const geohash = ngeohash.encode(opts.lat, opts.lng);
    return geohash;
};

export const geohash_decode = (opts: {
    geohash: string;
}): LocationPoint => {
    const { latitude: lat, longitude: lng, error: { latitude: lat_err, longitude: lng_err } } = ngeohash.decode(opts.geohash);
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