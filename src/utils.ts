import { v4 } from "uuid";
import type { ErrorResponse } from "./types";

export const regex: Record<string, RegExp> = {
    word_only: /^[a-zA-Z]+$/,
    alpha: /[a-zA-Z ]$/,
    num: /^[0-9.]+$/,
};

export function uuidv4() {
    return v4();
};

export function time_now_ms(): number {
    return Math.floor(new Date().getTime() / 1000);
};

export function time_created_on(): string {
    return new Date().toISOString();
};

export function err_msg(e: unknown, append?: string): ErrorResponse {
    const msg = (e as Error).message ? (e as Error).message : String(e);
    const error = `${msg}${append ? ` ${append}` : ``}`;
    return { error };
};
