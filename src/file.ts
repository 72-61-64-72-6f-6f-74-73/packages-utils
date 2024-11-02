import type { FileBytesFormat } from "./types";

export const parse_file_name = (file_path: string): string => {
    const file_path_dirs = file_path.split(`/`);
    if (file_path_dirs.length > 0) return file_path_dirs[file_path_dirs.length - 1];
    return ``
};

export const format_file_bytes = (num_bytes: number, format: FileBytesFormat): string => {
    if (num_bytes < 0) throw new Error(`Number of bytes cannot be negative`);
    let factor: number;
    switch (format) {
        case 'kb':
            factor = 1024;
            break;
        case 'mb':
            factor = 1024 ** 2;
            break;
        case 'gb':
            factor = 1024 ** 3;
            break;
    }
    const result = num_bytes / factor;
    return `${result.toFixed(2)} ${format.toUpperCase()}`;
};
