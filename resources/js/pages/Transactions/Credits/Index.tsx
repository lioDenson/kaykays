import CustomIconButton from '@/components/custom/custom-icon-button';
import CustomIndexPage from '@/components/custom/custom-index-page';
import CustomInput from '@/components/custom/custom-input';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import AppLayout from '@/layouts/app-layout';
import { ColumnDefinition, Pagination } from '@/types/app-types';
import { Head } from '@inertiajs/react';
import { ClipboardCheck, EuroIcon, Ticket, X } from 'lucide-react';

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
                    <Badge variant={'info'}>See Sale Details</Badge>
                </PopoverTrigger>
                <PopoverContent className="overflow-auto border-blue-400">
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
                    <p className="ms-1.5 px-1 pt-1 text-end text-xs text-red-300 italic md:text-sm">Delivery: {row.sale.delivery_fee} </p>
                    <div className="mt-2 grid grid-cols-3 items-center justify-between gap-2 border-t-2 py-2 text-xs font-semibold md:text-xs">
                        <p className="text-blue-500">Total: {Number(row.sale.total) + Number(row.sale.delivery_fee)}</p>
                        <p className="text-green-400">Paid: {row.sale.paid}</p>
                        <p className="text-red-500">Balance: {row.sale.balance}</p>
                    </div>
                </PopoverContent>
            </Popover>
        );
    };

    const handlePayment = (row) => {
        return (
            <Popover>
                <PopoverTrigger>
                    <div className="flex w-full justify-center">
                        <CustomIconButton icon={EuroIcon} variant="info" label="Make Payment" showLabel />
                    </div>
                </PopoverTrigger>
                <PopoverContent className="overflow-auto border-blue-400 px-1 py-0.5 text-xs md:text-sm">
                    <p className="text-center font-bold">Make Payment</p>
                    <div className="flex flex-col gap-2 py-2">
                        <p className="font-bold">
                            Bill Balance: <span className="text-red-500">{row.balance}</span>
                        </p>
                        <div className="flex gap-4 px-2">
                            <CustomInput name="mpesa" label="Mpesa" inputClassName="bg-green-600 text-black" className="font-bold text-green-400" />
                            <CustomInput
                                name="cash"
                                label="Cash"
                                inputClassName="bg-amber-500/60 text-black text-end "
                                className="pe-0.5 text-end font-bold text-amber-600"
                            />
                        </div>
                        <div className="flex w-full text-end">
                            <p className="w-full text-end font-bold">
                                Balance <span className="text-amber-500">{row.balance}</span>
                            </p>
                        </div>
                        <div className="mt-2 flex w-full items-center justify-end  gap-5 pr-4">
                            <Tooltip>
                                <TooltipTrigger>
                                    <CustomIconButton variant="dark" icon={X} />
                                </TooltipTrigger>
                                <TooltipContent className='bg-red-200'>Cancel Payment</TooltipContent>
                            </Tooltip>
                            <Tooltip>
                                <TooltipTrigger>
                                    <CustomIconButton variant="success" icon={ClipboardCheck} />
                                </TooltipTrigger>
                                <TooltipContent>Confirm Payment</TooltipContent>
                            </Tooltip>
                        </div>
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
            header: 'Action',
            accessorKey: 'actions',
            cell: (row) => {
                return handlePayment(row);
            }
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
