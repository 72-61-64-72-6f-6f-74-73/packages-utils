import type { GeolocationCoordinatesPoint } from "./geolocation";

export type ErrorResponse = { error: string; };
export type ErrorMessage<T extends string> = { err: T };

export type ResultId = { id: string; };
export type ResultPass = { pass: true; };
export type ResultsList<T> = { results: T[]; };
export type ResultObj<T> = { result: T; };

export type FieldRecord = Record<string,string>;

export type LocationPoint = GeolocationCoordinatesPoint & {
    lat: number;
    lng: number;
    error: GeolocationCoordinatesPoint;
}

export type NumberTuple = [number, number];