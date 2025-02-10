export type ResolveEnumAreaUnitKey = `Ac` | `Ft2` | `Ha` | `M2`;

export const parse_enum_area_unit_key = (val: string): ResolveEnumAreaUnitKey | undefined => {
    switch (val) {
        case `ac`:
            return `Ac`;
        case `ft2`:
            return `Ft2`;
        case `ha`:
            return `Ha`;
        case `m2`:
            return `M2`;
        default:
            return undefined;
    }
};

export type ResolveEnumBudgetItemTypeKey = `CapitalInvestment` | `Equipment` | `Fees` | `Infrastructure` | `Insurance` | `Labor` | `Materials` | `Other` | `Supplies`;

export const parse_enum_budget_item_type_key = (val: string): ResolveEnumBudgetItemTypeKey | undefined => {
    switch (val) {
        case `capitalinvestment`:
            return `CapitalInvestment`;
        case `equipment`:
            return `Equipment`;
        case `fees`:
            return `Fees`;
        case `infrastructure`:
            return `Infrastructure`;
        case `insurance`:
            return `Insurance`;
        case `labor`:
            return `Labor`;
        case `materials`:
            return `Materials`;
        case `other`:
            return `Other`;
        case `supplies`:
            return `Supplies`;
        default:
            return undefined;
    }
};

export type ResolveEnumBudgetSpendingTypeKey = `Equipment` | `Labor` | `Maintenance` | `Other` | `Supplies` | `Utilities`;

export const parse_enum_budget_spending_type_key = (val: string): ResolveEnumBudgetSpendingTypeKey | undefined => {
    switch (val) {
        case `equipment`:
            return `Equipment`;
        case `labor`:
            return `Labor`;
        case `maintenance`:
            return `Maintenance`;
        case `other`:
            return `Other`;
        case `supplies`:
            return `Supplies`;
        case `utilities`:
            return `Utilities`;
        default:
            return undefined;
    }
};

export type ResolveEnumCredentialKey = `Email` | `Phone`;

export const parse_enum_credential_key = (val: string): ResolveEnumCredentialKey | undefined => {
    switch (val) {
        case `email`:
            return `Email`;
        case `phone`:
            return `Phone`;
        default:
            return undefined;
    }
};

export type ResolveEnumPaymentMethodKey = `Cash`;

export const parse_enum_payment_method_key = (val: string): ResolveEnumPaymentMethodKey | undefined => {
    switch (val) {
        case `cash`:
            return `Cash`;
        default:
            return undefined;
    }
};

export type ResolveEnumPaymentPeriodKey = `Biweekly` | `Hourly` | `Monthly` | `Weekly`;

export const parse_enum_payment_period_key = (val: string): ResolveEnumPaymentPeriodKey | undefined => {
    switch (val) {
        case `biweekly`:
            return `Biweekly`;
        case `hourly`:
            return `Hourly`;
        case `monthly`:
            return `Monthly`;
        case `weekly`:
            return `Weekly`;
        default:
            return undefined;
    }
};

export type ResolveEnumPaymentStatusKey = `Confirmed` | `Pending`;

export const parse_enum_payment_status_key = (val: string): ResolveEnumPaymentStatusKey | undefined => {
    switch (val) {
        case `confirmed`:
            return `Confirmed`;
        case `pending`:
            return `Pending`;
        default:
            return undefined;
    }
};

export type ResolveEnumQuantityUnitKey = `G` | `Kg` | `Lb` | `Ton`;

export const parse_enum_quantity_unit_key = (val: string): ResolveEnumQuantityUnitKey | undefined => {
    switch (val) {
        case `g`:
            return `G`;
        case `kg`:
            return `Kg`;
        case `lb`:
            return `Lb`;
        case `ton`:
            return `Ton`;
        default:
            return undefined;
    }
};

export type ResolveEnumRoleKey = `Admin` | `Guest` | `Internal` | `Member`;

export const parse_enum_role_key = (val: string): ResolveEnumRoleKey | undefined => {
    switch (val) {
        case `admin`:
            return `Admin`;
        case `guest`:
            return `Guest`;
        case `internal`:
            return `Internal`;
        case `member`:
            return `Member`;
        default:
            return undefined;
    }
};

export type ResolveEnumWorkerTypeKey = `Contractor` | `Laborer`;

export const parse_enum_worker_type_key = (val: string): ResolveEnumWorkerTypeKey | undefined => {
    switch (val) {
        case `contractor`:
            return `Contractor`;
        case `laborer`:
            return `Laborer`;
        default:
            return undefined;
    }
};