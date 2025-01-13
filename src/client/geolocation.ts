import { type ErrorMessage } from "..";

export type IGeolocationErrorMessage = `*-permissions` | `*`;

export type IClientGeolocationPosition = {
    lat: number;
    lng: number;
    accuracy?: number;
    altitude?: number;
    altitude_accuracy?: number;
};

export type IClientGeolocation = {
    current(): Promise<IClientGeolocationPosition | ErrorMessage<IGeolocationErrorMessage>>;
};