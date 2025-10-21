import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ReactNode, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import InputError from '../input-error';

interface CustomSelectionProps {
    data: Record<string, unknown>[];
    label?: string;
    error?: string;
    selectedOption?: Record<string, unknown> | null;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
    onSelect: (value: Record<string, unknown> | null) => void;
    side?: 'left' | 'right' | 'top' | 'bottom';
    align?: 'start' | 'end' | 'center';
}

const CustomSelection = ({
    data,
    label = 'Select',
    placeholder,
    disabled = false,
    selectedOption,
    className,
    onSelect,
    side = 'bottom',
    align = 'end',
    error,
}: CustomSelectionProps) => {
    const [open, setOpen] = useState(false);

    const options = [
        { value: null, label: '❌ Cancel selection' },
        ...data
            .filter((item) => item.name !== '')
            .map((entry) => ({
                value: entry.id,
                label: entry.name,
            })),
    ];

    const [selected, setSelected] = useState<Record<string, unknown> | null>(selectedOption ?? null);

    // keep state in sync if parent updates selectedOption
    useEffect(() => {
        if (selectedOption) {
            setSelected(selectedOption);
        } else {
            setSelected(null);
        }
    }, [selectedOption]);

    return (
        <div className={cn('grid gap-2', className)}>
            <Label>{label}</Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild disabled={disabled}>
                    <Button variant="outline" className="w-full justify-start">
                        {selected ? <div>{selected.label as string}</div> : <span className="text-muted-foreground">{placeholder ?? label}</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className={'p-0'} side={side} align={align}>
                    <Command>
                        <CommandInput placeholder={placeholder ?? `Search ${label}...`} />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                                {options.map((option) => (
                                    <CommandItem
                                        key={String(option.value)}
                                        value={option.label as string}
                                        onSelect={(value) => {
                                            if (option.value === null) {
                                                // cancel option clicked
                                                setSelected(null);
                                                setOpen(false);
                                                onSelect(null);
                                                return;
                                            }

                                            const item = data.find((select) => select.name === value);
                                            if (item) {
                                                const selectedItem = {
                                                    value: Number(item.id),
                                                    label: item.name
                                                };
                                                setSelected(selectedItem);
                                                setOpen(false);
                                                onSelect(selectedItem);
                                            }
                                        }}
                                    >
                                        {option.label as string}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            {error && <InputError message={error} />}
        </div>
    );
};

export default CustomSelection;
