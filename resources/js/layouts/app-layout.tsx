import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { Links } from '@/pages/interface/general';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    links?: Links[];
}

export default ({ children, breadcrumbs, links, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props} links={links}>
        <div className="overflow-y-auto overflow-x-hidden text-xs md:text-sm lg:text-base">{children}</div>
    </AppLayoutTemplate>
);
