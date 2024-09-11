export function time_now_ms(): number {
    return Math.floor(new Date().getTime() / 1000);
};

export function time_created_on(): string {
    return new Date().toISOString();
};