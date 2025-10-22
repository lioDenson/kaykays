import CustomIndexPage from '@/components/custom/custom-index-page';
import CustomToaster from '@/components/custom/custom-toaster';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { ColumnDefinition } from '@/types/app-types';
import { Head, router, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { SaleInterface } from './sale-interfaces';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function Index({ sales }: { sales: SaleInterface }) {
    const { flash } = usePage().props as any;
    const handleCreateSale = () => {
        router.get(route('sales.create'));
    };

    

    const saleColumns: ColumnDefinition<any>[] = [
        {
            header: 'Sale No',
            accessorFn: (row) => row.invoice_number,
            id: 'invoice_number',
            cell: (row) => {
                console.log(row.sale_items);
                return (
                    <Popover>
                        <PopoverTrigger>
                            <span className="text-blue-600 hover:cursor-pointer p-0.5"> {row.invoice_number}</span>
                        </PopoverTrigger>
                        <PopoverContent>
                            <p className="text-sm font-bold">Sale Items</p>

                            {row.sale_items.map((item, i) => {
                                return (
                                    <p className="text-xs md:text-sm">
                                        {i + 1}. {item.product.name} - {item.quantity}
                                        {item.product.unit}
                                    </p>
                                );
                            })}
                        </PopoverContent>
                    </Popover>
                );
            },
            filterable: true,
            sortable: true
        },
        {
            header: 'Customer',
            accessorFn: (row) => row.customer?.user?.name || 'Unknown',
            cell: (row) => {
                if (row.customer == null) {
                    return <Badge variant={'danger'}>{'Not Found'}</Badge>;
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
            sortable: true
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
            sortable: true
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
                paginate={{
                    from: sales.from,
                    to: sales.to,
                    total: sales.total,
                    links: sales.links,
                    next_page_url: sales.next_page_url,
                    prev_page_url: sales.prev_page_url,
                    current_page: sales.current_page
                }}
            />
        </AppLayout>
    );
}
