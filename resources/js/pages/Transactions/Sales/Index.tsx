import CustomIndexPage from '@/components/custom/custom-index-page';
import CustomPagination from '@/components/custom/custom-pagination';
import CustomToaster from '@/components/custom/custom-toaster';
import AppLayout from '@/layouts/app-layout';
import { ColumnDefinition } from '@/types/app-types';
import { Head, router, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { SaleInterface } from './sale-interfaces';
import { Badge } from '@/components/ui/badge';

export default function Index({ sales }: { sales: SaleInterface }) {
    const { flash } = usePage().props as any;
    const handleCreateSale = () => {
        router.get(route('sales.create'));
    };
    console.log(sales);

    const saleColumns: ColumnDefinition<any>[] = [
        {
            header: 'Sale No',
            accessorFn: (row) => row.invoice_number,
            id: 'invoice_number',
            cell: (row) => {
                return <span className="text-blue-600 hover:underline"> {row.invoice_number}</span>;
            },
            filterable: true,
            sortable:true,
            
        },
        {
            header: 'Customer',
            accessorFn: (row) => row.customer?.user?.name || 'Unknown'
            , cell: (row) => {
                if (row.customer == null) {
                    return <Badge variant={'danger'}>{ 'Not Found'}</Badge>;
                }
                return row.customer?.user?.name;
            }
        },
        {
            header: 'Date',
            accessorKey: 'date'
        },
        {
            header: 'Amount',
            accessorKey: 'total',
            sortable:true,
        },
        {
            header: 'Status',
            id: 'status',
            accessorKey: 'status',
            cell: (row) => {
                if (row.status === 'unpaid') {
                    return <Badge variant={'warning'}>{row.status}</Badge>;
                } else if (row.status === 'paid') {
                    return <Badge variant={'success'}>{row.status}</Badge>;
                } else if (row.status === 'partial') {
                    return <Badge variant={'default'}>{row.status}</Badge>;
                } else {
                    return <Badge variant={'danger'}>{row.status}</Badge>;
                }
            },
            sortable:true,
        },
        {
            header: 'Delivery',
            id: 'is_delivery',
            cell: (row) => {
                if (row.is_delivery) {
                    return <Badge variant={'warning'}>Delivery</Badge>;
                } else {
                    return <Badge variant={'default'}>Pickup</Badge>;
                }
            }
        },
        {
            header: 'Actions',
            isActions: true
        }
    ];
    return (
        <AppLayout>
            <Head title="Sales" />
            <CustomToaster flash={flash} />
            <CustomIndexPage
                Data={sales.data}
                Header={{
                    title: 'Sales',
                    button: {
                        label: 'Create Sale',
                        onClick: () => {
                            handleCreateSale();
                        }
                    }
                }}
                Columns={saleColumns}
                paginate={
                    {
                        from: sales.from,
                        to: sales.to,
                        total: sales.total,
                        links: sales.links,
                        next_page_url: sales.next_page_url,
                        prev_page_url: sales.prev_page_url,
                        current_page: sales.current_page
                    }
                }
            />
        </AppLayout>
    );
}
