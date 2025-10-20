import CustomInput from '@/components/custom/custom-input';
import CustomSearchBar from '@/components/custom/custom-searchbar';
import CustomSelection from '@/components/custom/custom-selection';
import CustomSubmitButton from '@/components/custom/custom-submit-button';
import { ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { useSearch } from '@/hooks/custom/useSearch';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import { RoleInterface } from '@/pages/interface/general';
import { Head, router, usePage } from '@inertiajs/react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';

export default function UserRole({ roles }: { roles: RoleInterface[] }) {
    const [query, setQuery] = useState('');
    const [searching, setSearching] = useState(false);
    const [selected, setSelected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState({
        value: 0,
        label: ''
    });
    const [show, setShow] = useState(true);


    let response = useSearch({
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
        user_id: 0,
        role_id: 0
    });

    const handleUserSelection = (user: Record<string, string>) => {
        setShow(false);
        setData({
            ...data,
            user_id: Number(user.id),
            name: user.name,
            email: user.email,
            phone: user.phone
        });
    };

    const errors = usePage().props.errors as Record<string, string>;
    const setRole = () => {
        setIsLoading(true);
        router.post(
            route('users.setRole'),
            { user_id: data.user_id, role_id: data.role_id },
            {
                onFinish: () => {
                    setIsLoading(false);
                }
            }
        );
    };

    useEffect(() => {
        if (query == '') {
            setIsLoading(false); 
            response.results = [];
            setShow(true);
            return;
        };

        if (searching) {
            setShow(false);
        } else {
            setShow(true);
        }

    },[query, response, searching]);
    return (
        <AppLayout>
            <Head title="Assign role" />
            <AuthLayout title="Assign role" description="Assign role to a user">
                <CustomSearchBar
                    value={query}
                    setQuery={(value: string) => {
                        setQuery(value);
                        setShow(true);
                    }}
                    searching={searching}
                />
                {response.results.length > 0 && query !== '' && show ? (
                    <ScrollArea>
                        <div className="max-h-[25vh] overflow-auto py-2">
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
                ) : (
                        response.results.length <= 0 && query !== '' && !searching &&(
                            <div>No results found.</div>
                    )
                )}

                <div className="grid gap-2 md:grid-cols-2">
                    <CustomInput id="name" name="name" label="Name" readOnly value={data.name} />
                    <CustomSelection
                        data={roles}
                        label="Role"
                        placeholder="Select Role"
                        onSelect={(value: number) => setData({ ...data, role_id: value })}
                        error={errors.role_id}
                        selectedOption={selectedRole}
                    />
                    <CustomInput id="email" name="email" label="Email" readOnly value={data.email} />

                    <CustomInput id="phone" name="phone" label="Phone" readOnly value={data.phone} />
                </div>
                <CustomSubmitButton label="Assign Role" onClick={setRole} isLoading={isLoading} />
            </AuthLayout>
        </AppLayout>
    );
}
