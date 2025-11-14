'use client';

import {
    ArrowRightLeft,
    Bike,
    BoxesIcon,
    CalendarCheck2Icon,
    ChartCandlestick,
    CircleUser,
    Coins,
    Combine,
    ContactRound,
    Files,
    FileSpreadsheet,
    FileStack,
    FolderKanban,
    Forklift,
    HandCoins,
    HouseIcon,
    KeySquare,
    LayoutGrid,
    PackageOpen,
    PieChart,
    Settings,
    SlidersHorizontal,
    SquareUser,
    Table2Icon,
    TableCellsMerge,
    Truck,
    UserCircle2,
    UserCog,
    Users,
    Wallet
} from 'lucide-react';
import * as React from 'react';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { usePage } from '@inertiajs/react';
import { CustomNavMain } from './custom/custom-nav-main';
import { Separator } from './ui/separator';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const auth = usePage().props.auth;
    const roles = auth.user.roles;
    let role = '';
    if (roles.length != 0) {
        role = roles[0].name;
    }

    const systemData = [
        ...(role == 'super-admin' || role == 'admin'
            ? [
                  {
                      title: 'Setting',
                      url: '#',
                      icon: Settings,
                      items: [
                          ...(role == 'super-admin' ? [{ title: 'Accounts', url: '/accounts', icon: KeySquare }] : []),
                          { title: 'Statistics', url: '#', icon: ChartCandlestick }
                      ]
                  }
              ]
            : [])
    ];

    const navData = [
        {
            title: 'Dashboard',
            url: '/dashboard',
            icon: LayoutGrid,
            isActive: true,
            items: [
                {
                    title: 'Home',
                    url: '/dashboard',
                    icon: HouseIcon
                },
                {
                    title: 'Add Sale',
                    url: '/sales/create',
                    icon: HandCoins
                }
            ]
        },
        {
            title: 'Inventory',
            url: '#',
            icon: Combine,
            items: [
                ...(role == 'super-admin' || role == 'admin'
                    ? [
                          { title: 'Categories', url: '/categories', icon: ArrowRightLeft },
                          { title: 'Product', url: '/products', icon: Forklift },
                          { title: 'Supplier', url: '/suppliers', icon: PackageOpen }
                      ]
                    : []),
                { title: 'Stock', url: '/batches', icon: BoxesIcon }
            ]
        },
        {
            title: 'People',
            url: '#',
            icon: UserCircle2,
            items: [
                ...(role == 'super-admin' || role == 'admin'
                    ? [
                          { title: 'System Users', url: '/users', icon: Users },
                          { title: 'Super Admins', url: '/users/type/super-admin', icon: UserCog },
                          { title: 'Admins', url: '/users/type/admin', icon: ContactRound },
                          { title: 'Cashiers', url: '/users/type/cashier', icon: Users },
                          { title: 'Riders', url: '/riders', icon: Bike },
                          { title: 'Customers', url: '/customers', icon: SquareUser }
                      ]
                    : [
                          { title: 'Profile', url: '/customers', icon: CircleUser },
                          { title: 'Customers', url: '/customers', icon: SquareUser }
                      ])
            ]
        },

        {
            // Delivery
            title: 'Summaries',
            url: '#',
            icon: Truck,
            items: [
                { title: 'Deliveries', url: '/deliveries', icon: Truck },
                { title: 'Sales', url: '/sales', icon: Table2Icon }
            ]
        },
        {
            // Payments
            title: 'Transactions',
            url: '#',
            icon: ArrowRightLeft,
            items: [
                { title: 'Payments', url: '/payments', icon: HandCoins },
                { title: 'Credits', url: '/credits', icon: Coins },
                { title: 'Manual Adjustment', url: '#', icon: SlidersHorizontal },
                { title: 'Expenses & Refunds', url: '#', icon: Wallet }
            ]
        },

        {
            title: 'Reports',
            url: '#',
            icon: FileStack,
            items: [
                { title: 'Sales Reports', url: '#', icon: Files },
                { title: 'Inventory Reports', url: '#', icon: FolderKanban },
                { title: 'Delivery Reports', url: '#', icon: CalendarCheck2Icon },
                { title: 'Payment Reports', url: '#', icon: FileSpreadsheet },
                { title: 'Credits Reports', url: '#', icon: TableCellsMerge },
                { title: 'Expenses Reports', url: '#', icon: PieChart }
            ]
        }
    ];

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader></SidebarHeader>
            <SidebarContent>
                <CustomNavMain label="Navigation" items={navData} />
                <Separator />
            </SidebarContent>
            {role == 'super-admin' ||
                (role == 'admin' && (
                    <SidebarFooter>
                        <CustomNavMain label="System" items={systemData} />
                    </SidebarFooter>
                ))}
            <SidebarRail />
        </Sidebar>
    );
}
