import { type MassUnit, parse_trade_mass_unit } from "./units";

export type TradeKey = `coffee` | `cacao` | `maca`;

export type TradeQuantity = {
    label: string;
    mass: number;
    mass_unit: MassUnit;
};

export const trade_keys: TradeKey[] = [`coffee`, `cacao`, `maca`] as const;

const trade_quantity_default: TradeQuantity[] = [
    {
        label: `bag`,
        mass: 10,
        mass_unit: `kg`
    },
    {
        label: `bag`,
        mass: 5,
        mass_unit: `kg`
    },
    {
        label: `bag`,
        mass: 25,
        mass_unit: `kg`
    },
];

export type TradeParam = {
    default: {
        quantity: TradeQuantity[];
    },
    key: Record<TradeKey, {
        quantity: TradeQuantity[];
        process: string[];
    }>;
};
export const trade: TradeParam = {
    default: {
        quantity: trade_quantity_default,
    },
    key: {
        coffee: {
            quantity: [
                {
                    label: `bag`,
                    mass: 60,
                    mass_unit: `kg`
                },
                {
                    label: `bag`,
                    mass: 69,
                    mass_unit: `kg`
                },
                {
                    label: `bag`,
                    mass: 30,
                    mass_unit: `kg`
                },
            ],
            process: [
                `washed`,
                `natural`,
                `honey`,
                `semi_washed`,
                `wet_hulled`,
                `dry`,
                `pulped_natural`,
                `carbonic_maceration`
            ]
        },
        cacao: {
            quantity: [
                ...trade_quantity_default
            ],
            process: [
                `raw`,
                `fermented`,
                `dried`,
                `roasted`,
                `cocoa_powder`,
                `cocoa_butter`,
                `chocolate`
            ]
        },
        maca: {
            quantity: [
                {
                    label: `bag`,
                    mass: 1,
                    mass_unit: `kg`
                },
                {
                    label: `bag`,
                    mass: 100,
                    mass_unit: `g`
                },
                ...trade_quantity_default
            ],
            process: [
                `raw`,
                `powdered`,
                `roasted`,
                `gelatinized`,
                `capsules`
            ]
        }
    }
};

export const fmt_trade_quantity_sel_val = (obj: TradeQuantity): string => `${obj.mass}-${obj.mass_unit}`;

export function parse_trade_key(val?: string): TradeKey | undefined {
    switch (val) {
        case "coffee":
        case "cacao":
        case "maca":
            return val;
        default:
            return undefined;
    };
};


export function parse_trade_mass_tuple(val?: string): [number, MassUnit, string] | undefined {
    if (!val) return;
    const vals = val.split('-');
    if (vals.length !== 3) return;
    const mass = vals[0];
    const mass_unit = vals[1];
    const label = vals[2];
    const amt = parseInt(mass, 10);
    if (isNaN(amt) || amt <= 0) return;
    const units = parse_trade_mass_unit(mass_unit);
    if (!units) return;
    if (typeof label !== `string` || !label) return;
    return [amt, units, label]
}