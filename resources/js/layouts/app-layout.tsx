import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { Links } from '@/pages/interface/general';
import { type BreadcrumbItem } from '@/types';
import { LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    links?: Links[];
}

export default ({ children, breadcrumbs, links, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props} links={links}>
        <div className="overflow-y-auto overflow-x-hidden">{children}</div>
    </AppLayoutTemplate>
);
