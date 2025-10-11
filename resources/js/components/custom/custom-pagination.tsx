import { cn } from '@/lib/utils';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination';

interface CustomPaginationInterface extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    next_page: string;
    prev_page: string;
    prevClassName?: string;
    nextClassName?: string;
    links: {
        active: boolean;
        url: string;
        size?: 'default' | number;
        label: string | number;
    }[];
}

const CustomPagination: React.FC<CustomPaginationInterface> = ({ className, next_page, prev_page, prevClassName, nextClassName, links }) => {
    return (
        <div className={'mt-4 text-xs'}>
            <Pagination>
                <PaginationContent>
                    <PaginationItem className="text-xs">
                        <PaginationPrevious
                            href={prev_page}
                            size={'default'}
                            className={cn(`${prev_page == null ? 'cursor-not-allowed' : ''} mx-2`, prevClassName)}
                        />
                        {links.map(
                            (link, i) =>
                                i != links.length - 1 &&
                                i != 0 && (
                                    <PaginationLink
                                        
                                        isActive={link.active}
                                        href={link.url}
                                        key={i}
                                        size={link.size}
                                        children={<>{link.label}</>}
                                        className={cn(`h-6 w-6 rounded-none p-0.5 ${link.active ? 'text-blue-600' : ''}`, className)}
                                    />
                                )
                        )}
                        <PaginationNext
                            href={next_page}
                            size={'default'}
                            className={cn(`${next_page == null ? 'cursor-not-allowed' : ''} mx-2`, nextClassName)}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
};

export default CustomPagination;
