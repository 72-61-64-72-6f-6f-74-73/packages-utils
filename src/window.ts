export type AppLayoutKey = 'mobile_base' | 'mobile_y';
export type AppLayout<T1 extends string, T2 extends string> = `${T1}_${T2}`;
export type AppHeightsResponsiveKey =
    | `tabs`
    | `nav`
    | `lo_view`
    | `view`
    | `view_offset`
    | `trellis_centered`;
export type AppHeightsResponsive = AppLayout<AppHeightsResponsiveKey, AppLayoutKey>;

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