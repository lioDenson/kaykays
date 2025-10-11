import CustomSubmitButton from '@/components/custom/custom-submit-button';
import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { AccountInterface } from '../interface/general';

export default function Accounts({ account }: { account?: AccountInterface }) {
    const isEdit = account != null;

    const description = isEdit ? `Fill the form to update ${account.name} shop Account/Branch` : 'Fill the form to create a new shop branch/account';
    const { errors: formErrors } = usePage().props as { errors: Record<string, string> };

    const [data, setData] = useState({
        name: account?.name || '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = () => {
        setIsLoading(true);
        if (isEdit) {
            router.put(`/accounts/${account.id}`, data, {
                onFinish: () => {
                    setIsLoading(false);
                },
            });

            return;
        }
        router.post('/accounts', data, {
            onFinish: () => {
                setIsLoading(false);
            },
        });
    };
    return (
        <AppLayout>
            <AuthLayout title="Account" description={description}>
                <Head title={`Account  ${isEdit ? 'Update' : 'Create'}`} />

                <div className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Account Name</Label>
                        <Input
                            id="name"
                            type="name"
                            value={data.name}
                            name="name"
                            autoComplete="off"
                            autoFocus
                            placeholder="Kaykay - 4 ways"
                            onChange={(e) => setData({ ...data, name: e.target.value })}
                        />
                        <InputError message={formErrors.name} />
                    </div>

                    <div className="my-6 flex items-center justify-start">
                        <CustomSubmitButton
                            label={`${isEdit ? 'Update' : 'Create'} Account`}
                            type="submit"
                            className="w-full"
                            isLoading={isLoading}
                            onClick={() => handleSubmit()}
                        />
                    </div>
                </div>
            </AuthLayout>
        </AppLayout>
    );
}
