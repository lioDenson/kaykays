import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

interface UserProps {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    phone?: string;
}

export default function User({ user }: { user: UserProps }) {
    return (
        <AppLayout>
            <Head title={user.name} />
            <div className="flex min-h-dvh w-full items-center justify-center text-xs md:text-sm">
                <div className="flex w-full flex-col items-center justify-center gap-2 md:w-10/12">
                    {/* avatar section and bio */}
                    <div className="h-30 w-30 rounded-full border-2 bg-accent/50 md:h-40 md:w-40"></div>
                    <div className="flex flex-col items-center gap-1 text-xs text-accent md:text-sm">
                        <p>{user.name}</p>
                    </div>
                    <div className="h-0.5 w-full bg-accent" />

                    {/* information section  */}
                    <div className="m-1 flex w-full flex-col gap-4 rounded-2xl px-4 py-2">
                        <div className="flex-cols-3 flex w-full justify-between">
                            <div className="flex gap-2 font-bold">
                                <p>Name:</p>
                                <p>{user.name}</p>
                            </div>
                            <div className="flex gap-2 font-bold">
                                <p>Email:</p>
                                <p>{user.email}</p>
                            </div>
                            <div className="flex gap-2 font-bold">
                                <p>Phone:</p>
                                <p>{user.phone}</p>
                            </div>
                        </div>
                        <div className="flex-cols-3 flex w-full justify-between">
                            <div className="flex gap-2 font-bold">
                                <p>Name:</p>
                                <p>{user.name}</p>
                            </div>
                            <div className="flex gap-2 font-bold">
                                <p>Email:</p>
                                <p>{user.email}</p>
                            </div>
                            <div className="flex gap-2 font-bold">
                                <p>Phone:</p>
                                <p>{user.phone}</p>
                            </div>
                        </div>
                    </div>
                    {/* actions section */}
                </div>
            </div>
        </AppLayout>
    );
}
