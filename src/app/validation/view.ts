import { form_fields, IViewFarmsAddSubmission, IViewFarmsProductsAddSubmission, util_rxp, vs_geolocation_address, vs_geolocation_point, zod_numf_pos, zod_numf_price, zod_numi_pos } from "$root";
import { _env } from "src/_env";
import { z } from "zod";

export const vs_view_farms_products_add_submission: z.ZodSchema<IViewFarmsProductsAddSubmission> = z.object({
    product: z.string().regex(form_fields.product_key.validate),
    process: z.string().regex(form_fields.product_process.validate),
    description: z.string().regex(form_fields.product_description.validate),
    price_amount: zod_numf_price,
    price_currency: z.string().regex(form_fields.price_currency.validate),
    price_quantity_unit: z.string().regex(form_fields.quantity_unit.validate),
    photos: z.array(z.string().regex(_env.PROD ? util_rxp.url_image_upload : util_rxp.url_image_upload_dev)),
    quantity_amount: zod_numi_pos,
    quantity_unit: z.string().regex(form_fields.quantity_unit.validate),
    quantity_label: z.string().regex(form_fields.quantity_label.validate),
    geolocation_point: vs_geolocation_point,
    geolocation_address: vs_geolocation_address,
});

export const vs_view_farms_add_submission: z.ZodSchema<IViewFarmsAddSubmission> = z.object({
    farm_name: z.string().regex(form_fields.farm_name.validate),
    farm_area: zod_numf_pos,
    farm_area_unit: z.string().regex(form_fields.area_unit.validate),
    farm_contact_name: z.string().regex(form_fields.contact_name.validate),
    geolocation_point: vs_geolocation_point,
    geolocation_address: vs_geolocation_address,
});
