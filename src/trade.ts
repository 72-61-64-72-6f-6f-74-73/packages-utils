export type TradeKey = `coffee` | `cacao` | `maca`;

export const trade_keys: TradeKey[] = [`coffee`, `cacao`, `maca`] as const;

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
export type TradeMassUnit = "kg" | "lb" | "g";

export function parse_trade_mass_unit(val?: string): TradeMassUnit | undefined {
    switch (val) {
        case "kg":
        case "lb":
        case "g":
            return val;
        default:
            return undefined;
    };
};
export type TradeKeyQuantity = {
    label: string;
    mass: number;
    mass_unit: TradeMassUnit;
};

export const fmt_trade_quantity_val = (obj: TradeKeyQuantity): string => `${obj.mass}-${obj.mass_unit}-${obj.label}`;

const trade_quantities_default: TradeKeyQuantity[] = [
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

export const trade_quantities: Record<TradeKey, TradeKeyQuantity[]> = {
    coffee: [
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
    cacao: [
        ...trade_quantities_default
    ],
    maca: [
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
        ...trade_quantities_default
    ]
}

export function parse_trade_mass_tuple(val?: string): [number, TradeMassUnit, string] | undefined {
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