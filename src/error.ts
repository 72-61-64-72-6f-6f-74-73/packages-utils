import type { ErrorResponse } from "./types";

export function err_msg(e: unknown, append?: string): ErrorResponse {
    const msg = (e as Error).message ? (e as Error).message : String(e);
    const error = `${msg}${append ? ` ${append}` : ``}`;
    return { error };
};
