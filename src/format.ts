export const fmt_plural_agreement = (num: number = 0, val_s: string, val_pl: string): string => {
    if (num === 1) return val_s;
    return val_pl;
};