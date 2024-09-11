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

export type TradeKeyQuantity = {
    label?: string;
    qty_amt: number;
    qty_unit: TradeMassUnit;
};

export const fmt_trade_quantity_val = (obj: TradeKeyQuantity): string => `${obj.qty_amt}-${obj.qty_unit}`;

const trade_quantities_default: TradeKeyQuantity[] = [
    {
        label: `bag`,
        qty_amt: 10,
        qty_unit: `kg`
    },
    {
        label: `bag`,
        qty_amt: 5,
        qty_unit: `kg`
    },
    {
        label: `bag`,
        qty_amt: 25,
        qty_unit: `kg`
    },
];

export const trade_quantities: Record<TradeKey, TradeKeyQuantity[]> = {
    coffee: [
        {
            label: `bag`,
            qty_amt: 60,
            qty_unit: `kg`
        },
        {
            label: `bag`,
            qty_amt: 69,
            qty_unit: `kg`
        },
        {
            label: `bag`,
            qty_amt: 30,
            qty_unit: `kg`
        },
        {
            label: `bag`,
            qty_amt: 15,
            qty_unit: `kg`
        },
    ],
    cacao: [
        ...trade_quantities_default
    ],
    maca: [
        {
            label: `bag`,
            qty_amt: 1,
            qty_unit: `kg`
        },
        {
            label: `bag`,
            qty_amt: 100,
            qty_unit: `g`
        },
        ...trade_quantities_default
    ]
}