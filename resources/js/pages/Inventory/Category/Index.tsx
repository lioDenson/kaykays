import CustomIndexPage from '@/components/custom/custom-index-page';
import { FlashMessage } from '@/components/custom/custom-toaster';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { ColumnDefinition } from '@/types/app-types';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import Create from './create';

interface CategoriesInterface {
    name: string;
    description: string;
}

export default function Index({ categories }: { categories: CategoriesInterface[] }) {
    const columns: ColumnDefinition<any>[] = [
        {
            header: 'Name',
            accessorKey: 'name',
            id: 'name',
            sortable: true,
            filterable: true
        },
        {
            header: 'Description',
            accessorKey: 'description',
            id: 'description'
        },
        {
            header: 'Actions',
            accessorKey: 'actions',
            id: 'actions',
            isActions: true,
        }
    ];

    const errors = usePage().props.errors;

    const flash = usePage().props.flash;
    const actions = usePage().props.actions;

    const [open, setOpen] = useState(false);

    return (
        <AppLayout>
            <CustomIndexPage
                Columns={columns}
                Data={categories}
                flashData={flash as FlashMessage}
                Header={{
                    title: 'Categories',
                    description: 'Your product categories',
                    button: {
                        label: 'Create Category',
                        onClick: () => setOpen(true)
                    }
                }}
            >
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="space-y-6 bg-gradient-to-br from-slate-50 via-blue-50/90 to-cyan-50/80 p-6 transition-colors duration-500 md:p-6 dark:from-gray-500 dark:via-purple-700/90 dark:to-violet-800/50">
                        <DialogTitle className="text-center text-2xl font-bold">Create New Category</DialogTitle>
                        <Create errors={errors} callBack={() => setOpen(false)} />
                    </DialogContent>
                </Dialog>
            </CustomIndexPage>
        </AppLayout>
    );
}
