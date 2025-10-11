import { Appearance, useAppearance } from '@/hooks/use-appearance';
import { Sun, Moon, Monitor, LucideIcon } from 'lucide-react';
import { CustomAvatarContainer } from './custom-avatar-container';
import CustomIconAvatar from './custom-icon-avatar';

export default function CustomAppearanceToggleTab() {
    const { appearance, updateAppearance } = useAppearance();
    const tabs:{ value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
    ]
    return (
        <CustomAvatarContainer>
            {tabs.map(({ value, icon: Icon }) => (
                <CustomIconAvatar onClick={() => updateAppearance(value)} key={value} icon={Icon} className={
                    `${appearance === value ? 'bg-primary text-secondary' : '' } justify-center p-0`
                } />
            ))}
        </CustomAvatarContainer>
    )
}
