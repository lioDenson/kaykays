import CustomIndexPage from '@/components/custom/custom-index-page';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { ColumnDefinition, Pagination } from '@/types/app-types';
import { Head } from '@inertiajs/react';

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
    console.log(payments);

    const columns: ColumnDefinition<any>[] = [
        {
            header: 'Sale No',
            id: 'sale_no',
            accessorFn: (row) => row.sale.invoice_number
        },
        {
            header: 'Sale Amount',
            id: 'sale_amount',
            accessorFn: (row) => {
                return Number(row.amount) + Number(row.sale.delivery_fee);
            },
            sortable: true,
        },
        {
            header: 'Balance',
            accessorFn: (row) => row.sale.balance,
            sortable: true,
        },
        {
            header: 'Method',
            id: 'method',
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
            sortable: true, 
        },
        {
            header: 'Status',
            id: 'status',
            accessorFn: (row) => row.sale.status,
            cell: (row) => {
                if (row.sale.status == 'partial') {
                    return <Badge variant={'warning'} className='capitalize'>{row.sale.status}</Badge>;
                } else if (row.sale.status == 'paid') {
                    return <Badge variant={'info'}>Cleared</Badge>;
                } else {
                    return <Badge variant={'danger'}>{row.sale.status}</Badge>;
                }
            },
            sortable: true,
        },
        {
            header: 'Date',
            accessorKey: 'date',
            sortable: true,
        },
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
