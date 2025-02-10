export type FieldRecord = Record<string, string>;
export type NotifyMessage = {
    message: string;
    ok?: string;
    cancel?: string;
};

export type GeometryPoint = {
    type: string;
    coordinates: number[];
};

export type GeometryPolygon = {
    type: string;
    coordinates: number[][][];
};

export type GeolocationPointTuple = [number, number];

export type ResultId = { id: string; };
export type ResultPass = { pass: true; };
export type ResultsList<T> = { results: T[]; };
export type ResultObj<T> = { result: T; };
export type ResultPublicKey = { public_key: string; };
export type ResultSecretKey = { secret_key: string; };

export type FileBytesFormat = `kb` | `mb` | `gb`;
export type FileMimeType = string;
export type FilePath = { file_path: string; file_name: string; mime_type: FileMimeType; }
