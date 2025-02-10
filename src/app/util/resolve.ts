import { ResolveAddressInfo } from "../types/resolve";

export const lib_address_fmt = (addr: ResolveAddressInfo): string => {
    return `${addr.primary}, ${addr.admin}, ${addr.country}`
};