import CustomIndexPage from '@/components/custom/custom-index-page';
import AppLayout from '@/layouts/app-layout';
import { UserInterface } from '@/pages/interface/general';
import { ColumnDefinition, Pagination } from '@/types/app-types';
import { router, usePage } from '@inertiajs/react';
import { ContactRound, PieChart, UserCog, UserPlus } from 'lucide-react';
import { route } from 'ziggy-js';

interface UserProps extends Pagination {
    data: {
        user: UserInterface[];
    };
}

export default function Index({ users, rolling }: { users: UserProps; rolling: boolean }) {
    console.log(rolling);
    const flash = usePage().props.flash;
    const actions = usePage().props.actions;
    const handleCreate = () => {
        if (rolling) {
            router.visit(route('users.roles'));

        } else {
            router.get(route('users.create'));
        }
    };
    const handleEdit = (user: UserInterface) => {
        router.get(route('users.edit', user.id), user);
    };

    const handleDelete = (user: UserInterface) => {
        router.delete(route('users.destroy', user.id));
    };

    const handleInfo = (user: UserInterface) => {
        router.get(route('users.show', user.id), user);
        console.log(user);
    };

    const columns: ColumnDefinition<any>[] = [
        {
            header: 'Name',
            accessorKey: 'name',
            sortable: true
        },
        {
            header: 'Email',
            accessorKey: 'email'
        },
        {
            header: 'Phone',
            accessorKey: 'phone'
        },
        // {
        //     header: 'Role',
        //     id: 'role',
        //     accessorKey: 'roles',
        //     cell: ({ row }) => {
        //         return <span>1 {row.original.roles.map((role: any) => role.name).join(', ')}</span>
        //     }

        // },
        {
            header: 'Actions',
            isActions: true
        }
    ];

    return (
        <AppLayout
            links={[
                { label: 'Add User', href: route('users.create'), icon: UserPlus },
                { label: 'Dashboard', href: route('dashboard'), icon: PieChart },
                { label: 'Cashiers', href: route('users.byType', 'cashier'), icon: ContactRound },
                { label: 'Admins', href: route('users.byType', 'admin'), icon: UserCog }
            ]}
        >
            <CustomIndexPage
                Header={{
                    title: 'System Users',
                    button: {
                        label: 'Add User',
                        icon: UserPlus,
                        onClick: () => {
                            handleCreate();
                        }
                    }
                }}
                Data={users.data}
                flashData={flash}
                actionsData={actions}
                Columns={columns}
                paginate={{
                    from: users.from,
                    to: users.to,
                    total: users.total,
                    links: users.links,
                    next_page_url: users.next_page_url,
                    prev_page_url: users.prev_page_url,
                    current_page: users.current_page
                }}
                handleEdit={(user: UserInterface) => {
                    handleEdit(user);
                }}
                handleDelete={(user: UserInterface) => {
                    handleDelete(user);
                }}
                Utils={undefined}
                handleInfo={(user: UserInterface) => {
                    handleInfo(user);
                }}
            ></CustomIndexPage>
        </AppLayout>
    );
}
