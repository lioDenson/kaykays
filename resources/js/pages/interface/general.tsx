import { LucideIcon } from "lucide-react";


export type BillCycle = 'weekly' | 'monthly' | 'yearly';
// Account interface
export interface AccountInterface {
    id: number;
    name: string;
    created_at?: string;
    created_by?: string;
    [key: string]: string | number | boolean | File | null | undefined;
}

export interface ProductInterface  {

    id: number;
    code: string;
    name: string;
    price: number;
    unit: string;
    created_at?: string;
    created_by?: string;
    [key: string]: string | number | boolean | File | null | undefined;
}

export interface RoleInterface {
    id: number;
    name: string;
    created_at?: string;
    created_by?: string;
    [key: string]: string | number | boolean | File | null | undefined;
}
export interface UserInterface {
    id: number;
    name: string;
    email: string;
    phone: string;
    account_id: number;
    role: RoleInterface;
    created_at?: string;
    [key: string]: string | number | boolean | File | null | undefined | RoleInterface ;
}

export interface Links {
    label: string;
    href: string;
    icon ?: LucideIcon;
}

export interface RiderInterface{
    user: UserInterface;
    vehicle_number: string;
    status:'active' | 'inactive' | 'suspended';
    created_at?: string;
    [key: string]: string | number | boolean  | null | undefined   | UserInterface;
}

export interface CustomerInterface{
    user: UserInterface;
    street: string;
    house_number: string;
    bill_cycle: BillCycle;
    estate: string,
    [key: string]: string | number | boolean  | null | undefined   | UserInterface | BillCycle;
}