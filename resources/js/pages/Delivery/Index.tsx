import CustomIndexPage from '@/components/custom/custom-index-page';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import AppLayout from '@/layouts/app-layout';
import { ColumnDefinition, Pagination } from '@/types/app-types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect } from 'react';
import { route } from 'ziggy-js';


interface DeliveryInterface extends Pagination {
    data: {
        id: number;
        user: { name: string; phone: string };
        status: string;
        date: string;
    }[];
}

export default function Index({ deliveries }: { deliveries: DeliveryInterface }) {

    useEffect(() => {
        if (deliveries.data.length > 0) {
            const fetchedDeliveryDetails = async () => {
                try {
                    const response = await axios.get(route('delivery.details'), {
                        timeout: 10000,
                    });
                
                } catch (error) {
                    console.log(error);
                }
        }
        }
    }, []);

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
                return (
                    <Popover>
                        <PopoverTrigger className="rounded bg-primary p-0.5 text-secondary hover:cursor-pointer">See Delivery details</PopoverTrigger>
                        <PopoverContent className="flex max-h-30 flex-col gap-0.5 overflow-auto px-1 py-2 text-xs md:text-base">
                            {/* <p className="w-full h-full max-w-full truncate p-2 font-semibold">Delivery description </p> */}
                            <p>1. User Name Milk 5l.</p>
                            <p>1. User Name Milk 5l.</p>
                            <p>1. User Name Milk 5l.</p>
                            <p>1. User Name Milk 5l.</p>
                            <p>1. User Name Milk 5l.</p>
                            <p>1. User Name Milk 5l.</p>
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
