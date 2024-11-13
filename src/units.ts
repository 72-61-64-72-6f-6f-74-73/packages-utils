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

export const mass_tf_u = (units_from: MassUnit, units_to: string, amt: number): number => {
    const _units_to = parse_mass_unit_u(units_to);
    if (!_units_to) throw new Error(`Malformed units.`)
    return convert(amt, units_from).to(_units_to);
};

export const mass_tf_str = (units_from: string, units_to: string, amt: number): number => {
    const _units_from = parse_mass_unit_u(units_from);
    const _units_to = parse_mass_unit_u(units_to);
    if (!_units_from || !_units_to) throw new Error(`Malformed units.`)
    return convert(amt, _units_from).to(_units_to);
};