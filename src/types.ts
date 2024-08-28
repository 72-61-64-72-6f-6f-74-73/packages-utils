
export type ErrorResponse = {
    error: string;
};

export type LocationPoint = {
    lat: number;
    lng: number;
    error: {
        lat: number;
        lng: number;
    };
}