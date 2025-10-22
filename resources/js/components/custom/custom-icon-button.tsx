import { cn } from '@/lib/utils';
import { Loader, LucideIcon } from 'lucide-react';

interface Props {
    isLoading?: boolean;
    disabled?: boolean;
    icon: LucideIcon;
    onClick?: () => void;
    label?: string;
    showLabel?: boolean;
    className?: string;
    variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'dark';
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
    variant = 'primary'
}: Props) => {
   const colorMap: Record<string, string> = {
  primary: 'bg-primary text-secondary hover:bg-primary/90',
  secondary: 'bg-secondary text-primary hover:bg-secondary/90',
  danger: 'bg-red-600 text-white hover:bg-red-500',
  success: 'bg-green-600 text-white hover:bg-green-500',
  warning: 'bg-yellow-600 text-white hover:bg-yellow-500',
  info: 'bg-blue-600 text-white hover:bg-blue-500',
  light: 'bg-gray-200 text-black hover:bg-gray-300',
  dark: 'bg-gray-800 text-white hover:bg-gray-700',
};

const color = colorMap[variant] ?? '';

    console.log(variant);
    return (
        <div
            onClick={disabled || isLoading ? undefined : onClick}
            className={cn(
                `flex items-center justify-center gap-2 rounded p-1 text-sm font-thin md:text-xs ${color}`,
                disabled || isLoading ? 'opacity-60' : 'cursor-pointer opacity-100',

                className
            )}
        >
            {isLoading ? <Loader className="h-4 w-4 animate-spin" /> : <Icon className="h-4 w-4" />}
            {showLabel && label && <span>{label}</span>}
        </div>
    );
};

export default CustomIconButton;
