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
        <header className="flex h-16 w-full shrink-0 items-center gap-2 border-b border-sidebar-border/50 p-2 px:md-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex w-full  flex-col-reverse items-start justify-between py-2 gap-1 md:pr-4">
                <div className='flex items-center gap-2 text-neutral-500 font-medium text-sm mb-4'>
                    <SidebarTrigger className="-ml-1" />
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
                <div className="flex items-center justify-end w-12/12 mt-4  gap-4 px-2">
                    <CustomAvatarContainer className="me-2 border-0">
                        <CustomIconAvatar className="bg-green-500" icon={Bell} badge={3} />
                        <CustomIconAvatar className="bg-blue-500" icon={MessageCircleMoreIcon} badge={1} />
                    </CustomAvatarContainer>
                    {/*  */}
                    {isMobile ? (
                        <Badge
                            className="h-6 w-6 rounded-full"
                            onClick={() => updateAppearance(appearance === 'system' ? 'dark' : appearance === 'dark' ? 'light' : 'system')}
                        >
                            {appearance === 'system' ? <Monitor /> : appearance === 'dark' ? <Moon /> : <Sun />}
                        </Badge>
                    ) : (
                        <CustomAppearanceToggleTab />
                    )}
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <CustomAvatar name={auth.user.name} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel className="text-end font-semibold uppercase">Profile</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem>
                                <Button size={'sm'} variant={'ghost'} className="w-full justify-start" onClick={() => logout()}>
                                    Log out <LogOut className="ml-2 h-4 w-4" />{' '}
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
