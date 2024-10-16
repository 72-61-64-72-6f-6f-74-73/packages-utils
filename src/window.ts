export type AppLayoutKey = 'mobile_base' | 'mobile_y';

type ClientWindow = {
    app: {
        layout: Record<AppLayoutKey, {
            h: number;
        }>;
    }
};

export const wind: ClientWindow = {
    app: {
        layout: {
            mobile_base: {
                h: 600
            },
            mobile_y: {
                h: 750
            }
        }
    }
};