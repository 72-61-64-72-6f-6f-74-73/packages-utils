import type { vunion_area_unit, vunion_mass_unit } from "$root";
import { z } from "zod";

export type AreaUnit = z.infer<typeof vunion_area_unit>;
export const area_units: AreaUnit[] = [`ac`, `ha`, `ft2`, `m2`] as const;

export type MassUnit = z.infer<typeof vunion_mass_unit>;
export const mass_units: MassUnit[] = [`kg`, `lb`, `g`] as const;

export function parse_mass_unit_default(val?: string): MassUnit {
    const unit = parse_mass_unit(val);
    return unit ?? `kg`
}

export function parse_mass_unit(val?: string): MassUnit | undefined {
    switch (val) {
        case `kg`:
        case `lb`:
        case `g`:
            return val;
        default:
            return undefined;
    };
};

export function parse_area_unit_default(val?: string): AreaUnit {
    const unit = parse_area_unit(val);
    return unit ?? `ac`
}

export function parse_area_unit(val?: string): AreaUnit | undefined {
    switch (val) {
        case `ac`:
        case `ha`:
        case `ft2`:
        case `m2`:
            return val;
        default:
            return undefined;
    };
};
