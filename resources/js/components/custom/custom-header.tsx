
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';

interface CustomHeaderProps {
    className?: string;
    children?: React.ReactNode;
    button?: 
        {
            label: string;
            icon?: LucideIcon;
            className?: string;
            onClick: () => void;
        }
    
    title: string;
}
const CustomHeader = ({className, children, title, button}: CustomHeaderProps) => {
    return (
        <div className={cn('flex w-full items-center justify-between  bg-foreground/20 p-2 px-4', className)}>

            <h1 className="text-lg font-bold text-primary">{title}</h1>
            {children}
            {button && (
                <div className="flex items-center gap-2">
                    <Button
                        onClick={button.onClick}
                        className={cn(
                            'flex items-center gap-2 rounded-md border border-foreground bg-accent px-4 py-2 text-sm font-medium text-foreground hover:text-background',
                            button.className,
                        )}
                    >
                        {button.icon && <button.icon className="h-4 w-4" />}
                        {button.label}
                    </Button>
                </div>
            )}
        </div>
    );
}

export default  CustomHeader;