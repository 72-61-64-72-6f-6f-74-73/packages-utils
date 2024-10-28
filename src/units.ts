import convert from "convert";

export type MassUnit = "kg" | "lb" | "g";

export function parse_trade_mass_unit(val?: string): MassUnit | undefined {
    switch (val) {
        case "kg":
        case "lb":
        case "g":
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