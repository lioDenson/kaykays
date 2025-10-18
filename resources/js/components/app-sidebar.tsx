'use client';

import {
    ArrowRightLeft,
    Bike,
    BoxesIcon,
    CalendarCheck2Icon,
    ChartCandlestick,
    Coins,
    Combine,
    ContactRound,
    Euro,
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
    TableOfContentsIcon,
    Truck,
    UserCircle2,
    UserCog,
    Users,
    Wallet
} from 'lucide-react';
import * as React from 'react';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { CustomNavMain } from './custom/custom-nav-main';
import { Separator } from './ui/separator';

const systemData = [
    {
        title: 'Setting',
        url: '#',
        icon: Settings,
        items: [
            { title: 'Accounts', url: '/accounts', icon: KeySquare },
            { title: 'Statistics', url: '#', icon: ChartCandlestick }
        ]
    }
];

const navData = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
        isActive: true,
        items: [
            { title: 'Home', url: '/dashboard', icon: HouseIcon },
            {
                title: 'Add Sale',
                url: '/sales/create',
                icon: HandCoins
            },
            {
                title: 'Add Delivery',
                url: '#',
                icon: Truck
            }
        ]
    },
    {
        title: 'Inventory',
        url: '#',
        icon: Combine,
        items: [
            { title: 'Product', url: '/products', icon: Forklift },
            { title: 'Stock', url: '/batches', icon: BoxesIcon },
            { title: 'Supplier', url: '/suppliers', icon: PackageOpen }
        ]
    },
    {
        title: 'People',
        url: '#',
        icon: UserCircle2,
        items: [
            { title: 'System Users', url: '/users', icon: Users },
            { title: 'Super Admins', url: '/users/type/super-admin', icon: UserCog },
            { title: 'Admins', url: '/users/type/admin', icon: ContactRound },
            { title: 'Cashiers', url: '/users/type/cashier', icon: Users },
            { title: 'Riders', url: '/riders', icon: Bike },
            { title: 'Customers', url: '/customers', icon: SquareUser }
        ]
    },
    {
        // Delivery
        title: 'Summaries',
        url: '#',
        icon: Truck,
        items: [
            { title: 'All Deliveries', url: '/deliveries', icon: TableOfContentsIcon },
            { title: 'All Sales', url: '/sales', icon: Euro },
            { title: 'All Supplies ', url: '#', icon: Table2Icon }
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader></SidebarHeader>
            <SidebarContent>
                <CustomNavMain label="Navigation" items={navData} />
                <Separator />
            </SidebarContent>
            <SidebarFooter>
                <Separator />
                <CustomNavMain label="System" items={systemData} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
