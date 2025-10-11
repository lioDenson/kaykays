import { AvatarFallback, AvatarImage, Avatar as BaseAvatar } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';

interface AvatarProps {
    imageUrl?: string;
    name: string;
    className?: string;
    withName?: boolean;
    onClick?: () => void
}

const CustomAvatar = ({ name, imageUrl, className, withName=false, onClick }: AvatarProps) => {
    // crate name initials
    const getInitials = useInitials();
     const initials = getInitials(name);
    return (
        <span className="flex flex-col items-center" onClick={onClick}>
            <BaseAvatar className={className}>
                {imageUrl ? (
                    <AvatarImage src={imageUrl} alt={name} />
                ) : (
                    <AvatarFallback className="flex items-center justify-center bg-gray-300 text-black">{initials}</AvatarFallback>
                )}
            </BaseAvatar>
            {withName && <span className="text-sm capitalize">{name}</span>}
        </span>
    );
};

export default CustomAvatar;
