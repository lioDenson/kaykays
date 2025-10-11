import CustomIndexPage from '@/components/custom/custom-index-page';
import AppLayout from '@/layouts/app-layout';
import { ColumnDefinition } from '@/types/app-types';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { route } from 'ziggy-js';
import { AccountInterface } from '../interface/general';

export default function Index({ accounts }: { accounts?: AccountInterface[] }) {
    const { flash } = usePage().props as any;
    const { actions } = usePage().props as any;
    const [deleting, setDeleting] = useState(false);
    const handleCreate = () => {
        router.get('/accounts/create');
    };

    const handleInfo = () => {};
    const handleEdit = (account: AccountInterface) => {
        router.get(`/accounts/${account.id}/edit`, {
            preserveState: true,
            preserveScroll: true,
            replace: true
        });
    };

    const handleDelete = (account: AccountInterface) => {
        if (deleting) return;
        router.delete(route('accounts.destroy', account.id), {
            onFinish: () => {
                setTimeout(() => {
                    setDeleting(false);
                }, 1000);
            }
        });
    };

    console.log(accounts);

   const columns: ColumnDefinition<any>[] = [
        {
            header: 'Name',
            accessorKey: 'name',
            sortable: true
       },
       {
           header: 'Date created',
           accessorKey: 'created_at',
           sortable: true
       },
       {
            header: 'Actions',
            isActions: true
       
       }
   ]

    return (
        <AppLayout>
            <Head title="Accounts" />
            <CustomIndexPage Data={accounts} Header={{ title:'Accounts' }}Columns={columns} flashData={flash} actionsData={actions} handleCreate={handleCreate} handleEdit={handleEdit} handleDelete={handleDelete} handleInfo={handleInfo} />
        </AppLayout>
    );
}
