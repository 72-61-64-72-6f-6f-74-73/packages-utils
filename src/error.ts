import type { ErrorMessage, ErrorResponse } from "./types";

export const handle_error = (e: unknown, append?: string): ErrorResponse => {
    const msg = (e as Error).message ? (e as Error).message : String(e);
    const error = `${msg}${append ? ` ${append}` : ``}`;
    return { error };
};

export const err_msg = <T extends string>(err: T): ErrorMessage<T> => {
    return { err };
};
