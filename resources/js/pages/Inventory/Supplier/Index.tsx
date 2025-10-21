import CustomIndexPage from '@/components/custom/custom-index-page';
import { FlashMessage } from '@/components/custom/custom-toaster';
import AppLayout from '@/layouts/app-layout';
import { SupplierInterface } from '@/pages/interface/general';
import { ColumnDefinition } from '@/types/app-types';
import { Head, router, usePage } from '@inertiajs/react';
import { UserSquare } from 'lucide-react';
import { route } from 'ziggy-js';

const columns: ColumnDefinition<any>[] = [
    {
        header: 'Name',
        accessorFn: (row) => row.company_name,
        id: 'company_name',
        sortable: true
    },
    {
        header: 'Contact Person',
        accessorFn:(row) => row.contact_person,
        id: 'contact_person',
        sortable: true
    },
    {
        header: 'Email',
        accessorKey: 'email',
        id: 'email',
    },
    {
        header: 'Phone',
        accessorKey: 'phone',
        id: 'phone',
    },
    {
        header: 'Address',
        accessorKey: 'address',
        id: 'address',
    },
    {
        header: 'Actions',
        isActions: true,
        id: 'actions'
    }
];

export default function Index({ suppliers }: { suppliers: SupplierInterface[] }) {
   const {flash} = usePage().props as unknown  as {flash: FlashMessage};
    return (
        <AppLayout>
            <Head title="Suppliers" />
            <CustomIndexPage
                flashData={flash}
                Columns={columns}
                Data={suppliers}
                Header={{
                    title: 'Suppliers',
                    button: {
                        label: 'Create Supplier',
                        icon: UserSquare,
                        onClick: () => {
                            router.visit(route('suppliers.create'));
                        }
                    }
                }}
            />
        </AppLayout>
    );
}
