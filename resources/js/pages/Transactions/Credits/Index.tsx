import CustomIconButton from '@/components/custom/custom-icon-button';
import CustomIndexPage from '@/components/custom/custom-index-page';
import CustomInput from '@/components/custom/custom-input';
import { FlashMessage } from '@/components/custom/custom-toaster';
import { Badge } from '@/components/ui/badge';
import { Item, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Spinner } from '@/components/ui/spinner';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { sanitizeOnBlur, sanitizeOnChange } from '@/helpers/numberSanitizer';
import AppLayout from '@/layouts/app-layout';
import { ColumnDefinition, Pagination } from '@/types/app-types';
import { Head, router, usePage } from '@inertiajs/react';
import { CircleCheckBig, EuroIcon, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { route } from 'ziggy-js';

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
export default function Index({ credits }: { credits: CreditInterface }) {
    const errors = usePage().props.errors;

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

    function PaymentCell({ row }) {
        const [mpesa, setMpesa] = useState(0);
        const [cash, setCash] = useState(0);
        const [loading, setLoading] = useState(false);
        const balance = row.sale.balance;
        const [paymentBalance, setPaymentBalance] = useState(balance);
        const [openState, setOpenState] = useState<Record<number, boolean>>({});

        const toggleOpen = (id: number) => {
            setOpenState((prev) => ({
                ...prev,
                [id]: !prev[id]
            }));
        };

        const { errors } = usePage().props;

        useEffect(() => {
            if (errors[`form_${row.id}`]) {
                setOpenState((prev) => ({
                    ...prev,
                    [row.id]: true
                }));
            }
        }, [errors, row.id]);

        const paymentChange = useCallback(
            (type: 'mpesa' | 'cash', amount: number) => {
                let newMpesa = mpesa;
                let newCash = cash;
                if (type === 'mpesa') {
                    newMpesa = amount;
                    setMpesa(amount);
                } else {
                    newCash = amount;
                    setCash(amount);
                }
                // Prevent overpaying
                if (newMpesa + newCash > balance) {
                    if (type === 'mpesa') {
                        newMpesa = balance - newCash;
                        setMpesa(Math.max(0, newMpesa));
                    } else {
                        newCash = balance - newMpesa;
                        setCash(Math.max(0, newCash));
                    }
                }
                setPaymentBalance(balance - newMpesa - newCash);
            },
            [balance, cash, mpesa]
        );

        const handleCancel = useCallback(() => {
            setOpenState((prev) => ({
                ...prev,
                [row.id]: false
            }));

            setMpesa(0);
            setCash(0);
            setPaymentBalance(balance);
        }, [row.id, balance]);
        const handleSubmit = useCallback(() => {
            setLoading(true);
            const data = {
                credit_id: row.id,
                sale_id: row.sale.id,
                due_balance: row.sale.balance,
                mpesa: mpesa,
                cash: cash
            };

            router.post(route('credits.pay'), data, {
                onFinish: () => {
                    setLoading(false);
                }
            });
        }, [cash, mpesa, row.id, row.sale.balance, row.sale.id]);

        return (
            <Popover open={openState[row.id]} onOpenChange={() => toggleOpen(row.id)}>
                <PopoverTrigger>
                    <div className="flex w-full justify-center">
                        <CustomIconButton icon={EuroIcon} variant="info" label="Make Payment" showLabel />
                    </div>
                </PopoverTrigger>
                {!loading ? (
                    <PopoverContent className="overflow-auto border-blue-400 p-2 text-xs md:text-sm">
                        <p className="text-center font-bold">Make Payment</p>
                        <div className="flex flex-col gap-2 py-2">
                            <p className="font-bold">
                                Bill Balance: <span className="text-red-500">{row.balance}</span>
                            </p>
                            <p className="text-sm text-red-500 sm:text-xs">{errors[`form_${row.id}`]}</p>
                            <div className="flex gap-4 px-2">
                                <CustomInput
                                    name="mpesa"
                                    label="Mpesa (Ksh)"
                                    inputClassName="bg-green-600 text-white"
                                    className="font-bold text-green-400"
                                    value={!isNaN(mpesa) && mpesa !== 0 ? mpesa : ''}
                                    onChange={(e) => {
                                        const { numeric } = sanitizeOnChange(e.target.value);
                                        setMpesa(numeric);
                                        paymentChange('mpesa', numeric);
                                    }}
                                    onBlur={(e) => {
                                        const { numeric } = sanitizeOnBlur(e.target.value);
                                        setMpesa(numeric);
                                    }}
                                    error={errors.mpesa}
                                />
                                <CustomInput
                                    name="cash"
                                    label="Cash (Ksh)"
                                    inputClassName="bg-amber-500/60 text-black text-end focus:outline-none focus:border-0"
                                    className="pe-0.5 text-end font-bold text-amber-600"
                                    value={!isNaN(cash) && cash !== 0 ? cash : ''}
                                    onChange={(e) => {
                                        const { numeric } = sanitizeOnChange(e.target.value);
                                        setCash(numeric);
                                        paymentChange('cash', numeric);
                                    }}
                                    onBlur={(e) => {
                                        const { numeric } = sanitizeOnBlur(e.target.value);
                                        setCash(numeric);
                                    }}
                                    error={errors.cash}
                                />
                            </div>
                            <div className="flex w-full text-end">
                                {paymentBalance != row.sale.balance && (
                                    <p className="w-full text-end font-bold">
                                        {paymentBalance != 0 ? (
                                            <span className="text-red-500">Balance: {paymentBalance}</span>
                                        ) : (
                                            <span className="text-green-600">Cleared</span>
                                        )}
                                    </p>
                                )}
                            </div>
                            <div className="mt-2 flex w-full items-center justify-start gap-2 pl-2">
                                <Tooltip>
                                    <TooltipTrigger>
                                        <CustomIconButton onClick={handleCancel} variant="dark" icon={X} className="p-2" />
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-red-400">Cancel</TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <CustomIconButton onClick={handleSubmit} variant="success" icon={CircleCheckBig} className="p-2" />
                                    </TooltipTrigger>
                                    <TooltipContent>Confirm</TooltipContent>
                                </Tooltip>
                            </div>
                        </div>
                    </PopoverContent>
                ) : (
                    <PopoverContent className="flex items-center justify-center">
                        <Item variant="outline">
                            <ItemMedia>
                                <Spinner />
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle className="line-clamp-1">Processing payment...</ItemTitle>
                            </ItemContent>
                            <ItemContent className="flex-none justify-end">
                                <span className="text-sm tabular-nums">{Number(cash) + Number(mpesa)} Ksh</span>
                            </ItemContent>
                        </Item>
                    </PopoverContent>
                )}
            </Popover>
        );
    }

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
                return <PaymentCell row={row} />;
            }
        }
    ];

    console.log(errors.form_);
    const flash = usePage().props.flash as FlashMessage;
    if (flash['error'] == null && errors.form_ != undefined) flash['error'] = errors.form_;

    return (
        <AppLayout>
            <Head title="Credits" />
            <CustomIndexPage
                flashData={flash}
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
            />
        </AppLayout>
    );
}
