import { useEffect } from 'react';
import { toast, Toaster } from 'sonner';

export interface FlashMessage {
    type: 'success' | 'error' | 'info' | 'warning' | 'loading' | 'restore' | 'forceDelete';
    message: string;
}

interface CustomToasterProps {
    flash?: FlashMessage[];
}

const CustomToaster = ({ flash }: CustomToasterProps) => {
    useEffect(() => {
        Object.entries(flash || {}).forEach(([ type, message ]) => {
            if (!message) return;

            // skip restore and forceDelete completely
            if (type === 'restore' || type === 'forceDelete') return;

            (toast as any)[type]?.(type, { description: message });
        });
    }, [flash]);

    return <Toaster richColors position="top-center" toastOptions={{ duration: 6000, className: 'toaster' }} />;
};

export default CustomToaster;
