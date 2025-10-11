import CustomIndexPage from '@/components/custom/custom-index-page';
import CustomPagination from '@/components/custom/custom-pagination';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { ColumnDefinition, Pagination } from '@/types/app-types';
import { Head } from '@inertiajs/react';

interface DeliveryInterface extends Pagination {
    data: {
        id: number;
        user: { name: string; phone: string };
        status: string;
        total: number;
        date: string;
    }[];
}

const deliveryColumns: ColumnDefinition<any>[] = [
    {
        header: 'Rider',
        id: 'user.name'
        , accessorFn: (row) => row.user.name
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
                return (<Badge variant={'warning'}>{row.status}</Badge>)
            } else if (row.status === 'delivered') {
                return (<Badge variant={'success'}>{row.status}</Badge >)
            } else {
                return (<Badge variant={'danger'}>{row.status}</Badge >)
            }
        }
    },
    {
        header: 'Total',
        accessorKey: 'total'
    },
    {
        header: 'Date',
        accessorKey: 'date'
    },
    {
        header: 'Actions',
        isActions: true
    }
    
]

export default function Index({ deliveries }: { deliveries: DeliveryInterface }) {
    console.log(deliveries);
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
                paginate={
                    {
                        from: deliveries.from,
                        to: deliveries.to,
                        total: deliveries.total,
                        links: deliveries.links,
                        next_page_url: deliveries.next_page_url,
                        prev_page_url: deliveries.prev_page_url,
                        current_page: deliveries.current_page
                    }
                }
            />
        </AppLayout>
    );
}
