import type { ErrorMessage, IClientGeolocationPosition } from "$root";

export type IGeolocationErrorMessage =
    | `error.client.geolocation.permission_denied`
    | `error.client.geolocation.location_unavailable`
    | `error.client.geolocation.timeout`
    | `*`;

export type IClientGeolocation = {
    current(): Promise<IClientGeolocationPosition | ErrorMessage<IGeolocationErrorMessage>>;
};