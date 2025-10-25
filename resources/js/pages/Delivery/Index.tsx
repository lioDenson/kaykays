import CustomIndexPage from '@/components/custom/custom-index-page';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import AppLayout from '@/layouts/app-layout';
import { ColumnDefinition, Pagination } from '@/types/app-types';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';

interface DeliveryInterface extends Pagination {
    data: {
        id: number;
        user: { name: string; phone: string };
        status: string;
        date: string;
    }[];
}

export default function Index({ deliveries }: { deliveries: DeliveryInterface }) {
    const props = usePage().props;
    const [flash, setFlash] = useState(props.flash);
    useEffect(() => {
        setFlash(props.flash);
    }, [props.flash]);

    function DeliveryDetails({ row }) {
        return (
            <Popover>
                <PopoverTrigger className="rounded bg-blue-500 p-0.5 text-white hover:cursor-pointer">See Delivery details</PopoverTrigger>
                <PopoverContent className="flex h-full flex-col gap-0.5 overflow-auto border-blue-500 px-1 py-2 text-xs md:text-base">
                    <p className="text-center text-sm font-bold">Delivery Items</p>
                    {row.sales.reverse().map((sale, i) => (
                        <div className="py-1" key={sale.id}>
                            <p className="line-clamp-1 w-fit gap-2 border-b text-xs font-bold capitalize md:text-sm">
                                {i + 1}. {sale.customer.user.name}{' '}
                                <span className="text-xs font-thin">
                                    ({sale.customer.estate} HsNo. {sale.customer.house_number})
                                </span>
                            </p>
                            <ul>
                                {sale.sale_items.reverse().map((item) => (
                                    <p className="ms-3 overflow-hidden border-0 border-s ps-1.5 text-xs md:text-sm" key={item.id}>
                                        {item.product.name} — {item.quantity}
                                        {item.product.unit}
                                    </p>
                                ))}
                            </ul>
                        </div>
                    ))}
                </PopoverContent>
            </Popover>
        );
    }

    function Status({ row }) {
        const [openStatus, setOpenStatus] = useState<Record<number, boolean>>({});
        const [currentStatus, setCurrentStatus] = useState(row.status); // current state shown
        const [previousStatus, setPreviousStatus] = useState(row.status); // backup before change
        const [loading, setLoading] = useState(false);

        const toggleOpenStatus = (id: number) => {
            setOpenStatus((prev) => ({
                ...prev,
                [id]: !prev[id]
            }));
        };

        const variantMap: Record<string, 'default' | 'info' | 'success' | 'danger' | 'warning'> = {
            pending: 'default',
            in_transit: 'info',
            delivered: 'success',
            cancelled: 'danger',
            hold: 'warning'
        };

        const variant = variantMap[currentStatus] ?? 'default';

        const setStatus = async (status: string) => {
            if (currentStatus === 'delivered') return;

            setLoading(true);
            setPreviousStatus(currentStatus); // store previous one
            setCurrentStatus(status); // optimistic update

            try {
                const response = await axios.put(route('deliveries.status', row.id), { status });
                toggleOpenStatus(row.id);

                setCurrentStatus(response.data.status ?? status);
                window.location.reload();
            } catch (error) {
                // revert to previous state if error occurs
                setCurrentStatus(previousStatus);

                setFlash({
                    error: error.response?.data?.message ?? 'Failed to update delivery status'
                });
            } finally {
                setLoading(false);
                setFlash({});
            }
        };

        return (
            <Popover open={openStatus[row.id]} onOpenChange={() => toggleOpenStatus(row.id)}>
                <PopoverTrigger>
                    <Badge className="capitalize hover:cursor-pointer" variant={variant}>
                        {currentStatus.replace('_', ' ')}
                    </Badge>
                </PopoverTrigger>

                {currentStatus !== 'delivered' ? (
                    loading ? (
                        <PopoverContent className="w-fit border-primary p-1.5 text-xs text-primary md:text-sm">
                            <span className="flex items-center gap-2">
                                <Loader className="h-3.5 w-3.5 animate-spin" /> updating...
                            </span>
                        </PopoverContent>
                    ) : (
                        <PopoverContent className="w-fit border-0 bg-secondary">
                            <div className="flex flex-col gap-4 text-xs md:text-sm">
                                <p className="sm:text-xs">Set new status</p>
                                {Object.entries(variantMap)
                                    .filter(([name]) => name !== currentStatus)
                                    .map(([name, variant], i) => (
                                        <Badge
                                            className="rounded-0 w-full capitalize hover:cursor-pointer"
                                            key={i}
                                            variant={variant}
                                            onClick={() => setStatus(name)}
                                        >
                                            {i + 1}. {name.replace('_', ' ')}
                                        </Badge>
                                    ))}
                            </div>
                        </PopoverContent>
                    )
                ) : null}
            </Popover>
        );
    }

    const deliveryColumns: ColumnDefinition<any>[] = [
        {
            header: 'Rider',
            id: 'user.name',
            accessorFn: (row) => row.user.name
        },
        {
            header: 'Phone',
            id: 'user.phone',
            accessorFn: (row) => row.user.phone
        },
        {
            header: 'Status',
            accessorKey: 'status',
            sortable: true,

            cell: (row) => {
                return <Status row={row} />;
            }
        },
        {
            header: 'Items details',
            cell: (row) => {
                return <DeliveryDetails row={row} />;
            }
        },
        {
            header: 'Date',
            cell: (row) => {
                return new Date(row.date).toLocaleString('en-KE', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            }
        },
        {
            header: 'Actions',
            isActions: true
        }
    ];

    return (
        <AppLayout>
            <Head title="Deliveries" />
            <CustomIndexPage
                flashData={flash}
                Data={deliveries.data}
                Columns={deliveryColumns}
                Header={{
                    title: 'Deliveries',
                    button: {
                        label: 'Create Delivery',
                        onClick: () => {}
                    }
                }}
                paginate={{
                    from: deliveries.from,
                    to: deliveries.to,
                    total: deliveries.total,
                    links: deliveries.links,
                    next_page_url: deliveries.next_page_url,
                    prev_page_url: deliveries.prev_page_url,
                    current_page: deliveries.current_page
                }}
            />
        </AppLayout>
    );
}
