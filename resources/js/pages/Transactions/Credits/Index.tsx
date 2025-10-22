import CustomIndexPage from '@/components/custom/custom-index-page';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import AppLayout from '@/layouts/app-layout';
import { ColumnDefinition, Pagination } from '@/types/app-types';
import { Head } from '@inertiajs/react';

interface CreditInterface extends Pagination {
    data: {
        id: number;
        due_date: string;
        amount: number;
        status: 'pending' | 'paid' | 'overdue';
        description: string;
        sale: {
            invoice_number: string;
            amount: number;
            paid: number;
            balance: number;
            total: number;
        };
        customer: {
            user: {
                name: string;
                phone: string;
            };
        };
    }[];
}
export default function index({ credits }: { credits: CreditInterface }) {
    const saleDetails = (row) => {
        return (
            <Popover>
                <PopoverTrigger className="hover:cursor-pointer">
                    <Badge>See Sale Details</Badge>
                </PopoverTrigger>
                <PopoverContent className="overflow-auto">
                    <p className="font-bol text-center text-xs md:text-sm">Sale Details</p>
                    {row.sale.sale_items.map((item, i) => (
                        <p className="ms-1.5 flex gap-2 px-1 pt-1 text-xs md:text-sm">
                            <span>
                                {i + 1}. {item.product.name}
                            </span>{' '}
                            <span>
                                {item.quantity}
                                {item.product.unit}
                            </span>{' '}
                            <span>{item.total}</span>
                        </p>
                    ))}
                    <p className="ms-1.5 px-1 pt-1 text-end text-xs md:text-sm">Delivery: {row.sale.delivery_fee} </p>
                    <div className="mt-2 grid grid-cols-3 items-center justify-between gap-2 border-t-2 py-2 text-xs font-semibold md:text-xs">
                        <p className="text-blue-500">Total: {Number(row.sale.total) + Number(row.sale.delivery_fee)}</p>
                        <p className="text-green-400">Paid: {row.sale.paid}</p>
                        <p className="text-red-500">Balance: {row.sale.balance}</p>
                    </div>
                </PopoverContent>
            </Popover>
        );
    };

    const saleColumns: ColumnDefinition<any>[] = [
        {
            header: 'Sale',
            id: 'sale',
            sortable: true,
            filterable: true,
            accessorFn: (row) => row.sale.invoice_number,
            cell: (row) => {
                return saleDetails(row);
            }
        },
        {
            header: 'Customer',
            id: 'customer',
            sortable: true,
            filterable: true,
            accessorFn: (row) => row.customer?.user?.name ?? 'Walk in'
        },
        {
            header: 'Cost (Ksh)',
            id: 'amount',
            accessorFn: (row) => {
                // calculate the cost  of the sale (add cost of item and the delivery fee).
                return Number(row.sale.total) + Number(row.sale.delivery_fee);
            },
            filterable: false
        },

        {
            header: 'Paid Amt. (Ksh)',
            id: 'paid',
            accessorFn: (row) => row.sale.paid,
            filterable: true
        },
        {
            header: 'Balance (Ksh)',
            id: 'balance',
            accessorFn: (row) => row.sale.balance,
            filterable: true
        },
        {
            header: 'Payment Status',
            id: 'status',
            filterable: false,
            accessorKey: 'status',
            cell: (row) => {
                if (row.status === 'pending') {
                    return <Badge variant={'success'}>Pending</Badge>;
                }
            }
        },
        {
            header: 'Actions',
            accessorKey: 'actions',
            isActions: true
        }
    ];
    return (
        <AppLayout>
            <Head title="Credits" />
            <CustomIndexPage
                Header={{ title: 'Credits' }}
                Data={credits.data}
                Columns={saleColumns}
                emptyText="No credits found."
                paginate={{
                    from: credits.from,
                    to: credits.to,
                    total: credits.total,
                    links: credits.links,
                    next_page_url: credits.next_page_url,
                    prev_page_url: credits.prev_page_url,
                    current_page: credits.current_page
                }}
                handleEdit={(credit) => {
                    console.log(credit);
                }}
            />
        </AppLayout>
    );
}
