import convert from "convert";
import { z } from "zod";

export const MassUnitSchema = z.union([
    z.literal(`kg`),
    z.literal(`lb`),
    z.literal(`g`),
]);

export const mass_units: MassUnit[] = [`kg`, `lb`, `g`] as const;

export type MassUnit = z.infer<typeof MassUnitSchema>;

export function parse_mass_unit(val: string): MassUnit {
    switch (val) {
        case `kg`:
        case `lb`:
        case `g`:
            return val;
        default:
            return `kg`;
    };
};

export function parse_mass_unit_u(val?: string): MassUnit | undefined {
    switch (val) {
        case `kg`:
        case `lb`:
        case `g`:
            return val;
        default:
            return undefined;
    };
};

export const mass_g = (units: MassUnit, amt: number): number => {
    return convert(amt, units).to(`g`);
};

export const mass_tf = (units_from: MassUnit, units_to: MassUnit, amt: number): number => {
    return convert(amt, units_from).to(units_to);
};