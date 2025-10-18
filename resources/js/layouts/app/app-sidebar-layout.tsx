import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import CustomQuickLinks from '@/components/custom/custom-quicklinks';
import { Links } from '@/pages/interface/general';
import { type BreadcrumbItem } from '@/types';
import { LucideIcon } from 'lucide-react';
import { type PropsWithChildren } from 'react';


export default function AppSidebarLayout({ children, breadcrumbs = [] , links}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[], links?: Links[] }>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="max-h-screen overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
                {/* {links && <CustomQuickLinks links={links} />} */}
            </AppContent>
        </AppShell>
    );
}
