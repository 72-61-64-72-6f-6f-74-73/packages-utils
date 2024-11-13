export const list_remove_index = <T>(array: T[], index: number): T[] => {
    if (index < 0 || index >= array.length) throw new Error(`Index out of bounds`);
    return [...array.slice(0, index), ...array.slice(index + 1)];
};

export const list_move_index = <T>(array: T[], index_start: number, index_end: number): T[] => {
    if (index_start < 0 || index_start >= array.length || index_end < 0 || index_end >= array.length) throw new Error(`Index out of bounds`);
    const item = array[index_start];
    const newArray = array.filter((_, index) => index !== index_start);
    const adjustedIndexEnd = index_end > index_start ? index_end - 1 : index_end;
    return [
        ...newArray.slice(0, adjustedIndexEnd),
        item,
        ...newArray.slice(adjustedIndexEnd)
    ];
};

export const list_assign = (list_curr: string[], list_new: string[]): string[] => {
    return Array.from(
        new Set([...list_curr, ...list_new]),
    ).filter((i) => !!i);
};
