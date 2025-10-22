import { cn } from '@/lib/utils';
import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}
export function CustomAvatarContainer({ children, className }: ContainerProps) {
    return <div className={cn('flex items-center space-x-2 rounded-2xl p-1  border-muted-200 border', className)}>{children}</div>;
}
