import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { Shield, Zap } from 'lucide-react';
import { type PropsWithChildren, useEffect, useState } from 'react';
import { route } from 'ziggy-js';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const [isDark, setIsDark] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check system theme
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDark(isDarkMode);

        // Add entrance animation
        setIsVisible(true);
    }, []);

    return (
        <div className="min-h-svh bg-gradient-to-br from-slate-50 via-blue-50/40 to-cyan-50/30 p-4 transition-colors duration-500 md:p-6 dark:from-gray-900 dark:via-purple-900/30 dark:to-violet-900/20">
            {/* Animated background elements */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div
                    className={`absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl transition-all duration-1000 dark:bg-blue-500/15 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                ></div>
                <div
                    className={`absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl transition-all delay-200 duration-1000 dark:bg-cyan-500/15 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                ></div>
                <div
                    className={`absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-200/15 blur-3xl transition-all delay-400 duration-1000 dark:bg-purple-500/10 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                ></div>
            </div>

            <div className="relative flex min-h-svh items-center justify-center">
                <div className="w-full max-w-md">
                    {/* Main Auth Card */}
                    <div
                        className={`glass rounded-3xl border border-white/60 bg-white/90 p-8 shadow-2xl backdrop-blur-xl transition-all duration-500 md:p-10 dark:border-gray-700/60 dark:bg-gray-900/90 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                    >
                        {/* Header Section */}
                        <div className="mb-8 flex flex-col items-center gap-6">
                            {/* Animated Logo */}
                            <Link
                                onClick={() => {
                                    window.location.href = route('dashboard');
                                }}
                                className="group flex flex-col items-center gap-3 font-medium transition-all duration-300 hover:scale-105"
                            >
                                <div className="relative">
                                    <div className="flex h-18 w-18 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-500 shadow-lg transition-all duration-300 group-hover:from-blue-600 group-hover:to-cyan-600 group-hover:shadow-xl">
                                        <AppLogoIcon className="size-9 fill-current text-white" />
                                    </div>
                                    {/* Pulse animation */}
                                    <div className="absolute inset-0 animate-pulse rounded-2xl bg-gradient-to-br from-green-900 via-green-600 to-green-500 opacity-20 group-hover:opacity-30">
                                        {' '}
                                    </div>
                                </div>
                                <span className="sr-only">{title}</span>
                            </Link>

                            {/* Title & Description */}
                            <div className="space-y-4 text-center">
                                <div className="space-y-2">
                                    <h1 className="bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-2xl font-bold text-transparent md:text-3xl dark:from-white dark:to-gray-200">
                                        {title}
                                    </h1>
                                    <div className="flex items-center justify-center gap-2">
                                        <Shield className="h-4 w-4 text-green-500" />
                                        <span className="text-xs font-medium text-green-600 dark:text-green-400">Secure Connection</span>
                                    </div>
                                </div>
                                <p className="max-w-sm text-sm leading-relaxed text-gray-600 md:text-base dark:text-gray-400">{description}</p>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="space-y-6">{children}</div>

                        {/* Security Footer */}
                        <div className="mt-8 border-t border-gray-200/60 pt-6 dark:border-gray-700/60">
                            <div className="flex items-center justify-center text-xs">
                                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-500">
                                    <Zap className="h-3 w-3" />
                                    <span>Fast & Secure App</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom gradient */}
            <div className="pointer-events-none fixed right-0 bottom-0 left-0 h-20 bg-gradient-to-t from-white/50 to-transparent dark:from-gray-900/50"></div>
        </div>
    );
}
