import { Edit, Info, LucideIcon, Trash2 } from 'lucide-react';
import CustomIconButton from './custom-icon-button';

interface btnProp {
    disabled: boolean;
    isLoading?: boolean;
    showLabel?: boolean;
    label: string;
    icon?: LucideIcon;
    className?: string;
    onClick: () => void;
}

interface CustomHeaderProps {
    deleteBtn?: btnProp;
    editBtn?: btnProp;
    infoBtn?: btnProp;
    children?: React.ReactNode;
}

const CustomActionsButtons = ({ deleteBtn, editBtn, infoBtn, children, }: CustomHeaderProps) => {
    const renderBtn = (btn: btnProp | undefined, defaultIcon: LucideIcon, baseClass: string  ) => {
        if (!btn) return null;
        const Icon = btn.icon || defaultIcon;

        return <CustomIconButton icon={Icon} isLoading={btn.isLoading} onClick={() => {btn.onClick();}} label={btn.label} showLabel={btn.showLabel} className={baseClass} />;
    };

    return (
        <div className="flex grid-cols-3 justify-end gap-2" >
            {renderBtn(infoBtn, Info, 'bg-blue-900 text-sky-300 hover:bg-sky-200 hover:text-blue-900')}
            {renderBtn(editBtn, Edit, 'bg-green-900 text-green-300 hover:bg-green-200 hover:text-green-900')}
            {renderBtn(deleteBtn, Trash2, 'bg-red-900 text-red-300 hover:bg-red-200 hover:text-red-900')}
            {children}
        </div>
    );
};

export default CustomActionsButtons;
