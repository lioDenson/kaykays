import AppLogoIcon from '@/components/app-logo-icon';
import CustomInput from '@/components/custom/custom-input';
import CustomSubmitButton from '@/components/custom/custom-submit-button';
import CustomTextArea from '@/components/custom/custom-text-area';
import { router } from '@inertiajs/react';

import { useState } from 'react';
import { route } from 'ziggy-js';

export default function Create({ errors, callBack }: { errors: any; callBack: () => void }) {
    const [data, setData] = useState({
        name: '',
        description: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = () => {
        setIsLoading(true);
        router.post(route('categories.store'), data, {
            onSuccess: () => {
                callBack();
                setIsLoading(false);
            },
            onFinish: () => {
                setIsLoading(false);
            }
        });
    };
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative">
                <div className="flex h-18 w-18 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/90 via-blue-600/70 to-cyan-500/20 shadow-lg transition-all duration-300 group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:shadow-xl">
                    <AppLogoIcon className="size-9 fill-current text-white" />
                </div>
                {/* Pulse animation */}
                <div className="absolute inset-0 animate-pulse rounded-2xl bg-gradient-to-br from-green-900 via-green-600 to-green-500 opacity-20 group-hover:opacity-30"> </div>
            </div>
            <div className="flex flex-col gap-2 space-y-4">
                <CustomInput
                    name="name"
                    label="Category Name"
                    inputClassName="bg-gray-400 border border-white"
                    about="Name"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    error={errors.name}
                />

                <CustomTextArea
                    label="Description"
                    className="border border-white bg-gray-400"
                    id="description"
                    value={data.description}
                    onChange={(e) => setData({ ...data, description: e.target.value })}
                    error={errors.description}
                />
                <CustomSubmitButton
                    label="Create Category"
                    activeLabel="Creating Category..."
                    isLoading={isLoading}
                    onClick={handleSubmit}
                    disabled={isLoading}
                />
            </div>
        </div>
    );
}
