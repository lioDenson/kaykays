import CustomInput from '@/components/custom/custom-input';
import CustomSearchBar from '@/components/custom/custom-searchbar';
import CustomSelection from '@/components/custom/custom-selection';
import CustomSubmitButton from '@/components/custom/custom-submit-button';
import CustomUserSearchResultsTable from '@/components/custom/custom-user-search-results-table';
import { useSearch } from '@/hooks/custom/useSearch';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import { RoleInterface } from '@/pages/interface/general';
import { Head, router, usePage } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';
import { route } from 'ziggy-js';

export default function UserRole({ roles, userIds }: { roles: RoleInterface[], userIds?: number[] }) {
    const [query, setQuery] = useState('');
    const [searching, setSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selected, setSelected] = useState(false);
    const [submitData, setSubmitData] = useState({});
    const [selectedRole, setSelectedRole] = useState({
        value: 0,
        label: ''
    });

    const emptyData = {
        name: '',
        email: '',
        phone: '',
        user_id: 0,
        role_id: 0
    };

    const response = useSearch({
        query: query,
        routeName: route('users.search'),
        isSearching: setSearching,
        filter: userIds
    });

    const [data, setData] = useState(emptyData);

    const errors = usePage().props.errors as Record<string, string>;

    const handleQueryChange = (q: string) => {
        setQuery(q);
        setSelected(false);
        setData(emptyData);
        setSubmitData({});
    };

    const handleSelect = useCallback(
        (user: Record<string, string>) => {
            setSelected(true);
            setData({
                name: user.name,
                email: user.email,
                phone: user.phone,
                user_id: Number(user.id),
                role_id: selectedRole.value
            });
            setSubmitData({
                user_id: user.id,
                role_id: selectedRole.value
            });
        },
        [selectedRole]
    );

    useEffect(() => {
        if (response.results.length == 1) {
            handleSelect(response.results[0]);
        }
    }, [response.results, handleSelect]);

    const handleSubmit = () => {
        setIsLoading(true);
        router.post(route('users.setRole'), submitData, {
            onFinish: () => {
                setIsLoading(false);
            }
        });
    };

    const [error, setError] = useState(errors.user_id);

    useEffect(() => {
        if (errors.user_id) {
            setError(errors.user_id);
        }

    }, [errors]);

    return (
        <AppLayout>
            <Head title="Assign role" />
            <AuthLayout title="Assign role" description="Assign role to a user">
                <CustomSearchBar
                    value={query}
                    setQuery={(q: string) => {
                        handleQueryChange(q);
                        setError('')
                    }}
                    searching={searching}
                    error={error}
                />
                {response.results && query !== '' && !selected && (
                    <CustomUserSearchResultsTable results={response.results} onSelect={(user) => handleSelect(user as Record<string, string>)} />
                )}

                <div className="grid gap-2 md:grid-cols-2">
                    <CustomInput id="name" name="name" label="Name" readOnly disabled value={data.name} />

                    <CustomInput id="email" name="email" label="Email" readOnly disabled value={data.email} />
                    <CustomInput id="phone" name="phone" label="Phone" readOnly disabled value={data.phone} />
                    <CustomSelection
                        data={roles}
                        label="Role"
                        disabled={!selected}
                        placeholder="Select Role"
                        onSelect={(role) => {
                            setSelectedRole(role as { value: number; label: string });
                        }}
                        error={errors.role_id}
                        selectedOption={selectedRole}
                    />
                </div>
                <CustomSubmitButton label="Assign Role" onClick={handleSubmit} isLoading={isLoading} />
            </AuthLayout>
        </AppLayout>
    );
}
