import type { AppLayoutKey } from "$root";

type ConfigWindow = {
    layout: Record<AppLayoutKey, {
        h: number;
    }>;
    debounce: {
        search: number;
    }
};

export const cfg_app: ConfigWindow = {
    layout: {
        ios0: {
            h: 600
        },
        ios1: {
            h: 750
        },
        webm0: {
            h: 600
        },
        webm1: {
            h: 750
        }
    },
    debounce: {
        search: 200
    },
};