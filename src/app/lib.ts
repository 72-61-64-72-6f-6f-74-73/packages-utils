import type { AppLayoutKey } from "$root";

type ConfigWindow = {
    layout: Record<AppLayoutKey, {
        h: number;
        w?: number;
    }>;
    debounce: {
        search: number;
    }
};

/*
{
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536
  };
*/
export const cfg_app: ConfigWindow = {
    layout: {
        ios0: {
            h: 600,
            w: 300,
        },
        ios1: {
            h: 750,
            w: 350,
        },
        webm0: {
            h: 600,
            w: 300,
        },
        webm1: {
            h: 750,
            w: 800,
        },
        web_mobile: {
            h: 600,
            w: 300,
        },
        web_desktop: {
            h: 600,
            w: 300,
        }
    },
    debounce: {
        search: 200
    },
};