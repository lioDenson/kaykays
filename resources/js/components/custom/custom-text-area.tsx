import React from 'react';
import InputError from '../input-error';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

interface CustomTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    id: string;
    value?: string;
    error?: string;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({ label, id, value, error, ...props }) => {
    return (
        <div className="grid gap-4">
            <Label htmlFor={id}>{label}</Label>
            <Textarea id={id} name={id} {...props} value={value ?? ''}   />
            {error && <InputError message={error || ''} className="" />}
        </div>
    );
};

export default CustomTextArea;
