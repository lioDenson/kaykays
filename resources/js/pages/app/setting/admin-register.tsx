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
        password_confirmation: '',
    });

    const { errors: formErrors } = usePage().props as { errors: Record<string, string> };

    useEffect(() => {
        setErrors(formErrors);
    }, [formErrors]);

    /**
     * Handles the submission of the form
     *
     * We're using the router.post() method to send a POST request to the /super-admin route.
     * The data for the request is the state of the component, which holds the name, email, password, and password_confirmation.
     *
     * onSuccess: This is a callback function that will be called if the request is successful.
     *            In this case, we're redirecting the user to the login page.
     * onError:   This is a callback function that will be called if the request fails.
     *            In this case, we're not doing anything.
     * onFinish:  This is a callback function that will be called when the request is finished,
     *            regardless of whether it was successful or not. In this case, we're setting the isLoading state back to false.
     */
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
            },
        });
    };
    return (
        <AuthLayout title="Super Admin Register" description="Register system admin">
            <Head title="Super Admin Register" />
            <Card>
                <CardContent>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                name="name"
                                placeholder="Full name"
                                onChange={(e) => setData({ ...data, name: e.target.value })}
                            />
                            <InputError message={errors.name} className="mt-2" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                tabIndex={2}
                                autoComplete="email"
                                name="email"
                                placeholder="email@example.com"
                                onChange={(e) => setData({ ...data, email: e.target.value })}
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                type="phone"
                                tabIndex={3}
                                autoComplete="new-phone"
                                name="phone"
                                placeholder="phone"
                                onChange={(e) => setData({ ...data, phone: e.target.value })}
                            />
                            <InputError message={errors.phone} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                tabIndex={3}
                                autoComplete="new-password"
                                name="password"
                                placeholder="Password"
                                onChange={(e) => setData({ ...data, password: e.target.value })}
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">Confirm password</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                tabIndex={4}
                                autoComplete="new-password"
                                name="password_confirmation"
                                placeholder="Confirm password"
                                onChange={(e) => setData({ ...data, password_confirmation: e.target.value })}
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        <CustomSubmitButton label="Create Account" isLoading={isLoading} onClick={() => handleSubmit()} />
                    </div>
                </CardContent>
            </Card>
        </AuthLayout>
    );
}
