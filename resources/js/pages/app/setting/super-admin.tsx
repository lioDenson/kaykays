import CustomSubmitButton from '@/components/custom/custom-submit-button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { SharedData } from '@/types';
import {  router, usePage } from '@inertiajs/react';
import { AlertTriangle, Info } from 'lucide-react';
import { useState } from 'react';


export default function SuperAdmin() {
    const sharedData = usePage<SharedData>().props;

    const [isLoading, setIsLoading] = useState(false);

    const handleProceed = () => {
        setIsLoading(true);
        router.get('/super-admin/create');
    };

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
            <Card className="bg-sky-300/20 py-0 md:w-1/2">
                <CardHeader>
                    <div className="mt-2 flex items-center justify-end gap-2 rounded p-2 font-bold text-blue-100">
                        <Info />
                        Admin Notice
                    </div>
                    <span className="font-bold text-green-400 uppercase underline">{sharedData.name} Application</span>
                </CardHeader>
                <CardContent className="m-4 rounded bg-sky-300/20 p-4 text-lg font-thin text-white">
                    Welcome to {sharedData.name}.<br /> This page appears because the app is newly installed, and you are designated as the Super
                    Administrator. If you are the Super Administrator, please create the first admin account to start using the app. <br />
                    If you are not, simply <span className="text-red-500">EXIT</span> the app and wait until the Super Administrator sets up an admin
                    account.;
                </CardContent>
                <CardFooter className="flex justify-between gap-3 rounded-b bg-yellow-200/30 p-2 text-yellow-300">
                    <AlertTriangle /> DO NOT PROCEED IF YOU ARE NOT THE SUPER ADMINISTRATOR.
                </CardFooter>
            </Card>
            <CardFooter className="flex w-full justify-end md:w-1/2">
                <CustomSubmitButton label="PROCEED" type="button" className="" isLoading={isLoading} onClick={() => handleProceed()} />
            </CardFooter>
        </div>
    );
}
