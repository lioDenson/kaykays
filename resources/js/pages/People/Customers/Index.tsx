import CustomIndexPage from '@/components/custom/custom-index-page';
import AppLayout from '@/layouts/app-layout';
import { CustomerInterface } from '@/pages/interface/general';
import { Head, router, usePage } from '@inertiajs/react';
import { UserPlus } from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';

interface CustomesrProps {
    data: {
        customer: CustomerInterface
    }
}

export default function Index({ customers }: { customers: CustomesrProps }) {
    const [deleting, setDeleting] = useState(false);
    const flash = usePage().props.flash;
    const actions = usePage().props.actions;

    console.log(customers);

    return (
        <AppLayout>
            <Head title="Customers" />
            <CustomIndexPage
                Data={customers}
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
                tableProps={{
                    TableHeader: ['Name', 'Email', 'Phone', 'Address', 'Actions'],
                    TableBody: [],
                    Columns: ['user.name', 'user.email', 'user.phone', 'address', 'actions']
                }}
                handleEdit={(data: CustomerInterface) => {
                    router.get(`/customers/${data.id}/edit`, {});
                }}
                handleDelete={(customer: CustomerInterface) => {
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
