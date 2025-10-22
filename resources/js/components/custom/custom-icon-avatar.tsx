import { AvatarFallback, Avatar as BaseAvatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils'; // shadcn helper
import React from 'react';

type IconAvatarProps = {
    icon?: React.ElementType;
    badge?: string | number; // could be a number or text
    className?: string;
    onClick?: () => void;
};

const IconAvatar: React.FC<IconAvatarProps> = ({ icon, badge, className,onClick }) => {
    return (
        <div className="relative inline-block" onClick={onClick}>
            <BaseAvatar className='h-5.5 w-8.5'>
                <AvatarFallback className={cn('flex items-center justify-start px-1', className)}>
                    {icon && React.createElement(icon, { className: 'size-4' })}
                </AvatarFallback>
            </BaseAvatar>

            {badge && (
                <span className="absolute -top-1.5 -right-2 flex items-center justify-center rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] text-white">
                    {badge}
                </span>
            )}
        </div>
    );
};

export default IconAvatar;
