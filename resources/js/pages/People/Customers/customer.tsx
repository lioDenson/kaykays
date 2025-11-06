import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import { Head } from '@inertiajs/react';
import { CreditCard, Info, MapPinHouse, UserCircle2 } from 'lucide-react';

interface CustomerProps {
    user: {
        name: string;
        email: string;
        phone: string;
    };
    street: string;
    estate: string;
    house_number: string;
    bill_cycle: string;
    description: string;
}

export default function Customer({ customer }: { customer: CustomerProps }) {
    return (
        <AppLayout>
            <Head title={customer.user.name} />
            <AuthLayout title={customer.user.name} description={'Customer information.'}>
                <div className="w-full space-y-6">
                    {/* Main Customer Cards */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Personal Information Card */}
                        <Card className="w-full p-6 shadow-md shadow-gray-700/50 transition-shadow duration-300 hover:shadow-xl">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="rounded-lg border border-blue-500 bg-blue-500/15 p-2">
                                    <UserCircle2 className="h-5 text-blue-500" />
                                </div>
                                <CardTitle className="text-md">
                                    Personal <br /> Information
                                </CardTitle>
                            </div>
                            <CardHeader className="px-0 pt-2 pb-4">
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-base font-semibold text-foreground/90">{customer.user.name}</p>
                                        <CardDescription className="mt-1 text-sm"> Name</CardDescription>
                                    </div>
                                    <div>
                                        <p className="text-base font-semibold text-foreground/90">{customer.user.email}</p>
                                        <CardDescription className="mt-1 text-xs">Email Address</CardDescription>
                                    </div>
                                    <div>
                                        <p className="text-base font-semibold text-foreground/90">{customer.user.phone}</p>
                                        <CardDescription className="mt-1 text-xs">Phone Number</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>

                        {/* Address Information Card */}
                        <Card className="w-full p-6 shadow-lg shadow-gray-700/50 transition-shadow duration-300 hover:shadow-xl">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="rounded-lg border border-green-500 bg-green-500/15 p-2">
                                    <MapPinHouse className="h-5 w-5 text-green-600" />
                                </div>
                                <CardTitle className="text-md">
                                    Address <br /> Information
                                </CardTitle>
                            </div>
                            <CardHeader className="px-0 pt-2 pb-4">
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-base font-semibold text-foreground/90">{customer.street}</p>
                                        <CardDescription className="mt-1 text-sm">Street</CardDescription>
                                    </div>
                                    <div>
                                        <p className="text-sm text-foreground/90">{customer.estate}</p>
                                        <CardDescription className="mt-1 text-xs">Estate</CardDescription>
                                    </div>
                                    <div>
                                        <p className="text-sm text-foreground/90">No.{customer.house_number}</p>
                                        <CardDescription className="mt-1 text-xs">House Number</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    </div>

                    {/* Additional Information Cards */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Bill Cycle Card */}
                        <Card className="p-6 shadow-md shadow-gray-700/50 transition-shadow duration-300 hover:shadow-xl">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="rounded-lg border border-amber-500 bg-amber-500/10 p-2">
                                    <CreditCard className="h-5 w-5 text-amber-600" />
                                </div>
                                <CardTitle className="text-md mb-3">
                                    Billing <br></br> Information
                                </CardTitle>
                            </div>
                            <div className="space-2 flex items-center justify-around">
                                <div>
                                    <p className="font-medium text-foreground/90 capitalize">{customer.bill_cycle}</p>
                                    <CardDescription className="text-xs">Bill Cycle</CardDescription>
                                </div>
                                <div>
                                    <p className="font-medium text-foreground/90 capitalize">{'James Kamande'}</p>
                                    <CardDescription className="text-xs">Mpesa Name</CardDescription>
                                </div>
                            </div>
                        </Card>

                        {/* Description Card */}
                        <Card className="p-6 shadow-lg shadow-gray-700/50 transition-shadow duration-300 hover:shadow-xl">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="rounded-lg border border-purple-500 bg-purple-500/10 p-2">
                                    <Info className="h-5 w-5 text-purple-600" />
                                </div>
                                <CardTitle className="mb-3 text-base">
                                    Additional <br /> Information
                                </CardTitle>
                            </div>
                            <div className="space-y-2">
                                <div>
                                    <p className="text-sm text-gray-700">{customer.description}</p>
                                    <CardDescription className="text-xs">Description</CardDescription>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </AuthLayout>
        </AppLayout>
    );
}
