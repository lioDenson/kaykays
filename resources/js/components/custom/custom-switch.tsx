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
        <div className="gri">
            <Label className="grid cursor-pointer gap-2">
                {!hideLabel && <span className="">{label}</span>}
                <Switch className={cn('', className)} checked={checked} onCheckedChange={onChange} />
            </Label>
            <InputError message={error} className='mt-2' />
        </div>
    );
};

export default CustomSwitch;
