export const list_remove_index = <T>(array: T[], index: number): T[] => {
    if (index < 0 || index >= array.length) throw new Error(`Index out of bounds`);
    return [...array.slice(0, index), ...array.slice(index + 1)];
};

export const list_move_index = <T>(array: T[], index_start: number, index_end: number): T[] => {
    if (index_start < 0 || index_start >= array.length || index_end < 0 || index_end >= array.length) throw new Error(`Index out of bounds`);
    const item = array[index_start];
    const arr_new = array.filter((_, index) => index !== index_start);
    const adjusted_final_index = index_end > index_start ? index_end - 1 : index_end;
    const arr_res: T[] = arr_new.slice(0, adjusted_final_index);
    if (item) arr_res.push(item)
    arr_res.push(...arr_new.slice(adjusted_final_index))
    return arr_res;
};

export const list_assign = (list_curr: string[], list_new: string[]): string[] => {
    return Array.from(
        new Set([...list_curr, ...list_new]),
    ).filter((i) => !!i);
};
