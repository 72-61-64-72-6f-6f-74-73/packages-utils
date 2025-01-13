export const obj_en = <KeyType extends string, ValType>(object: Record<string, ValType>, parse_function: (key: string) => KeyType = (i) => i as KeyType): [KeyType, ValType][] => {
    return Object.entries(object).map<[KeyType, ValType]>(([k, v]) => [parse_function(k), v])
};

export const obj_truthy_fields = (obj: Record<string, string>): boolean => {
    return Object.values(obj).every(Boolean);
};

export const obj_result = (obj: any): string | undefined => {
    if (`result` in obj && typeof obj.result === `string`) return obj.result;
    return undefined;
};

export const obj_results_str = (obj: any): string[] | undefined => {
    if (Array.isArray(obj.results)) return obj.results.map(String);
    return undefined;
};