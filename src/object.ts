export const obj_en = <KeyType extends string, ValType>(object: Record<string, ValType>, parse_function: (key: string) => KeyType): [KeyType, ValType][] => {
    return Object.entries(object).map<[KeyType, ValType]>(([k, v]) => [parse_function(k), v])
};