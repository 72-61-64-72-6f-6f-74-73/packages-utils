import { CallbackPromise } from "$root";

export const ascii = {
    bullet: '•',
    dash: `—`,
    up: `↑`,
    down: `↓`
}

export const root_symbol = "»--`--,---";

export const sleep = async (ms: number): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, ms));
};

export const obj_keys_maxnum = (obj: any): number => Math.max(
    ...Object.keys(obj).map(Number),
);

export const debounce_callback = (func: Function, delay: number) => {
    let timer: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
};

export const str_trunc = (val: string, max_length: number = 28): string => {
    if (val.length <= max_length) return val;
    return `${val.slice(0, max_length - 3)}...`;
};

export const exe_iter = async (callback: CallbackPromise, num: number = 1, delay: number = 400): Promise<void> => {
    try {
        const iter_fn = (count: number) => {
            if (count > 0) {
                callback();
                if (count > 1) {
                    setTimeout(() => {
                        iter_fn(count - 1);
                    }, delay);
                }
            }
        };
        iter_fn(num);
    } catch (e) {
        console.log(`(error) exe_iter `, e);
    }
};