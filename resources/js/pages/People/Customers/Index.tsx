import { ActionsProps } from '@/components/custom/custom-action-toaster';
import CustomIndexPage from '@/components/custom/custom-index-page';
import { FlashMessage } from '@/components/custom/custom-toaster';
import AppLayout from '@/layouts/app-layout';
import { CustomerInterface } from '@/pages/interface/general';
import { ColumnDefinition } from '@/types/app-types';
import { Head, router, usePage } from '@inertiajs/react';
import { UserPlus } from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';

interface CustomersProp {
    data: {
        customer: CustomerInterface;
    };
}

export default function Index({ customers }: { customers: Record<string, unknown> }) {
    const [deleting, setDeleting] = useState(false);
    const flash = usePage().props.flash as FlashMessage;
    const actions = usePage().props.actions as ActionsProps;

    const columns: ColumnDefinition<any>[] = [
        {
            header: 'Name',
            accessorKey: 'user.name',
            sortable: true
        },
        {
            header: 'Email',
            accessorKey: 'user.email'
        },
        {
            header: 'Phone',
            accessorKey: 'user.phone'
        },
        {
            header: 'Address',
            accessorKey: 'address'
        },
        {
            header: 'Actions',
            isActions: true
        }
    ];

    return (
        <AppLayout>
            <Head title="Customers" />
            <CustomIndexPage
                Data={customers.data}
                flashData={flash}
                actionsData={actions}
                Header={{
                    title: 'Customers',
                    button: {
                        label: 'Add Customer',
                        icon: UserPlus,
                        onClick: () => {
                            router.get(route('customers.create'));
                        }
                    }
                }}
                Columns={columns}
                handleInfo={(data) => {
                    router.get(route('customers.show', data.id))
                }}
                handleEdit={(data) => {
                    router.get(`/customers/${data.id}/edit`, {});
                }}
                handleDelete={(customer) => {
                    setDeleting(true);
                    if (deleting) return;
                    router.delete(route('customers.destroy', customer.id), {
                        onFinish: () => {
                            setTimeout(() => {
                                setDeleting(false);
                            }, 1000);
                        }
                    });
                }}
            />
        </AppLayout>
    );
}
