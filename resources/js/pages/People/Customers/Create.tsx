import CustomDropdown from '@/components/custom/custom-dropdown';
import CustomInput from '@/components/custom/custom-input';
import CustomSearchBar from '@/components/custom/custom-searchbar';
import CustomSubmitButton from '@/components/custom/custom-submit-button';
import CustomTextArea from '@/components/custom/custom-text-area';
import CustomUserSearchResultsTable from '@/components/custom/custom-user-search-results-table';
import { useSearch } from '@/hooks/custom/useSearch';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import { CustomerInterface } from '@/pages/interface/general';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';

export default function Create({ customer, customersIds }: { customer?: CustomerInterface; customerIds?: number[] }) {
    const isEdit = customer != null;

    const errors = usePage().props.errors;
    const [query, setQuery] = useState('');
    const [searching, setSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selected, setSelected] = useState(false);

    const [data, setData] = useState({
        name: customer?.user?.name || '',
        email: customer?.user?.email || '',
        phone: customer?.user?.phone || '',
        bill_cycle: customer?.bill_cycle || '',
        street: customer?.street || '',
        estate: customer?.estate || '',
        house_number: customer?.house_number || '',
        description: customer?.description || '',
        user_id: customer?.user_id || 0,
        is_edit: isEdit
    });

    // console.log(customersIds);

    const response = useSearch({
        query: query,
        routeName: route('users.search'),
        isSearching: setSearching,
        filter: customersIds
    });

    useEffect(() => {
        if (!isEdit) {
            if (query === '') {
                // reset everything
                setData({
                    name: '',
                    email: '',
                    phone: '',
                    bill_cycle: '',
                    street: '',
                    estate: '',
                    house_number: '',
                    description: '',
                    user_id: 0,
                    is_edit: isEdit
                });
                return; // stop here
            }

            if (response.results.length > 0) {
                const res = response.results[0];
                setData((prev) => ({
                    ...prev,
                    name: res.name,
                    email: res.email,
                    phone: res.phone,
                    user_id: res.id
                }));
            } else {
                setData((prev) => ({
                    ...prev,
                    name: '',
                    email: '',
                    phone: '',
                    user_id: 0
                }));
            }
        }
    }, [response.results, query, isEdit]);

    const handleSubmit = () => {
        setIsLoading(true);
        if (isEdit) {
            return router.put(route('customers.update', customer.id), data, {
                onFinish: () => {
                    setIsLoading(false);
                }
            });
        }
        return router.post(route('customers.store'), data, {
            onFinish: () => {
                setIsLoading(false);
            }
        });
    };

    const handleUserSelection = (user: Record<string, string>) => {
        setSelected(true);
        setData({
            ...data,
            user_id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone
        });
    };


    return (
        <AppLayout>
            <Head title={isEdit ? `Updated ${customer.user.name}` : 'Create Customer'} />
            <AuthLayout
                title={isEdit ? `Updated ${customer.user.name}` : 'Create Customer'}
                description={isEdit ? `Fill the form to update ${customer.user.name} customer` : 'Fill the form to create a new customer'}
            >
                {!isEdit && (
                    <CustomSearchBar
                        value={query}
                        searching={searching}
                        setQuery={(query: string) => {
                            setSelected(false);
                            setQuery(query);
                        }}
                    />
                )}
                {response.results.length > 0 && query !== '' && !selected && (
                    <CustomUserSearchResultsTable
                        results={response.results}
                        onSelect={(user) => handleUserSelection(user as Record<string, string>)}
                    />
                )}
                <div className="grid grid-cols-2 gap-4 space-x-2">
                    <CustomInput
                        id="name"
                        name="name"
                        label="Name"
                        disabled={!isEdit}
                        readOnly={!isEdit}
                        error={errors.name || errors.user_id || errors.i}
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                    />

                    <CustomInput id="email" name="email" label="Email" disabled readOnly error={errors.email} value={data.email} />
                </div>
                <div className="grid grid-cols-2 gap-4 space-x-2">
                    <CustomInput
                        id="phone"
                        name="phone"
                        label="Phone"
                        disabled={!isEdit}
                        readOnly={!isEdit}
                        error={errors.phone}
                        value={data.phone}
                        onChange={(e) => setData({ ...data, phone: e.target.value })}
                    />

                    {/* <CustomDropdown id='bill_cycle' name='bill_cycle' label='Bill Cycle' error={errors.bill_cycle}  items={[{ label: 'Daily', value: 'Daily' }, { label: 'Weekly', value: 'Weekly' }, { label: 'Monthly', value: 'Monthly' }]}  trigger='Select Bill Cycle' onSelect={(value) => setData({ ...data, bill_cycle: value })}/> */}
                    <CustomInput
                        id="street"
                        name="street"
                        label="Street"
                        error={errors.street}
                        value={data.street}
                        onChange={(e) => setData({ ...data, street: e.target.value })}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4 space-x-2">
                    <CustomInput
                        id="estate"
                        name="estate"
                        label="Estate"
                        error={errors.estate}
                        value={data.estate}
                        onChange={(e) => setData({ ...data, estate: e.target.value })}
                    />

                    <CustomInput
                        id="house_number"
                        name="house_number"
                        label="House Number"
                        error={errors.house_number}
                        value={data.house_number}
                        onChange={(e) => setData({ ...data, house_number: e.target.value })}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4 space-x-2">
                    <CustomTextArea
                        id="description"
                        name="description"
                        label="Description"
                        error={errors.description}
                        onChange={(e) => setData({ ...data, description: e.target.value })}
                        value={data.description.toString()}
                    />
                    <div className="grid gap-2">
                        <CustomDropdown
                            label="Bill Cycle"
                            error={errors.bill_cycle}
                            items={[
                                { label: 'Daily', value: 'daily' },
                                { label: 'Weekly', value: 'weekly' },
                                { label: 'Monthly', value: 'monthly' }
                            ]}
                            trigger="Select Bill Cycle"
                            onChange={(value) => setData({ ...data, bill_cycle: value })}
                        />
                    </div>
                </div>
                <CustomSubmitButton onClick={handleSubmit} isLoading={isLoading} label={isEdit ? 'Update Customer' : 'Create Customer'} />
            </AuthLayout>
        </AppLayout>
    );
}
