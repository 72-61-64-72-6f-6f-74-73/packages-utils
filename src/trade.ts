import { parse_int, parse_mass_unit, type MassUnit } from "$root";

export type TradeKey = `coffee` | `cacao` | `maca`;

export type TradeQuantityMass = {
    mass: number;
    mass_unit: MassUnit;
}
export type TradeQuantity = TradeQuantityMass & {
    label: string;
};

export const fmt_trade_quantity_tup = (obj: TradeQuantity): string => `${obj.mass}-${obj.mass_unit}-${obj.label}`;

export const parse_trade_quantity_tup = (sel_key: string): TradeQuantity | undefined => {
    const [qty_mass, qty_mass_u, qty_label] = sel_key.split(`-`);
    const mass_unit = parse_mass_unit(qty_mass_u);
    if (!qty_mass || !qty_mass_u || !qty_label || !mass_unit) return undefined;
    return {
        mass: parse_int(qty_mass, 1),
        mass_unit,
        label: qty_label
    }
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

const trade_process_default: string[] = [
    `natural`,
    `dried`,
    `roasted`
];

export type TradeParam = {
    default: {
        quantity: TradeQuantity[];
        process: string[];
    },
    key: Record<TradeKey, {
        quantity: TradeQuantity[];
        process: string[];
        flavor: string[];
    }>;
};
export const trade: TradeParam = {
    default: {
        quantity: trade_quantity_default,
        process: trade_process_default,
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
            ],
            flavor: [
                `natural`,
                `bergamot`,
                `jasmine honeysuckle`,
                `orange`,
                `blueberry`,
                `apricot`,
                `black tea`,
                `raspberry`,
                `nougat`,
                `milk chocolate`,
                `peach`,
                `vanilla`,
                `berry`,
                `nut`,
                `brown sugar`,
                `grape`,
                `raisin`,
                `red apple`,
                `sweet bread pastry`,
                `pineapple`,
                `star fruit`,
                `mango`,
                `grapefruit`,
                `nectarine`,
                `red grape`,
                `maple syrup`,
                `dark chocolate`,
                `orange blossom`,
                `marshmallow`,
                `mandarin`,
                `dried dates`,
                `prune`,
                `green apple`,
                `licorice/anise`,
                `cranberry`,
                `caramel`,
                `chocolate`,
                `lemon`,
                `golden raisin`,
                `black cherry`,
                `plum`,
                `black currant`,
                `roses`,
                `cola`,
                `banana`,
                `red currant`,
                `white grape`,
                `green tea`,
                `lychee`,
                `tamarind`,
                `dried fig`,
                `green grape`,
                `sugar cane`,
                `cherry`,
                `magnolia`,
                `tropical fruit`,
                `ctrius`,
                `stronefruit`
            ],
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
            ],
            flavor: []
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
            ],
            flavor: []
        }
    }
};

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
    const amt = parseInt(mass || `0`, 10);
    if (isNaN(amt) || amt <= 0) return;
    const units = parse_mass_unit(mass_unit);
    if (!units) return;
    if (typeof label !== `string` || !label) return;
    return [amt, units, label]
}