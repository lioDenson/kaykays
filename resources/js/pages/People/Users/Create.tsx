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

export default function Create({ user }: { user?: any }) {
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
    const roles = usePage().props.roles as RoleInterface[];
    const { errors: formErrors } = usePage().props as { errors: Record<string, string> };

    const disabled = isEdit ? auth.user.id === user.id : false;

    const handleSubmit = () => {
        if (isEdit) {
            return router.put(route('users.update', user.id), data);
        }
        return router.post(route('users.store'), data);
    };

    return (
        <AppLayout
            links={[
                { label: 'Dashboard', href: route('dashboard'), icon: PieChart },
                { label: 'All Users', href: route('users.index'), icon: Table },
            ]}
        >
            <AuthLayout
                title={`${isEdit ? `Edit ${user.name}` : 'Create User'} `}
                description={isEdit ? `Fill the form to update ${user.name}` : 'Fill the form to create a new user'}
            >
                <Head title="Create User" />
                <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                type="name"
                                value={data.name}
                                name="name"
                                autoFocus
                                placeholder="Dennis Kimanthi"
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                            />
                            <InputError message={formErrors.name} />
                        </div>
                        <div className="grid gap-2">
                            <CustomSelection
                                disabled={disabled}
                                selectedOption={selected}
                                data={roles}
                                label={'Select Role'}
                                placeholder="Select Role"
                                className="w-full"
                                onSelect={(value) => {
                                    setSelected({ value: value.value, label: value.label });
                                }}
                            />
                            <InputError message={formErrors.role_id} />
                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            disabled={disabled || isEdit}
                            value={data.email}
                            name="email"
                            autoFocus
                            placeholder="username@email.com"
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                        />
                        <InputError message={formErrors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="name">Phone</Label>
                        <Input
                            id="phone"
                            type="phone"
                            value={data.phone}
                            name="phone"
                            autoFocus
                            placeholder="0712345678"
                            onChange={(e) => setData({ ...data, phone: e.target.value })}
                        />
                        <InputError message={formErrors.phone} />
                    </div>
                    <CustomSubmitButton className="mt-4 w-full" label={`${isEdit ? 'Update' : 'Create'} User`} onClick={handleSubmit} />
                </div>
            </AuthLayout>
        </AppLayout>
    );
}
