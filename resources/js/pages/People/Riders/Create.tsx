import CustomInput from '@/components/custom/custom-input';
import CustomSearchBar from '@/components/custom/custom-searchbar';
import CustomSubmitButton from '@/components/custom/custom-submit-button';
import CustomUserSearchResultsTable from '@/components/custom/custom-user-search-results-table';
import { useSearch } from '@/hooks/custom/useSearch';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import { RiderInterface } from '@/pages/interface/general';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';

export default function Create({ rider, riders }: { rider?: RiderInterface; riders?: number[] }) {
    const isEdit = rider != null;

    const [isLoading, setIsLoading] = useState(false);
    const [searching, setSearching] = useState(false);
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState(false);
    const [data, setData] = useState({
        user_id: rider?.user?.id || 0,
        name: rider?.user?.name || '',
        email: rider?.user?.email || '',
        phone: rider?.user?.phone || '',
        vehicle_number: rider?.vehicle_number || ''
    });

    const errors = usePage().props.errors;

    const response = useSearch({
        query: query.trim(),
        routeName: route('users.search'),
        isSearching: setSearching,
        filter: riders
    });


    const handleSubmit = () => {
        const submitData = {
            user_id: data.user_id,
            vehicle_number: data.vehicle_number
        };
        setIsLoading(true);
        if (isEdit) {
            

            router.put(route('riders.update', rider.id), submitData, {
                onFinish: () => {
                    setIsLoading(false);
                }
            });
            return;
        }
        router.post(route('riders.store'), submitData, {
            onFinish: () => {
                setIsLoading(false);
            }
        });
    };

    const handleQueryChange = (q: string) => {
        setQuery(q);
        setSelected(false);
        setData({ ...data, user_id: 0, name: '', email: '', phone: '', vehicle_number: '' });
    };

    useEffect(() => {
        if (response.results.length == 1) {
            setSelected(true);
            setData({
                ...data,
                user_id: response.results[0].id as number,
                name: response.results[0].name as string,
                email: response.results[0].email as string,
                phone: response.results[0].phone as string
            });
        }
    }, [response.results]);

    return (
        <AppLayout>
            <Head title="Create Rider" />
            <AuthLayout
                title={isEdit ? `Edit ${rider.user.name}` : 'Create Rider'}
                description={isEdit ? `Fill the form to update Rider ${rider.user.name}` : 'Fill the form to create a new Rider'}
            >
                {!isEdit && (
                    <CustomSearchBar
                        searching={searching}
                        setQuery={(q) => {
                            handleQueryChange(q);
                        }}
                        value={query}
                        error={errors.user_id}
                    />
                )}

                {response.results && query !== '' && !searching && !selected && (
                    <CustomUserSearchResultsTable
                        results={response.results}
                        onSelect={(user) => {
                            setSelected(true);
                            setData({
                                ...data,
                                user_id: user.id as number,
                                name: user.name as string,
                                email: user.email as string,
                                phone: user.phone as string,
                                vehicle_number: user.vehicle_number as string
                            });
                        }}
                    />
                )}

                <div className="grid gap-x-3 gap-y-6 md:grid-cols-2">
                    <CustomInput
                        id="name"
                        name="name"
                        label="Name"
                        value={data.name}
                        readOnly
                        disabled
                        onChange={(e) => {
                            setData({ ...data, name: e.target.value });
                        }}
                        error={errors.name}
                    />
                    <CustomInput
                        id="email"
                        name="email"
                        label="Email"
                        disabled
                        readOnly
                        value={data.email}
                        onChange={(e) => {
                            setData({ ...data, email: e.target.value });
                        }}
                        error={errors.email}
                    />
                    <CustomInput
                        id="phone"
                        name="phone"
                        label="Phone"
                        disabled
                        readOnly
                        inputClassName="uppercase"
                        value={data.phone}
                        onChange={(e) => {
                            setData({ ...data, phone: e.target.value });
                        }}
                        error={errors.phone}
                    />
                    <CustomInput
                        id="vehicle_number"
                        name="vehicle_number"
                        label="Vehicle Number"
                        inputClassName="uppercase"
                        disabled={!selected && !isEdit}
                        readOnly={!selected && !isEdit}
                        value={data.vehicle_number}
                        onChange={(e) => {
                            setData({ ...data, vehicle_number: e.target.value });
                        }}
                        error={errors.vehicle_number}
                    />
                </div>
                <CustomSubmitButton onClick={handleSubmit} isLoading={isLoading} label={isEdit ? 'Update Rider' : 'Create Rider'} className='w-full'/>
            </AuthLayout>
        </AppLayout>
    );
}
