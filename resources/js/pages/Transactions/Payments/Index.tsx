import CustomIndexPage from '@/components/custom/custom-index-page';
import CustomPagination from '@/components/custom/custom-pagination';
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
            accessorFn: (row)=> row.sale.invoice_number,
        },
        {
            header: 'Customer',
            id: 'customer',
            accessorFn: (row)=> row.sale?.customer?.user?.name || 'Walk In',
        },
        {
            header: 'Sale Amount',
            id: 'sale_amount',
            accessorFn: (row)=> row.amount,
        }, 
        // {
        //     header: 'Balance',
        //     accessorFn: (row)=> row.sale.balance,
        // },
        {
            header: 'Method',
            id: 'method',
            accessorFn: (row) => row.method,
            cell: (row) => {
                if (row.method == 'cash') {
                    return (
                        <Badge variant={'warning'}>
                            {row.method}
                        </Badge>
                    )
                } else if (row.method == 'mpesa') {
                    return (
                        <Badge variant={'success'}>
                            {row.method}
                        </Badge>
                    )
                    } else {
                    return (
                        <Badge variant={'danger'}>
                            {row.method}
                        </Badge>
                    )
                }
            }
        }, {
            header: 'Date',
            accessorKey: 'date->formatDate(DD/MM/YYYY)'
        },
        {
            header: 'Actions',
            isActions: true,
        }
    ]
    return (
        <AppLayout>
            <Head title="Payments" />
            <CustomIndexPage
                Data={payments.data}
                Header={ {title: 'Payments'}}
                Columns={columns}
                paginate={
                    {
                        from: payments.from,
                        to: payments.to,
                        total: payments.total,
                        next_page_url: payments.next_page_url,
                        prev_page_url: payments.prev_page_url,
                        links: payments.links,
                        current_page: payments.current_page,
                    }
                }
            />
        </AppLayout>
    );
}
