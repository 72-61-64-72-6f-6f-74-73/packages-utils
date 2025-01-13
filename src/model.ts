export type IModelsQueryValue = string | number | boolean | null;
export type IModelsQueryBindValue = string | number | boolean | null;;
export type IModelsQueryBindValueTuple = [string, IModelsQueryValue];
export type IModelsQueryBindValueOpt = (IModelsQueryBindValue | null);
export type IModelsQueryFilterOption = `equals` | `starts-with` | `ends-with` | `contains` | `ne`;
export type IModelsQueryFilterOptionList = `between` | `in`;
export type IModelsQueryFilterCondition = `and` | `or` | `not`

export type IModelsSortCreatedAt = 'newest' | 'oldest';
export type IModelsQueryParam = { query: string; bind_values: IModelsQueryBindValue[] };
export type IModelsFormErrorTuple = [boolean, string];
export type IModelsFormValidationTuple = [RegExp, string];
export type IModelsSchemaErrors = { err_s: string[]; };
export type IModelsForm = {
    label?: string;
    placeholder?: string;
    validateKeypress?: boolean;
    preventFocusRest?: boolean;
    validation: RegExp;
    charset: RegExp;
    hidden?: boolean;
    optional?: boolean;
    default?: string | number;
};

export type IModelQueryFilterMapValuesTuplesOption = [IModelsQueryValue, IModelsQueryFilterOption];
export type IModelQueryFilterMapValuesTuplesOptionList = [IModelsQueryValue[], IModelsQueryFilterOptionList];
export type IModelQueryFilterMapValuesTuples = ModelQueryFilterMapTuple<IModelQueryFilterMapValuesTuplesOption> | ModelQueryFilterMapTuple<IModelQueryFilterMapValuesTuplesOptionList>;
export type IModelQueryFilterMapValues = IModelsQueryValue | IModelQueryFilterMapValuesTuples;

export type ModelQueryFilterMapTupleBasis =
    | [IModelsQueryValue, IModelsQueryFilterOption]
    | [IModelsQueryValue, IModelsQueryFilterOption, IModelsQueryFilterCondition]
    | [IModelsQueryValue[], IModelsQueryFilterOptionList]
    | [IModelsQueryValue[], IModelsQueryFilterOptionList, IModelsQueryFilterCondition];

export type ModelQueryFilterMapTuple<T extends ModelQueryFilterMapTupleBasis> =
    T extends [IModelsQueryValue, IModelsQueryFilterOption]
    ? [IModelsQueryValue, IModelsQueryFilterOption, IModelsQueryFilterCondition]
    : T extends [IModelsQueryValue[], IModelsQueryFilterOptionList]
    ? [IModelsQueryValue[], IModelsQueryFilterOptionList, IModelsQueryFilterCondition]
    : T;

export type IModelQueryFilterMap<ModelFilter extends object> = {
    [K in keyof ModelFilter]: ModelFilter[K] | [ModelFilter[K], IModelsQueryFilterOption] | [ModelFilter[K], IModelsQueryFilterOption, IModelsQueryFilterCondition] | [ModelFilter[K][], IModelsQueryFilterOptionList] | [ModelFilter[K][], IModelsQueryFilterOptionList, IModelsQueryFilterCondition];
};
export type IModelQueryFilterMapParsed = { query_values: string[]; bind_values: IModelsQueryValue[]; };

export const parse_model_query_value = (val: IModelsQueryValue): IModelsQueryBindValue => {
    if (typeof val === `boolean`) return val ? '1' : '0';
    else if (typeof val === `number`) return val;
    else if (typeof val === `string` && val) return val;
    return null;
};

export const is_model_query_filter_option = (value: string): value is IModelsQueryFilterOption => {
    return ['equals', 'starts-with', 'ends-with', 'contains', 'ne'].includes(value);
}

export const is_model_query_filter_option_list = (value: string): value is IModelsQueryFilterOptionList => {
    return ['between', 'in'].includes(value);
}

export const is_model_query_values = (value: unknown): value is IModelsQueryValue => {
    return typeof value === `string` || typeof value === `number` || typeof value === `boolean`;
}

export const list_model_query_values_assert = (arr: (IModelsQueryValue | undefined)[]): (IModelsQueryValue)[] => {
    return arr.filter((item): item is string | number | boolean => item !== undefined);
}

export const parse_model_filter_map = <T extends object>(opts: IModelQueryFilterMap<T>): IModelQueryFilterMapParsed => {
    const bind_values: IModelsQueryValue[] = [];
    const query_values: string[] = [];

    for (const [index, entry] of Object.entries(opts).entries()) {
        const [field, filters] = entry as [string, IModelQueryFilterMapValues];

        if (is_model_query_values(filters)) {
            query_values.push(`${field} = ?`);
            bind_values.push(filters);
        } else if (Array.isArray(filters)) {
            const [filters_val, filters_opt] = filters;
            const filter_condition = index === 0 ? `` : typeof filters[2] === `undefined` ? `AND ` : ` ${filters[2]}`;
            if (is_model_query_values(filters_val) && is_model_query_filter_option(filters_opt)) {
                switch (filters_opt) {
                    case `starts-with`: {
                        query_values.push(`${filter_condition}${field} LIKE ?`);
                        bind_values.push(`${filters[0]}%`);
                    } break;
                    case `ends-with`: {
                        query_values.push(`${filter_condition}${field} LIKE ?`);
                        bind_values.push(`%${filters[0]}`);
                    } break;
                    case `contains`: {
                        query_values.push(`${filter_condition}${field} LIKE ?`);
                        bind_values.push(`%${filters[0]}%`);
                    } break;
                    case `ne`: {
                        query_values.push(`${filter_condition}${field} != ?`);
                        bind_values.push(`${filters[0]}`);
                    } break;
                    case `equals`: {
                        query_values.push(`${filter_condition}${field} = ?`);
                        bind_values.push(filters[0]);
                    } break;
                    default:
                        throw new Error("util.model.parse_model_filter_map.invalid_condition");
                };
            } else if (is_model_query_filter_option_list(filters_opt)) {
                switch (filters_opt) {
                    case `between`: {
                        query_values.push(`${filter_condition}${field} BETWEEN ? AND ?`);
                        bind_values.push(...filters[0].slice(0, 2));
                    } break;
                    case `in`: {
                        query_values.push(`${filter_condition}${field} IN (${`? `.repeat(filters[0].length).trim().split(" ").join(", ")})`);
                        bind_values.push(...list_model_query_values_assert(filters[0]));
                    } break;
                    default:
                        throw new Error("util.model.parse_model_filter_map.invalid_condition");
                };
            }
        }
    }
    if (!query_values.length) throw new Error("Error: invalid filter.");
    if (!bind_values.length) throw new Error("Error: invalid filter.");
    return { query_values, bind_values };
};
