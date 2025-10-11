import CustomSubmitButton from '@/components/custom/custom-submit-button';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import { RiderInterface, UserInterface } from '@/pages/interface/general';
import { Head, router, usePage } from '@inertiajs/react';
import axios from 'axios';
import {  Loader2, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';

export default function Create({rider} :{rider?: RiderInterface} ) {
    const isEdit = rider != null;
    

    const [isLoading, setIsLoading] = useState(false);
    const [searching, setSearching] = useState(false);
    const [users, setUsers] = useState<UserInterface[]>();
    const [query, setQuery] = useState('');
    const [debouncingQuery, setDebouncingQuery] = useState(query);
    const [data, setData] = useState({
        user_id: rider?.user?.id || 0,
        name: rider?.user?.name || '',
        email: rider?.user?.email || '',
        phone: rider?.user?.phone || '',
        vehicle_number: rider?.vehicle_number || '',
    });

    const { errors } = usePage().props as any;

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncingQuery(query);
        }, 500);

        return () => clearTimeout(timeout);
    }, [query]);

    useEffect(() => {
        if (debouncingQuery && !isEdit) {
            setSearching(true);
            axios.get(route('users.search'), { params: { query: debouncingQuery } }).then((response) => {
                setUsers(response.data);
            }).finally(() => {
                setSearching(false);
            });
        }

        if (!debouncingQuery) {
            setUsers([]);
        }
    }, [debouncingQuery]);

    useEffect(() => {
        if (isEdit) {
            return
        }
        if (users && users.length == 1) {
            setData({
                ...data,
                user_id: users[0].id,
                name: users[0].name,
                email: users[0].email,
                phone: users[0].phone,
            });
        } else {
            setData({
                user_id: 0,
                name: '',
                email: '',
                phone: '',
                vehicle_number: '',
            });
        }
    }, [users]);

    const handleSelected = (user: UserInterface) => {
        setData({
            user_id: 0,
            name: '',
            email: '',
            phone: '',
            vehicle_number: '',
        });

        setData({
            ...data,
            user_id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
        });
        setUsers([user]);
    };

    const handleSubmit = () => {
        setIsLoading(true);
        if (isEdit) {

            router.put(route('riders.update', rider.id), data, {
                onFinish: () => {
                    setIsLoading(false);
                }
            })
            return;
        }
        router.post(route('riders.store'), data,{
            onFinish: () => {
                setIsLoading(false);
            }
        });
    }

    return (
        <AppLayout>
            <Head title="Create Rider" />
            <AuthLayout
                title={isEdit ? `Edit ${rider.user.name}` : 'Create Rider'}
                description={isEdit ? `Fill the form to update Rider ${rider.user.name}` : 'Fill the form to create a new Rider'}
            >
                {!isEdit && (
                    <div className="flex h-9 items-center justify-center rounded-2xl bg-accent/50">
                        <Search className="mx-2 mr-4 h-5 w-5 shrink-0 opacity-50" />
                        <Input
                            disabled={isEdit}
                            onChange={(e) => setQuery(e.target.value)}
                            className={`h-full rounded-none border-0 ${searching ? '' : 'rounded-r-2xl'} bg-accent/90 px-2 ring-0 focus:ring-0 focus-visible:ring-0`}
                            placeholder="Search a user to make a rider"
                        />
                        {searching && <Loader2 className="mx-2 h-5 w-5 animate-spin" />}
                    </div>
                )}
                <InputError message={errors.id} />

                <div className="w-full">
                    {users && users.length > 0 && (
                        <div className="w-full overflow-y-auto bg-accent/20 p-1">
                            {users.map((user, index) => (
                                <div
                                    onClick={() => handleSelected(user)}
                                    key={index}
                                    className="flex justify-between gap-3 border-b px-2 py-2 hover:cursor-pointer hover:bg-accent/50"
                                >
                                    <span>{index + 1}</span>
                                    <span>{user.name}</span>
                                    <span>{user.email}</span>
                                    <span>{user.phone}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 gap-x-3 gap-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            readOnly={!isEdit}
                            disabled={!isEdit}
                            type="text"
                            className="capitalize"
                            value={data.name}
                            placeholder="Rider name"
                            onChange={(e) => {
                                setData({ ...data, name: e.target.value });
                            }}
                        />
                        <InputError message="" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            readOnly
                            disabled
                            id="email"
                            className=""
                            value={data.email}
                            type="text"
                            placeholder="Rider email"
                        />
                        <InputError message="" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            readOnly={!isEdit}
                            disabled={!isEdit}
                            id="phone"
                            className="capitalize"
                            value={data.phone}
                            type="text"
                            placeholder="Rider phone number"
                            onChange={(e) => {
                                setData({ ...data, phone: e.target.value });
                            }}
                        />
                        <InputError message="" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="vehicle_number">Vehicle Number</Label>
                        <Input
                            id="vehicle_number"
                            value={data.vehicle_number}
                            onChange={(e) => {
                                setData({ ...data, vehicle_number: e.target.value });
                            }}
                            type="text"
                            className="uppercase"
                        />
                        <InputError message={errors.vehicle_number} />
                    </div>
                </div>
                <CustomSubmitButton onClick={handleSubmit} isLoading={isLoading} label={isEdit ? 'Update Rider' : 'Create Rider'} />
            </AuthLayout>
        </AppLayout>
    );
}
