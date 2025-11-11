import CustomSubmitButton from '@/components/custom/custom-submit-button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { AlertTriangle, Crown, Info, Shield, ShieldAlert } from 'lucide-react';
import { useState } from 'react';

export default function SuperAdmin() {
    const sharedData = usePage<SharedData>().props;
    const [isLoading, setIsLoading] = useState(false);

    const handleProceed = () => {
        setIsLoading(true);
        router.get('/super-admin/create');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-900">
            <div className="w-full max-w-2xl space-y-6">
                {/* Header Card */}
                <Card className="border-0 bg-gradient-to-r from-blue-600 to-purple-600 shadow-2xl dark:from-blue-800 dark:to-purple-800">
                    <CardHeader className="space-y-4 pb-6 text-center">
                        <div className="flex justify-center">
                            <div className="rounded-full bg-white/20 p-3 backdrop-blur-sm dark:bg-black/20">
                                <ShieldAlert className="h-8 w-8 text-white" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold text-white md:text-3xl">Super Administrator Setup</h1>
                            <p className="text-lg font-semibold text-blue-100 dark:text-blue-200">{sharedData.name} Application</p>
                        </div>
                    </CardHeader>
                </Card>

                {/* Main Content Card */}
                <Card className="border-0 bg-white/80 shadow-2xl backdrop-blur-sm dark:bg-slate-800/80">
                    <CardHeader className="pb-4">
                        <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-700 dark:bg-blue-900/30">
                            <Info className="h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
                            <span className="font-semibold text-blue-800 dark:text-blue-200">Administrator Notice</span>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="text-center">
                            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                                Welcome to <span className="font-semibold text-blue-600 dark:text-blue-400">{sharedData.name}</span>. This page
                                appears because the application is newly installed, and you have been designated as the Super Administrator.
                            </p>
                        </div>

                        <div className="rounded-lg border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-4 dark:border-green-700 dark:from-green-900/20 dark:to-emerald-900/20">
                            <p className="text-center text-slate-700 dark:text-slate-300">
                                If you are the Super Administrator, please proceed to create the first admin account and start using the application.
                            </p>
                        </div>

                        <div className="rounded-lg border border-red-200 bg-gradient-to-r from-red-50 to-orange-50 p-4 dark:border-red-700 dark:from-red-900/20 dark:to-orange-900/20">
                            <p className="text-center text-slate-700 dark:text-slate-300">
                                If you are <span className="font-bold text-red-600 dark:text-red-400">NOT</span> the Super Administrator, please{' '}
                                <span className="font-bold text-red-600 dark:text-red-400">EXIT</span> the application and wait for the setup to be
                                completed.
                            </p>
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-4 pt-6">
                        {/* Warning Banner */}
                        <div className="flex w-full items-center gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-700 dark:bg-yellow-900/30">
                            <AlertTriangle className="h-5 w-5 flex-shrink-0 text-yellow-600 dark:text-yellow-400" />
                            <span className="text-sm font-semibold text-yellow-800 md:text-base dark:text-yellow-200">
                                DO NOT PROCEED IF YOU ARE NOT THE SUPER ADMINISTRATOR
                            </span>
                        </div>

                        {/* Action Button */}
                        <div className="flex w-full justify-end">
                            <CustomSubmitButton
                                label="PROCEED TO SETUP"
                                type="button"
                                isLoading={isLoading}
                                onClick={handleProceed}
                                className="transform rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-green-600 hover:to-emerald-700 hover:shadow-xl"
                            />
                        </div>
                    </CardFooter>
                </Card>

                {/* Footer Note */}
                <div className="text-center">
                    <p className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <Shield className="h-4 w-4" />
                        Secure Super Administrator Access
                    </p>
                </div>
            </div>
        </div>
    );
}
