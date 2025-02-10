import { GeolocationPointTuple, GeometryPoint, ResolveAddressInfo, ResolveGeometryPoint } from "$root";
import { decodeBase32, encodeBase32 } from "geohashing";

export type GeolocationAddress = Omit<ResolveAddressInfo, "id" | "created_at" | "updated_at">;

export type GeolocationPoint = {
    lat: number;
    lng: number;
};

export type LocationPoint = GeolocationCoordinatesPoint & {
    error: GeolocationCoordinatesPoint;
}

export type GeocoderReverseResult = {
    id: number;
    name: string;
    admin1_id: string | number;
    admin1_name: string;
    country_id: string;
    country_name: string;
    latitude: number;
    longitude: number;
};

export type IClientGeolocationPosition = {
    lat: number;
    lng: number;
    accuracy?: number;
    altitude?: number;
    altitude_accuracy?: number;
};

export type GeolocationCoordinatesPoint = {
    lat: number;
    lng: number;
}

export type GeolocationLatitudeFmtOption = 'dms' | 'd' | 'dm';

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

export const parse_geop_point = (point: GeolocationCoordinatesPoint): GeolocationPoint => {
    const { lat, lng } = point;
    return { lat, lng };
};

export const parse_geol_coords = (number: number): number => {
    return Math.round(number * 1e7) / 1e7;
};

export const parse_geolocation_address = (addr?: ResolveAddressInfo): GeolocationAddress | undefined => {
    if (!addr) return undefined;
    const { primary, admin, country } = addr;
    return { primary, admin, country };
};

export const parse_geolocation_point = (point?: ResolveGeometryPoint): GeolocationPoint | undefined => {
    if (!point) return undefined;
    return {
        lat: point.coordinates[1],
        lng: point.coordinates[0],
    };
};

export const parse_geocode_address = (geoc?: GeocoderReverseResult): GeolocationAddress | undefined => {
    if (!geoc) return undefined;
    const { name: primary, admin1_name: admin, country_id: country } = geoc;
    return { primary, admin, country };
};

export const fmt_geocode_address = (geoc: GeocoderReverseResult): string => {
    const addr = parse_geocode_address(geoc);
    return addr ? `${addr.primary}, ${addr.admin}, ${addr.country}` : ``;
};

export const fmt_geolocation_address = (addr: ResolveAddressInfo): string => {
    return `${addr.primary}, ${addr.admin}, ${addr.country}`;
};

export const fmt_geometry_point_coords = (point: ResolveGeometryPoint, locale: string): string => {
    const lat = geol_lat_fmt(point.coordinates[0], `dms`, locale, 3);
    const lng = geol_lng_fmt(point.coordinates[1], `dms`, locale, 3);
    return `${lat}, ${lng}`;
};

export const parse_geom_point_tup = (point: GeometryPoint): GeolocationPointTuple => {
    return [
        point.coordinates[0],
        point.coordinates[1],
    ];
};

export const parse_geol_point_tup = (point: GeolocationPoint): GeolocationPointTuple => {
    return [
        point.lng,
        point.lat
    ];
};

export const parse_tup_geop_point = (map_center: GeolocationPointTuple): GeolocationPoint => {
    return {
        lat: map_center[1],
        lng: map_center[0]
    }
};

export const geol_lat_fmt = (lat: number, fmt_opt: GeolocationLatitudeFmtOption, locale: string, precision: number = 5): string => {
    const options: Intl.NumberFormatOptions = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };
    const fmt_deg = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
    const fmt_min = new Intl.NumberFormat(locale, options);
    const fmt_sec = new Intl.NumberFormat(locale, options);
    if (fmt_opt === 'dms') {
        const deg = Math.floor(Math.abs(lat));
        const min = Math.floor((Math.abs(lat) - deg) * 60);
        const sec = ((Math.abs(lat) - deg - min / 60) * 3600);
        return `${fmt_deg.format(deg)}° ${fmt_min.format(min)}' ${fmt_sec.format(sec)}" ${lat >= 0 ? 'N' : 'S'}`;
    } else if (fmt_opt === 'dm') {
        const deg = Math.floor(Math.abs(lat));
        const min = (Math.abs(lat) - deg) * 60;
        return `${fmt_deg.format(deg)}° ${fmt_min.format(min)}' ${lat >= 0 ? 'N' : 'S'}`;
    } else {
        return `${lat.toLocaleString(locale, { maximumFractionDigits: precision })}° ${lat >= 0 ? 'N' : 'S'}`;
    }
};

