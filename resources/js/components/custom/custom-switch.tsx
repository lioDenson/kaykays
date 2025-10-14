import { cn } from '@/lib/utils';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import InputError from '../input-error';

interface CustomSwitchProps {
    checked: boolean;
    label: string;
    hideLabel?: boolean;
    className?: string;
    error?: string;
    onChange: (checked: boolean) => void;
}
const CustomSwitch = ({ checked, onChange, label, hideLabel = false, className, error }: CustomSwitchProps) => {
    return (
        <div className={cn('grid gap-2', className)}>
            <Label className="grid cursor-pointer gap-2">
                {!hideLabel && <span className="">{label}</span>}
                <Switch  checked={checked} onCheckedChange={onChange} />
            </Label>
            <InputError message={error} className='mt-2' />
        </div>
    );
};

export default CustomSwitch;
