import CustomInput from '@/components/custom/custom-input';
import CustomSelection from '@/components/custom/custom-selection';
import CustomSubmitButton from '@/components/custom/custom-submit-button';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import { RoleInterface } from '@/pages/interface/general';
import { Head, router, usePage } from '@inertiajs/react';
import { PieChart, Table, UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';

export default function Create({ user, rolling }: { user?: any }) {
    const isEdit = user != null;

    const [data, setData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        role_id: user?.role_id || null,
    });
    const [selected, setSelected] = useState({
        value: user?.roles[0]?.id || 0,
        label: user?.roles[0]?.name || 'Role',
    });

    useEffect(() => {
        setData({
            ...data,
            role_id: selected.value,
        });
    }, [selected]);

    const auth = usePage().props.auth as any;
    const errors = usePage().props.errors as Record<string, string>;
    const  [isLoading, setIsLoading] = useState(false);



    const handleSubmit = () => {
        setIsLoading(true);
        if (isEdit) {
            return router.put(route('users.update', user.id), data, {
                onFinish: () => {
                    setIsLoading(false);
                },
                
            });
        }
        return router.post(route('users.store'), data, {
            onFinish: () => {
                setIsLoading(false);
            },
        });
    };

    return (
        <AppLayout
            links={[
                { label: 'Dashboard', href: route('dashboard'), icon: PieChart },
                { label: 'All Users', href: route('users.index'), icon: Table }
            ]}
        >
            <AuthLayout
                title={`${isEdit ? `Edit ${user.name}` : 'Create User'} `}
                description={isEdit ? `Fill the form to update ${user.name}` : 'Fill the form to create a new user'}
            >
                <Head title="Create User" />
                <div className="space-y-2">
                    <div className="grid md:grid-cols-2 gap-2">
                        <CustomInput
                            id="name"
                            name="name"
                            label="Name"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            error={errors.name}
                        />
                        <CustomInput
                            id="email"
                            name="email"
                            label="Email"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                            error={errors.email}
                        />
                    </div>
                    <CustomInput
                        id="phone"
                        name="phone"
                        label="Phone"
                        value={data.phone}
                        onChange={(e) => setData({ ...data, phone: e.target.value })}
                        error={errors.phone}
                    />
                    <CustomSubmitButton
                        className="mt-4 w-full"
                        label={`${isEdit ? 'Update' : 'Create'} User`}
                        isLoading={isLoading}
                        activeLabel={`${isEdit ? 'Updating' : 'Creating'} User...`}
                        onClick={handleSubmit}
                    />
                </div>
            </AuthLayout>
        </AppLayout>
    );
}
