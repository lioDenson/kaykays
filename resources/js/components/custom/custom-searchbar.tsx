import { Loader2, Search } from 'lucide-react';
import InputError from '../input-error';
import { Input } from '../ui/input';
interface CustomSearchBarProps extends React.HTMLAttributes<HTMLInputElement> {
    searching: boolean;
    disabled?: boolean;
    value?: string;
    placeholder?: string;
    error?: string;
    setQuery: (query: string) => void;
}

const CustomSearchBar: React.FC<CustomSearchBarProps> = ({ searching, disabled = false, setQuery, value, error }: CustomSearchBarProps) => {
    
    return (
        <div className="flex flex-col gap-1">
            <div className="flex h-9 items-center justify-center rounded-2xl bg-accent/50">
                <Search className="mx-2 mr-4 h-5 w-5 shrink-0 opacity-50" />
                <Input
                    disabled={disabled}
                    value={value}
                    onChange={(e) => {
                        setQuery(e.target.value);
                    }}
                    className={`h-full rounded-none border-0 ${searching ? '' : 'rounded-r-2xl'} bg-accent/90 px-2 ring-0 focus:ring-0 focus-visible:ring-0`}
                    placeholder="Start typing ..."
                />
                {searching && <Loader2 className="mx-2 h-5 w-5 animate-spin" />}
            </div>
            {error &&  <InputError message={error} />}
        </div>
    );
};

export default CustomSearchBar;
