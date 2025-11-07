import CustomInput from '@/components/custom/custom-input';
import CustomSubmitButton from '@/components/custom/custom-submit-button';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { PieChart, Table } from 'lucide-react';
import { useState } from 'react';
import { route } from 'ziggy-js';

export default function Create({ user }: { user?: any }) {
    const isEdit = user != null;

    const [data, setData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        role_id: user?.role_id || null,
    });
   
  

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
                    <div className="grid gap-2 md:grid-cols-2">
                        <CustomInput
                            id="name"
                            name="name"
                            label="Name"
                            value={data.name}
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                            error={errors.name}
                        />

                        <CustomInput
                            id="phone"
                            name="phone"
                            label="Phone"
                            value={data.phone}
                            onChange={(e) => setData({ ...data, phone: e.target.value })}
                            error={errors.phone}
                        />
                    </div>
                    <CustomInput
                        id="email"
                        name="email"
                        label="Email (Optional)"
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        error={errors.email}
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
