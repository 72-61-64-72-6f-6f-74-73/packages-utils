export const round_to_5 = (num: number): number => {
    return Math.round(num / 5) * 5;
};

export const num_str = (num: number): string => num.toString();

export const num_min = (num: number = 0, num_min: number = 0): number => Math.max(num, num_min);