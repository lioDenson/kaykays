import { Pagination } from "@/types/app-types";

export interface customerInterface {
    id: number;
    user: {
        name: string;
        phone: string;
    };
    street: string;
    house_number: string;
    estate: string;
    bill_cycle: string;
}

export interface ProductInterface {
    id: number;
    batch_number: string;
    product: {
        name: string;
        price: number;
        unit: string;
    };
    balance: number;
    unit: string;
    display_name: string;
    price: number;
    name: string;
}

export interface DeliveryInterface {
    id: number;
    rider: {
        user: {
            id: string;
            name: string;
        };
    };
    status: string;
    total: number;
    description?: string;
}

export interface saleItem {
    id: number | null;
    index: number;
    quantityRaw?: number | string;
    quantity: number | string;
    price: number;
    subTotal: number;
    unit: string;
    batchNumber: string;
    name: string;
    display_name: string;
}

export interface RiderInterface {
    id: number;
    user: {
        id: number;
        name: string;
    };
}

export interface DeliveryDataInterface {
    status: string;
    delivery_id: number | null;
    rider_id: number | null;
    description: string;
}


export interface SaleInterface extends Pagination {
    
    data: {
        status: string;
        total: number;
        batch_number: string;
        is_delivery: boolean;
        customer: {
            id: number;
            name: string;
        } | null;
        saleItem: {
            id: number;
            quantity: number;
            batch_id: number;
        };
    };
}
