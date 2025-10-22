import { cn } from '@/lib/utils';
import React from 'react';
import InputError from '../input-error';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    id?: string;
    name?: string;
    error?: string;
    inputClassName?: string;
    className?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ label, name, id, error, className, inputClassName, ...props }) => {
    return (
        <div className={cn('grid gap-2', className)}>
            <Label className="text-xs md:text-sm" htmlFor={id}>
                {label}
            </Label>
            <Input id={id} className={cn('w-full', inputClassName)} name={name} {...props} />
            {error && <InputError message={error || ''} className="mt-2" />}
        </div>
    );
};

export default CustomInput;
