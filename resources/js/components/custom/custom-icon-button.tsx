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
    type = 'button',
}: Props) => {
    return (
        <Button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={cn(
                'flex items-center gap-2 rounded p-1 text-sm font-thin',
                disabled || isLoading ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
                className,
            )}
        >
            {isLoading ? <Loader className="h-4 w-4 animate-spin" /> : <Icon className="h-4 w-4" />}
            {showLabel && label && <span>{label}</span>}
        </Button>
    );
};

export default CustomIconButton;
