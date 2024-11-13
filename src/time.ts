export const time_now_ms = (): number => Math.floor(new Date().getTime() / 1000);

export const time_created_on = (): string => new Date().toISOString();

export const year_curr = (): string => new Date().getFullYear().toString();