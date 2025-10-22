import { cn } from '@/lib/utils';
import { Loader, LucideIcon } from 'lucide-react';
import { Button } from '../ui/button';

interface Props {
    isLoading?: boolean;
    disabled?: boolean;
    icon: LucideIcon;
    onClick?: () => void;
    label?: string;
    showLabel?: boolean;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
}

const CustomIconButton = ({
    icon: Icon,
    onClick,
    label,
    showLabel = false,
    disabled = false,
    className,
    isLoading = false,
}: Props) => {
    return (
        <div
            
            onClick={disabled || isLoading ? undefined : onClick}
            className={cn(
                'flex items-center gap-2 p-1 rounded  text-sm md:text-xs font-thin',
                disabled || isLoading ? ' opacity-60' : 'cursor-pointer opacity-100',
                className,
            )}
        >
            {isLoading ? <Loader className="h-4 w-4 animate-spin" /> : <Icon className="h-4 w-4" />}
            {showLabel && label && <span>{label}</span>}
        </div>
    );
};

export default CustomIconButton;
