import CustomIndexPage from '@/components/custom/custom-index-page';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { ColumnDefinition, Pagination } from '@/types/app-types';
import { Head, router } from '@inertiajs/react';
import { route } from 'ziggy-js';

interface PaymentInterface extends Pagination {
    data: {
        id: number;
        method: string;
        amount: number;
        date: number;
        description: number;
        balance: number;
        sale: {
            id: number;
            invoice_number: string;
            status: string;
            total: number;
            customer: {
                user: {
                    name: string;
                    phone: string;
                };
            };
        };
    }[];
}

export default function index({ payments }: { payments: PaymentInterface }) {

    const columns: ColumnDefinition<any>[] = [
        {
            header: 'Sale No',
            id: 'sale_no',
            accessorKey: 'invoice_number',
            accessorFn: (row) => row.sale.invoice_number
        },
        {
            header: 'Date',
            accessorKey: 'date',
            cell: (row) => {
                return new Date(row.date).toLocaleDateString('en-Us', {
                    hour: 'numeric',
                    minute: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
            }
        },
        {
            header: 'Amount Paid',
            accessorKey: 'amount',
            id: 'amount_paid',
            accessorFn: (row) => {
                return Number(row.amount) + Number(row.sale.delivery_fee);
            },
            sortable: true
        },
        {
            header: 'Balance',
            id: 'balance',
            accessorKey: 'balance',
            cell: (row) => {
                const balance = row.balance;
                if (balance > 0) {
                    return (
                        <Badge className="min-w-1/2 hover:cursor-pointer" variant={'danger'}>
                            {balance} Ksh
                        </Badge>
                    );
                } else {
                    return (
                        <Badge onClick={() => router.get('/sales')} className="min-w-1/2 hover:cursor-pointer" variant={'success'}>
                            Cleared
                        </Badge>
                    );
                }
            },
            sortable: true
        },
        {
            header: 'Method',
            id: 'method',
            accessorKey: 'method',
            accessorFn: (row) => row.method,
            cell: (row) => {
                if (row.method == 'cash') {
                    return <Badge variant={'default'}>{row.method}</Badge>;
                } else if (row.method == 'mpesa') {
                    return <Badge variant={'success'}>{row.method}</Badge>;
                } else {
                    return <Badge variant={'danger'}>{row.method}</Badge>;
                }
            },
            sortable: true
        }
    ];
    return (
        <AppLayout>
            <Head title="Payments" />
            <CustomIndexPage
                Data={payments.data}
                Header={{ title: 'Payments' }}
                Columns={columns}
                paginate={{
                    from: payments.from,
                    to: payments.to,
                    total: payments.total,
                    next_page_url: payments.next_page_url,
                    prev_page_url: payments.prev_page_url,
                    links: payments.links,
                    current_page: payments.current_page
                }}
            />
        </AppLayout>
    );
}
