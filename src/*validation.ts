import { GeolocationAddress, GeolocationPoint, parse_int, ResolveEnumArea_Unit, ResolveEnumQuantity_Unit, util_rxp } from "$root";
import { z } from "zod";

export const vunion_area_unit: z.ZodUnion<[
    z.ZodLiteral<ResolveEnumArea_Unit>,
    z.ZodLiteral<ResolveEnumArea_Unit>,
    z.ZodLiteral<ResolveEnumArea_Unit>,
    z.ZodLiteral<ResolveEnumArea_Unit>,
]> = z.union([
    z.literal(`ac`),
    z.literal(`ft2`),
    z.literal(`ha`),
    z.literal(`m2`),
]);

export const vunion_mass_unit: z.ZodUnion<[
    z.ZodLiteral<ResolveEnumQuantity_Unit>,
    z.ZodLiteral<ResolveEnumQuantity_Unit>,
    z.ZodLiteral<ResolveEnumQuantity_Unit>,
]> = z.union([
    z.literal(`kg`),
    z.literal(`lb`),
    z.literal(`g`),
]);

export const vs_geolocation_address: z.ZodSchema<GeolocationAddress> = z.object({
    primary: z.string().regex(util_rxp.addr_primary),
    admin: z.string().regex(util_rxp.addr_admin),
    country: z.string().regex(util_rxp.country_code_a2)
});

export const vs_geolocation_point: z.ZodSchema<GeolocationPoint> = z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
});

export const ve_price_amount = z.preprocess((input) => {
    return parse_int(String(input), 1.00);
}, z.number().positive().multipleOf(0.01));

export const ve_quantity_amount = z.preprocess((input) => {
    return parse_int(String(input), 1);
}, z.number().int().positive());

export const zod_numf_price = z.number().positive().multipleOf(0.01);

export const zod_numi_pos = z.number().int().positive();

export const zod_numf_pos = z.number().positive();