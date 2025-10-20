import CustomIndexPage from '@/components/custom/custom-index-page';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { ColumnDefinition, Pagination } from '@/types/app-types';
import { Head } from '@inertiajs/react';

interface CreditInterface extends Pagination {
    data: {
        id: number;
        due_date: string;
        amount: number;
        status: 'pending' | 'paid' | 'overdue';
        description: string;
        sale: {
            invoice_number: string;
            amount: number;
            paid: number;
            balance: number;
            total: number;
        };
        customer: {
            user: {
                name: string;
                phone: string;
            };
        };
    }[];
}
export default function index({ credits }: { credits: CreditInterface }) {
    const saleColumns: ColumnDefinition<any>[] = [
        {
            header: 'Invoice #',
            id: 'sale.invoice_number',
            sortable: true,
            filterable: true,
            accessorFn: (row) => row.sale.invoice_number
        },
        {
            header: 'Customer',
            id: 'customer.user.name',
            sortable: true,
            filterable: true,
            accessorFn: (row) => row.customer?.user?.name ?? 'Walk in'
        },
        {
            header: 'Cost (Ksh)',
            id: 'sale.amount',
            accessorFn: (row) => {
                // calculate the cost  of the sale (add cost of item and the delivery fee).
                return Number(row.sale.total) + Number(row.sale.delivery_fee);
            },
            filterable: false
        },

        {
            header: 'Paid Amt. (Ksh)',
            id: 'sale.paid',
            accessorFn: (row) => row.sale.paid,
            filterable: true
        },
        {
            header: 'Balance (Ksh)',
            id: 'sale.balance',
            accessorFn: (row) => row.sale.balance
        },
        {
            header: 'Payment Status',
            id: 'status',
            filterable: false,
            accessorKey: 'status',
            cell: (row) => {
                if (row.status === 'pending') {
                    return <Badge variant={'success'}>Pending</Badge>;
                }
            }
        },
        {
            header: 'Actions',
            accessorKey: 'actions',
            isActions: true
        }
    ];
    return (
        <AppLayout>
            <Head title="Credits" />
            <CustomIndexPage
                Header={{ title: 'Credits' }}
                Data={credits.data}
                Columns={saleColumns}
                emptyText="No credits found."
                paginate={{
                    from: credits.from,
                    to: credits.to,
                    total: credits.total,
                    links: credits.links,
                    next_page_url: credits.next_page_url,
                    prev_page_url: credits.prev_page_url,
                    current_page: credits.current_page
                }}
                handleEdit={(credit) => {
                    console.log(credit);
                }}
            />
        </AppLayout>
    );
}
