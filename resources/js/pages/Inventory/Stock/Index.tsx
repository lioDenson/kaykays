import CustomIndexPage from '@/components/custom/custom-index-page';
import { FlashMessage } from '@/components/custom/custom-toaster';
import AppLayout from '@/layouts/app-layout';
import { ColumnDefinition } from '@/types/app-types';
import { router, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { route } from 'ziggy-js';

export default function Index({ stocks }: { stocks: [] }) {
    const flash = usePage().props.flash as FlashMessage;

    const handleCreate = () => {
        router.get(route('batches.create'));
    };
    const handleEdit = (stock: any) => {
        router.get(route('stocks.edit', stock.id), stock);
    };

    const columns: ColumnDefinition<any>[] = [
        {
            header: 'Code',
            accessorKey: 'batch_number',
            sortable: true
        },
        {
            header: 'Product',
            id: 'product.name',
            accessorFn: (row) => row.product?.name,
            sortable: true
        },
        {
            header: 'Price',
            accessorKey: 'product.price',
            sortable: true
        },
        {
            header: 'Available',
            accessorKey: 'balance',
            sortable: true
        },
        {
            header: 'Unit',
            accessorKey: 'product.unit',
            sortable: true
        },
        {
            header: 'Actions',
            isActions: true
        }
    ]

    console.log(stocks)
    return (
        <AppLayout>
            <CustomIndexPage
                Header={{
                    title: 'Stock',
                    button: {
                        label: 'Add Stock',
                        icon: Plus,
                        onClick: () => {
                            handleCreate();
                        }
                    }
                }}
                Data={stocks}
                Columns={columns}
                handleEdit={(stock: any) => {
                    handleEdit(stock);
                }}
                handleDelete={(stock: any) => {}}
                flashData={flash}
            />
        </AppLayout>
    );
}
