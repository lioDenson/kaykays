import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { SharedData, type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { router, usePage } from '@inertiajs/react';

import { Bell, LogOut, MessageCircleMoreIcon } from 'lucide-react';
import CustomAppearanceToggleTab from './custom/custom-appearance-toggle-tab';
import CustomAvatar from './custom/custom-avatar';
import { CustomAvatarContainer } from './custom/custom-avatar-container';
import CustomIconAvatar from './custom/custom-icon-avatar';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const { auth } = usePage<SharedData>().props;
    const logout = () => {
        router.post('/logout');
    };

    return (
        <header className="flex h-16 shrink-0  items-center gap-2  w-full border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex w-full items-center justify-between gap-2 pr-4">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                <div className="flex w-full items-center justify-end gap-4 px-2">
                    <CustomAvatarContainer className="me-4 gap-3 border-0">
                        <CustomIconAvatar className="bg-green-500" icon={Bell} badge={3} />
                        <CustomIconAvatar className="bg-blue-500" icon={MessageCircleMoreIcon} badge={1} />
                    </CustomAvatarContainer>
                    <CustomAppearanceToggleTab />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <CustomAvatar name={auth.user.name}  />
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
        </header>
    );
}
