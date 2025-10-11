import CustomIndexPage from '@/components/custom/custom-index-page';
import AppLayout from '@/layouts/app-layout';
import { RiderInterface } from '@/pages/interface/general';
import { ColumnDefinition, Pagination } from '@/types/app-types';
import { Head, router, usePage } from '@inertiajs/react';
import { BikeIcon, PieChart, Plus } from 'lucide-react';
import { route } from 'ziggy-js';

interface RiderProps extends Pagination {
    data: {
        rider: RiderInterface[];
    };
}

const columns: ColumnDefinition<any>[] = [
    {
        header: 'Name',
        accessorFn: (row) => row.user.name,
        sortable: true
    },
    {
        header: 'Email',
        accessorFn: (row) => row.user.email,
    },
    {
        header: 'Phone',
        accessorFn: (row) => row.user.phone,
    },
    {
        header: 'Vehicle Number',
        accessorFn: (row) => row.vehicle_number,
        
    },
    {
        header: 'Actions',
        isActions:true,
    }
];

export default function Index({ riders }: { riders: RiderProps }) {
    const flash = usePage().props.flash;
    const actions = usePage().props.actions;
    return (
        <AppLayout
            links={[
                { label: 'Dashboard', href: route('dashboard'), icon: PieChart },
                { label: 'Add Rider', href: route('riders.create'), icon: BikeIcon }
            ]}
        >
            <Head title="Riders" />
            <CustomIndexPage
                flashData={flash}
                actionsData={actions}
                Header={{
                    title: 'Riders',
                    button: {
                        label: 'Add Rider',
                        icon: Plus,
                        onClick: () => {
                            router.get(route('riders.create'));
                        }
                    }
                }}
                Data={riders.data}
                Columns={columns}
                paginate={
                    {
                        from: riders.from,
                        to: riders.to,
                        total: riders.total,
                        links: riders.links,
                        current_page: riders.current_page,
                        prev_page_url: riders.prev_page_url,
                        next_page_url: riders.next_page_url,
                    }
                }
                handleEdit={(data: RiderInterface) => {
                    router.get(`/riders/${data.id}/edit`, {
                        preserveState: true,
                        preserveScroll: true,
                        replace: true
                    });
                }}
                handleDelete={(data: RiderInterface) => {
                    router.delete(`/riders/${data.id}`, {
                        preserveState: true,
                        preserveScroll: true,
                        replace: true
                    });
                }}
            />
        </AppLayout>
    );
}
