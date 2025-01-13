import { type FieldRecord, is_error_response, is_message_response, type NotifyMessage } from ".";

export type IHttpImageResponse = {
    status: number;
    blob?: Blob;
    headers: FieldRecord;
    url: string;
};

export type IHttpResponse = {
    status: number;
    data?: any;
    error?: string;
    message?: NotifyMessage;
    headers: FieldRecord;
    url: string;
};

export type IHttpOptsData = any;
export type IHttpOptsParams = Record<string, string | string[]>;

export type IHttpOpts = {
    url: string;
    method?: `get` | `post` | `put`;
    params?: IHttpOptsParams;
    data?: IHttpOptsData;
    data_bin?: Uint8Array;
    authorization?: string;
    headers?: FieldRecord;
    connect_timeout?: number;
};

const lib_http_to_bodyinit = (data: any): BodyInit => {
    if (typeof data === 'string') return data;
    else if (data instanceof FormData) return data;
    else if (data instanceof Blob) return data;
    else if (data instanceof ArrayBuffer) return data;
    else if (data instanceof URLSearchParams) return data;
    return JSON.stringify(data);
}

const lib_http_parse_headers = (headers: Headers): FieldRecord => {
    const acc: FieldRecord = {};
    headers.forEach((value, key) => acc[key] = value);
    return acc;
};

export const http_fetch_opts = (opts: IHttpOpts): { url: string; options: RequestInit; } => {
    const { url } = opts;
    const headers: FieldRecord = {
        ...opts.headers,
    };
    if (opts.authorization) headers['Authorization'] = `Bearer ${encodeURIComponent(opts.authorization)}`;
    const options: RequestInit = {
        method: opts.method ? opts.method.toUpperCase() : `GET`,
        headers,
    }
    if (opts.data) options.body = lib_http_to_bodyinit(opts.data);
    if (opts.data_bin) options.body = opts.data_bin;

    return {
        url,
        options
    }
};

export const http_parse_response = async (res: Response): Promise<Promise<IHttpResponse>> => {
    let data: any = null;
    try {
        const res_json = await res.json();
        if (typeof res_json === `string`) data = JSON.parse(res_json);
        else data = res_json;
    } catch { }
    if (!data) data = await res.text();
    return {
        status: res.status,
        url: res.url,
        data: res.ok && data ? data : null,
        error: !res.ok && is_error_response(data) ? data.error : undefined,
        message: res.ok && is_message_response(data) ? data : undefined,
        headers: lib_http_parse_headers(res.headers)
    };
};

export const http_fetch = async (opts: IHttpOpts): Promise<IHttpResponse> => {
    const { url, options } = http_fetch_opts(opts);
    const response = await fetch(url, options);
    let response_data: any = null;
    try {
        const res_json = await response.json();
        response_data = typeof res_json === `string` ? JSON.parse(res_json) : res_json;
    } catch { }
    if (!response_data) {
        try {
            const res_text = await response.text();
            response_data = res_text;
        } catch { }
    }
    return {
        status: response.status,
        url: response.url,
        headers: lib_http_parse_headers(response.headers)
    };
};

