import CustomIndexPage from '@/components/custom/custom-index-page';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import AppLayout from '@/layouts/app-layout';
import { ColumnDefinition, Pagination } from '@/types/app-types';
import { Head } from '@inertiajs/react';

interface DeliveryInterface extends Pagination {
    data: {
        id: number;
        user: { name: string; phone: string };
        status: string;
        date: string;
    }[];
}

export default function Index({ deliveries }: { deliveries: DeliveryInterface }) {
    const deliveryColumns: ColumnDefinition<any>[] = [
        {
            header: 'Rider',
            id: 'user.name',
            accessorFn: (row) => row.user.name
        },
        {
            header: 'Phone',
            id: 'user.phone',
            accessorFn: (row) => row.user.phone
        },
        {
            header: 'Status',
            accessorKey: 'status',
            sortable: true,

            cell: (row) => {
                if (row.status === 'pending') {
                    return <Badge variant={'warning'}>{row.status}</Badge>;
                } else if (row.status === 'delivered') {
                    return <Badge variant={'success'}>{row.status}</Badge>;
                } else {
                    return <Badge variant={'danger'}>{row.status}</Badge>;
                }
            }
        },
        {
            header: 'Items details',
            cell: (row) => {
                console.log(row);
                return (
                    <Popover>
                        <PopoverTrigger className="rounded bg-primary p-0.5 text-secondary hover:cursor-pointer">See Delivery details</PopoverTrigger>
                        <PopoverContent className="flex max-h-30 flex-col gap-0.5 overflow-auto px-1 py-2 text-xs md:text-base">
                            <p className="text-center text-sm font-bold">Delivery Items</p>
                            {row.sales.map((sale, i) => (
                                <div className="py-1" key={sale.id}>
                                    <p className="w-fit border-b text-sm font-bold capitalize gap-2 overflow-hidden">
                                        {i + 1}. {sale.customer.user.name} <span className="font-thin">({sale.customer.estate} HsNo. {sale.customer.house_number})</span>
                                    </p>
                                    <ul>
                                        {sale.sale_items.map((item) => (
                                            <p className="ms-3 ps-1.5 border-0 border-s text-xs md:text-sm overflow-hidden" key={item.id}>
                                                {item.product.name} — {item.quantity}
                                                {item.product.unit}
                                            </p>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </PopoverContent>
                    </Popover>
                );
            }
        },
        {
            header: 'Date',
            accessorKey: 'date'
        },
        {
            header: 'Actions',
            isActions: true
        }
    ];

    return (
        <AppLayout>
            <Head title="Deliveries" />
            <CustomIndexPage
                Data={deliveries.data}
                Columns={deliveryColumns}
                Header={{
                    title: 'Deliveries',
                    button: {
                        label: 'Create Delivery',
                        onClick: () => {}
                    }
                }}
                paginate={{
                    from: deliveries.from,
                    to: deliveries.to,
                    total: deliveries.total,
                    links: deliveries.links,
                    next_page_url: deliveries.next_page_url,
                    prev_page_url: deliveries.prev_page_url,
                    current_page: deliveries.current_page
                }}
            />
        </AppLayout>
    );
}
