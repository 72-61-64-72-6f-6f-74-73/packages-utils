import type { GeolocationCoordinatesPoint } from "./geolocation";

export type ErrorResponse<T extends object> = { error: T; };
export type ErrorMessage<T extends string> = { err: T };

export type FieldRecord = Record<string, string>;

export type ResultId = { id: string; };
export type ResultPass = { pass: true; };
export type ResultsList<T> = { results: T[]; };
export type ResultObj<T> = { result: T; };
export type ResultPublicKey = { public_key: string; };
export type ResultSecretKey = { secret_key: string; };

export type LocationPoint = GeolocationCoordinatesPoint & {
    lat: number;
    lng: number;
    error: GeolocationCoordinatesPoint;
}

export type NumberTuple = [number, number];

export type FileBytesFormat = `kb` | `mb` | `gb`;
export type FileMimeType = string;
export type FilePath = { file_path: string; file_name: string; mime_type: FileMimeType; }


export type NotifyMessage = {
    message: string;
    ok?: string;
    cancel?: string;
};