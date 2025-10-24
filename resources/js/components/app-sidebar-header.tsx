import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { SharedData, type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { router, usePage } from '@inertiajs/react';

import { useAppearance } from '@/hooks/use-appearance';
import { useIsMobile } from '@/hooks/use-mobile';
import { Bell, LogOut, MessageCircleMoreIcon, Monitor, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import CustomAvatar from './custom/custom-avatar';
import { CustomAvatarContainer } from './custom/custom-avatar-container';
import CustomIconAvatar from './custom/custom-icon-avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from './ui/dropdown-menu';
import CustomAppearanceToggleTab from './custom/custom-appearance-toggle-tab';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const { auth } = usePage<SharedData>().props;
    const logout = () => {
        router.post('/logout');
    };

    const { appearance, updateAppearance } = useAppearance();
    const isMobile = useIsMobile();

    return (
        <header className="my-2 flex h-auto w-full items-center border-b border-sidebar-border/50 bg-transparent px-4 py-3 backdrop-blur-sm transition-all duration-300 ease-linear md:my-4 md:h-20 md:px-6 md:py-4">
            <div className="flex w-full flex-col-reverse justify-center gap-3 md:gap-2">
                {/* Breadcrumb & sidebar trigger */}
                <div className="flex items-center gap-3 text-xs font-medium md:text-sm">
                    <SidebarTrigger className="-ml-2 h-6 w-6 transition-transform duration-300 hover:scale-120 md:-ml-4 rounded-0" />
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>

                <div className="mt-2 flex w-full items-center justify-between gap-3 px-1 md:mt-3 md:justify-end md:gap-5 md:px-2">
                    <CustomAvatarContainer className="me-1 flex gap-2 border-0 md:me-3">
                        <CustomIconAvatar className="bg-green-500 transition-transform duration-300 hover:scale-140" icon={Bell} badge={3} />
                        <CustomIconAvatar
                            className="bg-blue-500 transition-transform duration-300 hover:scale-140"
                            icon={MessageCircleMoreIcon}
                            badge={1}
                        />
                    </CustomAvatarContainer>

                    {/* appearance toggle */}
                    {isMobile ? (
                        <Badge
                            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition-all duration-300 hover:rotate-180 md:h-8 md:w-8"
                            onClick={() => updateAppearance(appearance === 'system' ? 'dark' : appearance === 'dark' ? 'light' : 'system')}
                        >
                            {appearance === 'system' ? (
                                <Monitor className="h-4 w-4" />
                            ) : appearance === 'dark' ? (
                                <Moon className="h-4 w-4" />
                            ) : (
                                <Sun className="h-4 w-4" />
                            )}
                        </Badge>
                    ) : (
                        <CustomAppearanceToggleTab />
                    )}

                    {/* profile dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger className="transition-transform duration-300 hover:scale-105">
                            <CustomAvatar name={auth.user.name} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="rounded-xl border border-border/40 shadow-lg">
                            <DropdownMenuLabel className="text-end font-semibold tracking-wide uppercase">Profile</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem>
                                <Button
                                    size={'sm'}
                                    variant={'ghost'}
                                    className="w-full justify-start transition-colors duration-200 hover:bg-accent/10"
                                    onClick={() => logout()}
                                >
                                    Log out <LogOut className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
