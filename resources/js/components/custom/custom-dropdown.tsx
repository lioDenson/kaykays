'use client';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import * as React from 'react';
import InputError from '../input-error';
import { Label } from '../ui/label';

interface CustomDropdownProps {
    trigger: string;
    label: string;
    items: { label: string; value: string }[];
    error?: string;
    onChange: (value: string) => void;
}

const CustomDropdown = ({ trigger, label, items, error, onChange }: CustomDropdownProps) => {
    const [selected, setSelected] = React.useState<string>('');

    const handleSelect = (value: string) => {
        setSelected(value);
        onChange(value);
    };

    return (
        <div className="grid gap-2">
            <Label>{label}</Label>
            <DropdownMenu >
                <DropdownMenuTrigger asChild>
                    <div className='border rounded flex items-center px-4' >{selected ? items.find((i) => i.value === selected)?.label : trigger}</div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>{label}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {items.map((item) => (
                        <DropdownMenuItem key={item.value} onClick={() => handleSelect(item.value)} className="cursor-pointer">
                            {item.label}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
            {error && <InputError message={error} className="mt-1" />}
        </div>
    );
};

export default CustomDropdown;
