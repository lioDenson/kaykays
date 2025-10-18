import CustomInput from '@/components/custom/custom-input';
import CustomSearchBar from '@/components/custom/custom-searchbar';
import { ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { useSearch } from '@/hooks/custom/useSearch';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import { RoleInterface } from '@/pages/interface/general';
import { Head } from '@inertiajs/react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';

export default function UserRole({ roles }: { roles: RoleInterface[] }) {
    const [query, setQuery] = useState('');
    const [searching, setSearching] = useState(false);
    const [selected, setSelected] = useState(false);

    const response = useSearch({
        query: query,
        routeName: route('users.search'),
        isSearching: setSearching
    });

    useEffect(() => {
        if (searching && selected) {
            setSelected(false);
        }
    }, [response.results, searching, selected]);

    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        user_id: 0
    });

    const handleUserSelection = (user: Record<string, string>) => {
        setSelected(true);
        setQuery(user.name);
        setData({
            ...data,
            user_id: Number(user.id),
            name: user.name,
            email: user.email,
            phone: user.phone
        });
    };

    return (
        <AppLayout>
            <Head title="Assign role" />
            <AuthLayout title="Assign role" description="Assign role to a user">
                <CustomSearchBar value={query} setQuery={(value: string) => setQuery(value)} searching={searching} />
                {response.results.length > 0 && query !== '' && !selected && (
                    <ScrollArea>
                        <div className="max-h-[25vh]">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Phone</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="text-xs">
                                    {response.results.map((user, index) => (
                                        <TableRow key={user.id} className="cursor-pointer" onClick={handleUserSelection.bind(null, user)}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.phone}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <ScrollBar orientation="vertical" />
                    </ScrollArea>
                )}

                <CustomInput id="name" name="name" label="Name" value={data.name} />
                <CustomInput id="email" name="email" label="Email" value={data.email} />
                <CustomInput id="phone" name="phone" label="Phone" value={data.phone} />
            </AuthLayout>
        </AppLayout>
    );
}
