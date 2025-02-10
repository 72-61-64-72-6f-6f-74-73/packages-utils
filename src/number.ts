export const parse_int = (val: string, fallback: number = 0): number => {
    const num = parseInt(val);
    return isNaN(num) ? fallback : num;
};

export const parse_float = (val: string, fallback: number = 0): number => {
    const num = parseFloat(val);
    return isNaN(num) ? fallback : num;
};

export const num_str = (num: number): string => num.toString();

export const num_interval_range = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
