export interface RecentSale {
    id: number;
    invoice_number: string;
    total_cost: number;
    date: string;
}

export interface lowStock {
    id: number;
    quantity_received: number;
    balance: number;
}
export interface SaleStatistics {
    salesValue: number;
    diff: number;
    percentageDiff: number;
}

export interface TopSales {
    id: number;
    customer: string;
    total: number;
    date: string;
}
export interface Debtor {
    id: number;
    name: string;
    balance: number;
    due_date: number;
}