export const geol_lng_fmt = (lng: number, fmt_opt: GeolocationLatitudeFmtOption, locale: string, precision: number = 5): string => {
    const options: Intl.NumberFormatOptions = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };
    const fmt_deg = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
    const fmt_min = new Intl.NumberFormat(locale, options);
    const fmt_sec = new Intl.NumberFormat(locale, options);
    if (fmt_opt === 'dms') {
        const degrees = Math.floor(Math.abs(lng));
        const minutes = Math.floor((Math.abs(lng) - degrees) * 60);
        const seconds = ((Math.abs(lng) - degrees - minutes / 60) * 3600);
        return `${fmt_deg.format(degrees)}° ${fmt_min.format(minutes)}' ${fmt_sec.format(seconds)}" ${lng >= 0 ? 'E' : 'W'}`;
    } else if (fmt_opt === 'dm') {
        const degrees = Math.floor(Math.abs(lng));
        const minutes = (Math.abs(lng) - degrees) * 60;
        return `${fmt_deg.format(degrees)}° ${fmt_min.format(minutes)}' ${lng >= 0 ? 'E' : 'W'}`;
    } else {
        return `${lng.toLocaleString(locale, { maximumFractionDigits: precision })}° ${lng >= 0 ? 'E' : 'W'}`;
    }
};

export const compute_bounding_box = (lat: number, lng: number, distance_km: number): { nw: GeolocationPoint; ne: GeolocationPoint; se: GeolocationPoint; sw: GeolocationPoint; } => {
    const deg_to_rad = (deg: number) => deg * (Math.PI / 180);
    const rad_to_deg = (rad: number) => rad * (180 / Math.PI);

    const R = 6371;

    function destination_point(lat: number, lng: number, bearing: number, distance_km: number): GeolocationPoint {
        const lat1 = deg_to_rad(lat);
        const lon1 = deg_to_rad(lng);
        const angular_distance = distance_km / R;

        const lat2 = Math.asin(Math.sin(lat1) * Math.cos(angular_distance) + Math.cos(lat1) * Math.sin(angular_distance) * Math.cos(deg_to_rad(bearing)));
        const lon2 = lon1 + Math.atan2(Math.sin(deg_to_rad(bearing)) * Math.sin(angular_distance) * Math.cos(lat1), Math.cos(angular_distance) - Math.sin(lat1) * Math.sin(lat2));

        return { lat: rad_to_deg(lat2), lng: rad_to_deg(lon2) };
    }

    const bearings = [0, 90, 180, 270];

    const coords = bearings.map(bearing => destination_point(lat, lng, bearing, distance_km / Math.sqrt(2)));

    return {
        nw: coords[0],
        ne: coords[1],
        se: coords[2],
        sw: coords[3]
    };
};

export const geo_bounds_calc = (lat: number, lng: number, distance_km: number): { north: GeolocationPoint; south: GeolocationPoint; east: GeolocationPoint; west: GeolocationPoint; } => {
    const deg_to_rad = (deg: number) => deg * (Math.PI / 180);
    const rad_to_deg = (rad: number) => rad * (180 / Math.PI);

    const R = 6371;

    function destination_point(lat: number, lng: number, bearing: number, distance_km: number): GeolocationPoint {
        const lat1 = deg_to_rad(lat);
        const lon1 = deg_to_rad(lng);
        const angular_distance = distance_km / R;

        const lat2 = Math.asin(Math.sin(lat1) * Math.cos(angular_distance) + Math.cos(lat1) * Math.sin(angular_distance) * Math.cos(deg_to_rad(bearing)));
        const lon2 = lon1 + Math.atan2(Math.sin(deg_to_rad(bearing)) * Math.sin(angular_distance) * Math.cos(lat1), Math.cos(angular_distance) - Math.sin(lat1) * Math.sin(lat2));

        return { lat: rad_to_deg(lat2), lng: rad_to_deg(lon2) };
    }

    return {
        north: destination_point(lat, lng, 0, distance_km),
        south: destination_point(lat, lng, 180, distance_km),
        east: destination_point(lat, lng, 90, distance_km),
        west: destination_point(lat, lng, 270, distance_km)
    };
};

