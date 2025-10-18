import { ReactNode } from "react";

export default interface App {
    name: string;
    version: string;
}

export default interface Auth {
    user: User;
    permissions: string[];
    roles: string[];
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface Pagination {
    from: number;
    to: number;
    total: number;
    current_page: number;
    next_page_url: string;
    prev_page_url: string;
    links: { active: boolean; label: string; url: string; page: number }[];
}

export interface ColumnDefinition<TData> {
    header: string;
    accessorKey?: string;
    id?: string;
    accessorFn?: (row: TData) => unknown;
    cell?: (row: TData) => React.ReactNode;
    filterable?: boolean;
    className?: string;
    listCell?: ReactNode;
    isActions?: boolean;
    sortable?: boolean;

}