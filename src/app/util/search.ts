export type SearchServiceResult = Record<string, any> & { id: string, result_k: string; result_v: string; };
export type SearchServiceFlattenedData = Record<string, any> & { list: string; };

export type ISearchService = {
    search(input: string): SearchServiceResult[]
};

export class SearchService implements ISearchService {
    private _flattened_data: SearchServiceFlattenedData[] = [];
    private _index_map: Map<string, Record<string, any>[]> = new Map();

    constructor(data: Record<string, any[]>) {
        this.flatten_data(data);
        this.index_data();
    }

    private get flattened_data() {
        return this._flattened_data;
    }

    private flatten_data(data: Record<string, any[]>) {
        Object.keys(data).forEach((list_group) => {
            const list = data[list_group];
            list.forEach((item) => {
                const flattened_item: SearchServiceFlattenedData = { ...item, group: list_group };
                this._flattened_data.push(flattened_item);
            });
        });
    }

    private index_data(): void {
        this.flattened_data.forEach((item) => {
            Object.keys(item).forEach((key) => {
                const key_lower = key.toLowerCase();
                const value = item[key];
                if (value != null) {
                    if (!this._index_map.has(key_lower)) this._index_map.set(key_lower, []);
                    this._index_map.get(key_lower)?.push(item);
                }
            });
        });
    }

    public search(query: string): SearchServiceResult[] {
        if (!query) return [];
        const search_query = query.toLowerCase().trim();
        let results: SearchServiceResult[] = [];
        const results_seen = new Set<string>();
        this._index_map.forEach((items) => {
            items.forEach((item) => {
                for (const [key, value] of Object.entries(item)) {
                    if (key === `id` || key === `created_at` || key === `updated_at` || key === `public_key` || key === `group`) continue;
                    if (value && value.toString().replace(/[()_-]/gi, ` `).toLowerCase().includes(search_query)) {
                        const { group, ...rest } = item;
                        if (!(`id` in item)) continue;
                        const result_key = item.id;
                        if (results_seen.has(result_key)) continue;
                        results_seen.add(result_key);
                        const reshaped_result: SearchServiceResult = {
                            id: item.id,
                            result_k: key,
                            result_v: value,
                            [group]: { ...rest },
                        };
                        results.push(reshaped_result);
                    }
                };
            });
        });
        return results;
    }
}
