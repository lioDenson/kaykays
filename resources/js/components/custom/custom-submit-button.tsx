import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // make sure you have this
import { Loader } from 'lucide-react';
import React from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: React.ReactNode;
    type?: 'submit' | 'reset' | 'button';
    className?: string;
    isLoading?: boolean;
    label: string;
    activeLabel?: string;
    onClick?: () => void;
}

const CustomSubmitButton: React.FC<Props> = ({
    label,
    children,
    type = 'submit',
    activeLabel = 'submitting...',
    className,
    isLoading = false,
    onClick
}) => {
    return (
        <Button type={type} className={cn('', className)} onClick={onClick}>
            {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? activeLabel : label}
            {children}
        </Button>
    );
};

export default CustomSubmitButton;
