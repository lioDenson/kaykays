import CustomIndexPage from '@/components/custom/custom-index-page';
import AppLayout from '@/layouts/app-layout';
import { Links, ProductInterface } from '@/pages/interface/general';
import { ColumnDefinition, Pagination } from '@/types/app-types';
import { router, usePage } from '@inertiajs/react';
import { PieChart, Plus } from 'lucide-react';
import { route } from 'ziggy-js';

interface ProductProps extends Pagination {
    data: {
        products: ProductInterface[];
    };
}

export default function Product({products}:{products: ProductProps}) {
    const {flash} = usePage().props.flash;
    const {actions} = usePage().props.actions;
    const handleCreate = () => {
        router.get(route('products.create'));
    };
    const links: Links[] = [
        { label: 'Add Product', href: route('products.create'), icon: Plus },
        { label: 'Dashboard', href: route('dashboard'), icon: PieChart }
    ];

    const columns: ColumnDefinition<any>[] = [
        {
            header: 'Code',
            accessorKey: 'code'
        },
        {
            header: 'Name',
            accessorKey: 'name',
        },
        {
            header: 'Price',
            accessorKey: 'price',
        },
        {
            header: 'Unit',
            accessorKey: 'unit',
        },
        {
            header: 'Actions',
            isActions: true
        }
    ]
    return (
        <AppLayout links={links}>
            <CustomIndexPage
                Header={{
                    title: 'Product',
                    button: {
                        label: 'Add Product',
                        icon: Plus,
                        onClick: () => {
                            handleCreate();
                        }
                    }
                }}
                Data={products.data}
                Columns={columns}
                paginate={
                    {
                        from: products.from,
                        to: products.to,
                        total: products.total,
                        links: products.links,
                        next_page_url: products.next_page_url,
                        prev_page_url: products.prev_page_url,
                        current_page: products.current_page
                    }
                }
                flashData={flash}
                actionsData={actions}
                
                handleEdit={(data: ProductInterface) => {
                    router.get(`/products/${data.id}/edit`, {
                        preserveState: true,
                        preserveScroll: true,
                        replace: true
                    });
                }}
                handleDelete={(data: ProductInterface) => {
                    router.delete(`/products/${data.id}`, {
                        preserveState: true,
                        preserveScroll: true,
                        replace: true
                    });
                }}
            />
        </AppLayout>
    );
}
