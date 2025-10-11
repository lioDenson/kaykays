import { router } from '@inertiajs/react';
import { Trash2, Undo2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export interface ActionsProps {
    type: 'forceDelete' | 'restore' | 'message';
    message: string;
    id: number;
}
interface CustomActionToasterProps {
    actions: ActionsProps[];
}

const CustomActionToaster = ({ actions }: CustomActionToasterProps) => {
    const [progress, setProgress] = useState(100);
    const [final, setFinal] = useState<Record<string, string>>({});
    const [visible, setVisible] = useState(false);
    const duration = 10000;

    const [actionToast, setActionToast] = useState({
        success: '',
        error: '',
        info: '',
        warning: '',
        restore: '',
        forceDelete: '',
        id: '0',
    });

    useEffect(() => {
        const updated: typeof actionToast = {
            success: '',
            error: '',
            info: '',
            warning: '',
            restore: '',
            forceDelete: '',
            id: '0',
        };

        Object.entries(actions).forEach(([type, message]) => {
            if (message) {
                updated[type as keyof typeof actionToast] = message.toString();
            }
        });

        if (Object.keys(updated).length > 0) {
            setActionToast((prev) => ({
                ...prev,
                ...updated,
            }));
        }
        setVisible(!visible);
    }, [actions]);

    const nonEmpty = Object.entries(actionToast).filter(([, value]) => value && value.trim() !== '');

    // useEffect(() => {
    //     if (!visible) setActionToast({ success: '', error: '', info: '', warning: '', restore: '', forceDelete: '', id: '0' });
    // });

    useEffect(() => {
        if (!visible) return;

        setProgress(100); // reset progress when showing

        const step = 100 / (duration / 100);

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev <= 0) {
                    clearInterval(interval);
                    setVisible(false);
                    return 0;
                }
                return prev - step;
            });
        }, 100);

        const timer = setTimeout(() => setVisible(false), duration);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
            setProgress(100);
        };
    }, [visible, duration]);

    useEffect(() => {
        if (nonEmpty.length > 0) {
            const obj = Object.fromEntries(nonEmpty);
            setFinal(obj);
            setVisible(true);

            const timer = setTimeout(() => {
                setVisible(false);
                setProgress(100);
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [actionToast]);

    const restore = (routeUrl: string) => {
        router.patch(routeUrl);
        setVisible(false);
    };

    const forceDelete = (routeUrl: string) => {
        router.delete(routeUrl);
        setVisible(false);
    };

    if (!final.restore && !final.forceDelete) return null;

    return (
        <div
            className={`fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 transform flex-col rounded-2xl bg-secondary/90 px-2 pt-1 pb-2 transition-all duration-300 ease-in-out ${
                visible ? 'translate-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
            }`}
        >
            <div className="flex min-w-[300px] items-center justify-between gap-4 rounded-2xl border border-secondary bg-primary p-3 shadow-lg">
                <div className="toast-message text-destructive-foreground">{final.message}</div>
                <div className="flex gap-3">
                    {final.restore && (
                        <button
                            className="flex items-center justify-center gap-1 rounded text-black hover:bg-accent hover:p-1 hover:text-accent-foreground"
                            onClick={() => restore(final.restore)}
                        >
                            <Undo2 className="h-4 w-4" />
                            <span className="text-blur text-sm font-thin">Restore</span>
                        </button>
                    )}
                    {final.forceDelete && (
                        <button className="rounded bg-destructive p-1 px-2 text-white" onClick={() => forceDelete(final.forceDelete)}>
                            <Trash2 className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>
            <div className="flex w-full justify-center">
                <div className="mt-2 h-1 w-10/12 overflow-hidden rounded bg-gradient-to-r from-red-600 to-blue-600">
                    <div className="h-1 bg-gray-300 transition-all duration-100 ease-linear" style={{ width: `${progress}%` }} />
                </div>
            </div>
        </div>
    );
};

export default CustomActionToaster;
