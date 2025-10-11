import React from 'react';
import InputError from '../input-error';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id: string;
    name: string;
    error?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ label, name, id, error, ...props }) => {
    return (
        <div className="grid gap-2">
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} name={name} {...props} />
            {error && <InputError message={error || ''} className="mt-2" />}
        </div>
    );
};

export default CustomInput;
