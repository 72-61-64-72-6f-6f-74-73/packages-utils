import { sleep, ThemeLayer } from "$root";

export const el_id = (id: string): HTMLElement | undefined => {
    const el = document.getElementById(id);
    return el ? el : undefined;
};

export const el_toggle = (id: string, toggle_class: string): void => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle(toggle_class);
};

export const els_id_pref = (id_pref: string): Element[] | undefined => {
    const els = document.querySelectorAll(`[id^="${id_pref}"]`);
    if (els && els.length) return Array.from(els);
    return undefined;
};

export const els_id_pref_index = (id_pref: string, num_index: number, orientation: `greater` | `lesser` | `not` = `greater`, inclusive: boolean = true): Element[] | undefined => {
    const els = document.querySelectorAll(`[id^="${`${id_pref}-`.replaceAll(`--`, `-`)}"]`);
    if (els && els.length) return Array.from(els).filter(el => {
        const match = el.id.match(/(?<=^|\-)[0-9]\d*(?=\-)/)
        if (match) {
            const num = parseInt(match[0], 10);
            switch (orientation) {
                case `greater`: {
                    if (inclusive) return num >= num_index;
                    else return num > num_index;
                }
                case `lesser`: {
                    if (inclusive) return num <= num_index;
                    else return num < num_index;
                }
                case `not`: {
                    return num !== num_index;
                }
            }
        }
        return false;
    });
    return undefined;
};

export const el_focus = async (id: string, callback: () => Promise<void>, layer: ThemeLayer = 1): Promise<void> => {
    const el = el_id(id);
    el?.classList.add(`entry-layer-${layer}-highlight`);
    el?.focus();
    await sleep(1200);
    await callback();
    el?.classList.remove(`entry-layer-${layer}-highlight`);
};
