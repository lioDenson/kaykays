import CustomInput from '@/components/custom/custom-input';
import CustomSubmitButton from '@/components/custom/custom-submit-button';
import InputError from '@/components/input-error';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function SuperAdminRegister() {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: ''
    });

    const { errors: formErrors } = usePage().props as { errors: Record<string, string> };

    useEffect(() => {
        setErrors(formErrors);
    }, [formErrors]);

    const handleSubmit = () => {
        setIsLoading(true);
        router.post('/super-admin', data, {
            onSuccess: () => {
                // Redirect the user to the login page when the request is successful
                router.get('/login');
            },
            onError: () => {
                // Don't do anything if the request fails
            },
            onFinish: () => {
                // Set isLoading back to false when the request is finished
                setIsLoading(false);
            }
        });
    };
    return (
        <AuthLayout title="Super Admin Register" description="Register system admin">
            <Head title="Super Admin Register" />
            <Card>
                <CardContent>
                    <div className="grid gap-6">
                        <div className="grid gap-2 md:grid-cols-2">
                            <CustomInput
                                name="name"
                                label="Name"
                                placeholder="Name"
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                                error={errors.name}
                            />
                            <CustomInput
                                name="phone"
                                label="Phone"
                                placeholder="073475356"
                                onChange={(e) => setData({ ...data, phone: e.target.value })}
                                error={errors.phone}
                            />
                        </div>

                        <CustomInput
                            name="email"
                            label="Email (Optional)"
                            placeholder="Email"
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                            error={errors.email}
                        />

                        <div className="grid gap-2 md:grid-cols-2">
                            <CustomInput
                                name="password"
                                label="Password"
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                                error={errors.password}
                            />

                            <CustomInput
                                name="password_confirmation"
                                label="Confirm Password"
                                type="password"
                                placeholder="Confirm Password"
                                onChange={(e) => setData({ ...data, password_confirmation: e.target.value })}
                                error={errors.password}
                            />
                        </div>

                        <CustomSubmitButton label="Create Account" isLoading={isLoading} onClick={() => handleSubmit()} />
                    </div>
                </CardContent>
            </Card>
        </AuthLayout>
    );
}
