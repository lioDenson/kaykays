import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { sanitizeOnBlur, sanitizeOnChange } from '@/helpers/numberSanitizer';
import { useIsMobile } from '@/hooks/use-mobile';
import AppLayout from '@/layouts/app-layout';
import { ProductInterface, RiderInterface } from '@/pages/interface/general';
import { Head, router, usePage } from '@inertiajs/react';
import { Banknote, CreditCard, DollarSign, Package, Plus, PlusCircle, TagsIcon, Trash2, User } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { route } from 'ziggy-js';
import { DeliveryDataInterface, DeliveryInterface, customerInterface, saleItem } from './sale-interfaces';
import CustomSubmitButton from '@/components/custom/custom-submit-button';
import CustomInput from '@/components/custom/custom-input';
import CustomSelection from '@/components/custom/custom-selection';
import CustomSwitch from '@/components/custom/custom-switch';
import CustomTextArea from '@/components/custom/custom-text-area';
import CustomToaster from '@/components/custom/custom-toaster';

// Helper function to create an empty sale item
const createEmptySaleItem = (index: number) => ({
    index,
    id: null,
    price: 0,
    subTotal: 0,
    batchNumber: '',
    name: '',
    quantity: '',
    display_name: '',
    unit: ''
});

export default function Sale({
    customers,
    products,
    deliveries,
    riders
}: {
    customers: customerInterface[];
    products: ProductInterface[];
    deliveries?: DeliveryInterface[];
    riders: RiderInterface[];
}) {
    const { errors } = usePage().props as any;
    const { flash } = usePage().props as any;
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [nextIndex, setNextIndex] = useState(1);
    const [isDelivery, setIsDelivery] = useState(false);
    const [productList, setProductList] = useState<saleItem[]>([createEmptySaleItem(0)]);
    const [productCount, setProductCount] = useState(0);

    const emptyDelivery = {
        rider_id: null,
        delivery_id: null,
        description: '',
        status: 'pending'
    };
    const [deliveryData, setDeliveryData] = useState<DeliveryDataInterface>(emptyDelivery);
    const [isLoading, setIsLoading] = useState(false);

    // Payment states
    const total = productList.reduce((sum, item) => sum + item.subTotal, 0).toFixed(0);
    const [cash, setCash] = useState(0);
    const [mpesa, setMpesa] = useState(0);
    const [totalPaid, setTotalPaid] = useState(0);
    const [balance, setBalance] = useState(total);
    const [isNewDelivery, setIsNewDelivery] = useState<null | boolean>(null);
    const [selectedRider, setSelectedRider] = useState<null | number>(null);
    const [selectedDelivery, setSelectedDelivery] = useState<null | number>(null);
    const deliveriesAvailable = deliveries && deliveries.length > 0;
    const [deliveryFee, setDeliveryFee] = useState<{ raw: string | number; numeric: string | number }>({
        raw: '',
        numeric: 0
    });

    const grandTotal = useMemo(() => {
        return Number(total) + Number(deliveryFee?.numeric ?? 0);
    }, [total, deliveryFee.numeric]);

    // Effects and handlers remain the same as your original code
    useEffect(() => {
        const validItems = productList.filter((item) => item.id != null && Number(item.quantity) > 0);
        setProductCount(validItems.length);
        const lastItem = productList[productList.length - 1];
        const canAdd = lastItem.id != null && Number(lastItem.quantity) > 0;
        setBtnDisabled(!canAdd);
    }, [productList]);

    const handleSelectedProduct = (selected: { value: number }, idx: number) => {
        const product = products.find((p) => p.id === selected?.value);
        const updated = [...productList];
        const currentItem = updated[idx];

        if (!product) {
            updated[idx] = createEmptySaleItem(currentItem.index);
            updated[idx].quantity = currentItem.quantity;
            updated[idx].quantityRaw = currentItem.quantityRaw;
        } else {
            const currentQuantity = Number(currentItem.quantity) || 0;
            updated[idx] = {
                ...currentItem,
                id: product.id,
                name: product.name,
                price: product.price,
                display_name: product.display_name as string,
                unit: product.unit,
                subTotal: Number((currentQuantity * product.price).toFixed(2)) || 0
            };
        }
        setProductList(updated);
    };

    const handleRemoveItem = (idx: number) => {
        const updated = productList.filter((_, index) => index !== idx);
        if (updated.length === 0) {
            updated.push(createEmptySaleItem(nextIndex));
            setNextIndex((prev) => prev + 1);
        }
        setProductList(updated);
    };

    const handleAddNewItem = () => {
        const currentItem = productList[productList.length - 1];
        if (currentItem.id == null || Number(currentItem.quantity) === 0 || currentItem.quantity === '') {
            return;
        }
        setProductList((prev) => [...prev, createEmptySaleItem(nextIndex)]);
        setNextIndex((prev) => prev + 1);
    };

    const handlePaymentChange = useCallback(
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

            if (newMpesa + newCash > grandTotal) {
                if (type === 'mpesa') {
                    newMpesa = grandTotal - newCash;
                    setMpesa(Math.max(0, newMpesa));
                } else {
                    newCash = grandTotal - newMpesa;
                    setCash(Math.max(0, newCash));
                }
            }

            const totalPaid = newMpesa + newCash;
            setTotalPaid(totalPaid);
            setBalance((grandTotal - totalPaid).toFixed(0));
        },
        [cash, mpesa, grandTotal]
    );

    useEffect(() => {
        const currentBalance = grandTotal - totalPaid;
        setBalance(currentBalance.toFixed(0));
    }, [grandTotal, totalPaid]);

    useEffect(() => {
        handlePaymentChange('cash', cash);
    }, [grandTotal, handlePaymentChange, cash]);

    const data = useMemo(
        () => ({
            customer: selectedCustomer,
            total: parseInt(total).toString(),
            products: productList.filter((item) => item.id != null && Number(item.quantity) > 0),
            cash: cash,
            mpesa: mpesa,
            balance: balance,
            totalPaid: totalPaid,
            isDelivery: isDelivery,
            deliveryData: isDelivery ? deliveryData : null,
            deliveryFee: isDelivery ? deliveryFee : null
        }),
        [selectedCustomer, total, productList, cash, mpesa, balance, totalPaid, isDelivery, deliveryData, deliveryFee]
    );

    const handleSubmit = () => {
        setIsLoading(true);
        router.post(
            route('sales.store', data),
            {},
            {
                onSuccess: () => {
                    setSelectedCustomer(null);
                    setProductList([createEmptySaleItem(0)]);
                    setNextIndex(1);
                    setCash(0);
                    setMpesa(0);
                    setTotalPaid(0);
                    setBalance(total);
                    setIsDelivery(false);
                    setDeliveryData(emptyDelivery);
                    setSelectedRider(null);
                    setSelectedDelivery(null);
                    setDeliveryFee({ raw: '', numeric: 0 });
                    setIsNewDelivery(null);
                },
                onFinish: () => {
                    setIsLoading(false);
                }
            }
        );
    };

    const isMobile = useIsMobile();

    return (
        <AppLayout>
            <Head title="Sales" />
            <CustomToaster flash={flash} />

            <div className="min-h-screen bg-gray-50/30">
                <div className="container mx-auto max-w-7xl p-4">
                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">New Sale</h1>
                            <p className="text-gray-600">Create a new sales transaction</p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">{grandTotal.toFixed(0)} KSH</div>
                            <div className="text-sm text-gray-500">{productCount} items</div>
                        </div>
                    </div>

                    {/* Main Grid Layout */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Left Column - Customer & Products */}
                        <div className="space-y-6 lg:col-span-2">
                            {/* Customer Card */}
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <User className="h-5 w-5" />
                                        Customer & Delivery
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <CustomSelection
                                            align="start"
                                            data={customers.map((c) => ({ id: c.id, name: c.user.name }))}
                                            onSelect={(customer) => setSelectedCustomer(customer)}
                                            selectedOption={selectedCustomer}
                                            label="Select Customer"
                                            error={errors.customer}
                                        />
                                        <div className="flex items-center justify-between">
                                            <CustomSwitch
                                                checked={isDelivery}
                                                onChange={() => {
                                                    setIsDelivery(!isDelivery);
                                                    setIsNewDelivery(null);
                                                    setDeliveryData(emptyDelivery);
                                                    setSelectedRider(null);
                                                    setSelectedDelivery(null);
                                                    setDeliveryFee({ raw: '', numeric: 0 });
                                                }}
                                                label="Delivery Required"
                                                error={errors.isDelivery || errors.deliveryData}
                                            />
                                        </div>
                                    </div>

                                    {/* Delivery Options */}
                                    {isDelivery && (
                                        <div className="rounded-lg border bg-gray-50/50 p-4">
                                            {isNewDelivery == null ? (
                                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                                    <Skeleton
                                                        onClick={() => setIsNewDelivery(true)}
                                                        className="flex cursor-pointer flex-col items-center justify-center gap-2 p-4 text-center hover:border-2 hover:bg-primary/70"
                                                    >
                                                        <PlusCircle className="h-6 w-6" />
                                                        <span className="text-sm font-medium">Create New Delivery</span>
                                                    </Skeleton>
                                                    {deliveriesAvailable && (
                                                        <Skeleton
                                                            onClick={() => setIsNewDelivery(false)}
                                                            className="flex cursor-pointer flex-col items-center justify-center gap-2 p-4 text-center hover:border-2 hover:bg-primary/70"
                                                        >
                                                            <TagsIcon className="h-6 w-6" />
                                                            <span className="text-sm font-medium">Attach to Delivery</span>
                                                        </Skeleton>
                                                    )}
                                                </div>
                                            ) : isNewDelivery === true ? (
                                                <div className="space-y-4">
                                                    <CustomSelection
                                                        data={riders.map((r) => ({ id: r.id, name: r.user.name }))}
                                                        onSelect={(selectedRider) => {
                                                            setSelectedRider(selectedRider.value);
                                                            setDeliveryData({
                                                                rider_id: selectedRider.value,
                                                                status: 'pending',
                                                                delivery_id: null,
                                                                description: ''
                                                            });
                                                        }}
                                                        selectedOption={
                                                            selectedRider
                                                                ? {
                                                                      value: selectedRider,
                                                                      label: riders.find((r) => r.id === selectedRider)?.user.name || ''
                                                                  }
                                                                : null
                                                        }
                                                        align="start"
                                                        label="Select Rider"
                                                        placeholder="Select a rider"
                                                        error={errors.rider_id}
                                                    />
                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                        <CustomInput
                                                            id="delivery_fee"
                                                            name="delivery_fee"
                                                            label="Delivery Fee (KSH)"
                                                            placeholder="Enter amount"
                                                            type="text"
                                                            value={
                                                                deliveryFee.raw ?? (isNaN(Number(deliveryFee.raw)) ? '' : String(deliveryFee.numeric))
                                                            }
                                                            onChange={(e) => {
                                                                const { raw, numeric } = sanitizeOnChange(e.target.value);
                                                                setDeliveryFee({ raw, numeric });
                                                            }}
                                                            onBlur={(e) => {
                                                                const { raw, numeric } = sanitizeOnBlur(e.target.value);
                                                                setDeliveryFee({ raw, numeric });
                                                            }}
                                                            error={errors.deliveryFee}
                                                        />
                                                        <CustomTextArea
                                                            id="description"
                                                            label="Delivery Notes"
                                                            value={deliveryData.description || ''}
                                                            onChange={(e) => {
                                                                setDeliveryData({ ...deliveryData, description: e.target.value || '' });
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    <CustomSelection
                                                        data={
                                                            deliveries?.map((d) => ({
                                                                id: d.id,
                                                                name: `Delivery #${d.id} - ${d.rider.user.name} (${d.status})`
                                                            })) || []
                                                        }
                                                        label="Select Delivery"
                                                        placeholder="Select delivery"
                                                        onSelect={(selectedDelivery) => {
                                                            const selected = deliveries?.find((d) => d.id === selectedDelivery?.value);
                                                            setSelectedDelivery(selectedDelivery?.value);
                                                            setDeliveryData({
                                                                ...emptyDelivery,
                                                                delivery_id: selected?.id,
                                                                description: selected?.description || ''
                                                            });
                                                        }}
                                                        selectedOption={
                                                            selectedDelivery
                                                                ? {
                                                                      value: selectedDelivery,
                                                                      label: `Delivery #${selectedDelivery}`
                                                                  }
                                                                : null
                                                        }
                                                        align="start"
                                                        error={errors.delivery_id}
                                                    />
                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                        <CustomInput
                                                            id="delivery_fee"
                                                            name="delivery_fee"
                                                            label="Delivery Fee (KSH)"
                                                            placeholder="Enter amount"
                                                            type="text"
                                                            value={
                                                                deliveryFee.raw ?? (isNaN(Number(deliveryFee.raw)) ? '' : String(deliveryFee.numeric))
                                                            }
                                                            onChange={(e) => {
                                                                const { raw, numeric } = sanitizeOnChange(e.target.value);
                                                                setDeliveryFee({ raw, numeric });
                                                            }}
                                                            onBlur={(e) => {
                                                                const { raw, numeric } = sanitizeOnBlur(e.target.value);
                                                                setDeliveryFee({ raw, numeric });
                                                            }}
                                                            error={errors.deliveryFee}
                                                        />
                                                        <CustomTextArea
                                                            id="description"
                                                            label="Delivery Notes"
                                                            value={deliveryData.description || ''}
                                                            onChange={(e) => {
                                                                setDeliveryData({ ...deliveryData, description: e.target.value || '' });
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Products Card */}
                            <Card className="">
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <Package className="h-5 w-5" />
                                        Products
                                        <Badge variant="secondary" className="ml-2 min-w-fit">
                                            {productCount}
                                        </Badge>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="w-full px-2">
                                    <div className="space-y-3">
                                        {productList.map((item, idx) => (
                                            <div key={item.index} className="flex items-center gap-3 rounded-lg border p-3">
                                                <Badge variant="outline" className="min-w-fit flex-shrink-0">
                                                    {idx + 1}
                                                </Badge>

                                                <div className="grid flex-1 gap-3 md:grid-cols-12">
                                                    <div className="sm:col-span-2 md:col-span-4">
                                                        <CustomSelection
                                                            data={products}
                                                            label="Product"
                                                            placeholder="Select product"
                                                            onSelect={(selected) => handleSelectedProduct(selected!, idx)}
                                                            selectedOption={
                                                                productList[idx].id
                                                                    ? { value: productList[idx].id, label: productList[idx].display_name }
                                                                    : null
                                                            }
                                                            error={errors[`products.${idx}.id`] || errors['products']}
                                                        />
                                                    </div>

                                                    <div className="col-span-2">
                                                        <CustomInput
                                                            id={`quantity-${idx}`}
                                                            name="quantity"
                                                            inputClassName="max-w-fit"
                                                            label="QTY"
                                                            type="text"
                                                            value={item.quantityRaw ?? (item.quantity === '' ? '' : String(item.quantity))}
                                                            disabled={item.id == null}
                                                            onChange={(e) => {
                                                                const { raw, numeric } = sanitizeOnChange(e.target.value);
                                                                const updated = [...productList];
                                                                updated[idx] = {
                                                                    ...updated[idx],
                                                                    quantityRaw: raw,
                                                                    quantity: numeric,
                                                                    subTotal: numeric * (updated[idx].price ?? 0)
                                                                };
                                                                setProductList(updated);
                                                            }}
                                                            onBlur={(e) => {
                                                                const { raw, numeric } = sanitizeOnBlur(e.target.value);
                                                                const updated = [...productList];
                                                                updated[idx] = {
                                                                    ...updated[idx],
                                                                    quantityRaw: raw,
                                                                    quantity: numeric,
                                                                    subTotal: numeric * (updated[idx].price ?? 0)
                                                                };
                                                                setProductList(updated);
                                                            }}
                                                            error={errors[`products.${idx}.quantity`]}
                                                        />
                                                    </div>

                                                    <div className="col-span-2 md:col-span-4">
                                                        <div className="space-y-1">
                                                            <label className="text-sm font-medium text-gray-600">Price</label>
                                                            <div className="flex h-10 items-center rounded-md border bg-gray-50/70 px-3 text-xs">
                                                                {item.price > 0 ? (
                                                                    <span className="text-gray-900">
                                                                        {item.price} / {item.unit}
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-gray-800">Select product</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-span-6 flex items-center justify-between gap-4 md:col-span-1">
                                                        <div className="text-right">
                                                            <div className="text-xs font-semibold text-green-600">{item.subTotal.toFixed(0)} KSH</div>
                                                        </div>
                                                        <button
                                                            onClick={() => handleRemoveItem(idx)}
                                                            className="rounded p-2 text-red-600 hover:bg-red-50"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        <button
                                            onClick={handleAddNewItem}
                                            disabled={btnDisabled}
                                            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-4 text-foreground hover:border-gray-400 hover:bg-gray-50 hover:text-background disabled:opacity-50"
                                        >
                                            <Plus className="h-4 w-4" />
                                            Add Product
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Column - Payment & Summary */}
                        <div className="space-y-6">
                            {/* Payment Card */}
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2 text-lg">
                                        <CreditCard className="h-5 w-5" />
                                        Payment
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {/* M-Pesa Card */}
                                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 p-4 dark:border dark:border-green-800/30 dark:from-green-950/30 dark:to-emerald-950/20">
                                            <div className="absolute top-3 right-3">
                                                <div className="rounded-full bg-green-500/20 p-2 dark:bg-green-500/30">
                                                    <Banknote className="h-4 w-4 text-green-600 dark:text-green-400" />
                                                </div>
                                            </div>
                                            <label htmlFor="mpesa" className="mb-2 block text-sm font-medium text-green-700 dark:text-green-300">
                                                M-Pesa 
                                            </label>
                                            <CustomInput
                                                inputClassName="border-0 rounded-none  border-b  bg-transparent p-0 text-2xl font-bold text-green-900 placeholder-green-400/60 focus:ring-0 dark:text-green-100 dark:placeholder-green-400/40"
                                                className="space-y-2"
                                                id="mpesa"
                                                name="mpesa"
                                                type="text"
                                                placeholder="0"
                                                value={!isNaN(mpesa) && mpesa !== 0 ? mpesa : ''}
                                                onChange={(e) => {
                                                    const { numeric } = sanitizeOnChange(e.target.value);
                                                    handlePaymentChange('mpesa', numeric);
                                                }}
                                            />
                                            <div className="mt-2 text-xs text-green-600/70 dark:text-green-400/70">Mobile money payment</div>
                                        </div>

                                        {/* Cash Card */}
                                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 p-4 dark:border dark:border-blue-800/30 dark:from-blue-950/30 dark:to-cyan-950/20">
                                            <div className="absolute top-3 right-3">
                                                <div className="rounded-full bg-blue-500/20 p-2 dark:bg-blue-500/30">
                                                    <DollarSign className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                </div>
                                            </div>
                                            <label htmlFor="cash" className="mb-2 block text-sm font-medium text-blue-700 dark:text-blue-300">
                                                Cash
                                            </label>
                                            <CustomInput
                                                inputClassName="border-0 rounded-none  border-b   bg-transparent p-0 text-2xl font-bold text-blue-900 placeholder-blue-400/60  dark:text-blue-100 dark:placeholder-blue-400/40"
                                                className="space-y-2 bg-transparent"
                                                id="cash"
                                                name="cash"
                                                type="text"
                                                placeholder="0"
                                                value={!isNaN(cash) && cash !== 0 ? cash : ''}
                                                onChange={(e) => {
                                                    const { numeric } = sanitizeOnChange(e.target.value);
                                                    handlePaymentChange('cash', numeric);
                                                }}
                                            />
                                            <div className="mt-2 text-xs text-blue-600/70 dark:text-blue-400/70">Physical cash payment</div>
                                        </div>
                                    </div>

                                    {/* Payment Summary */}
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
                                        {/* Total Paid Card */}
                                        <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 p-4 dark:border dark:border-emerald-800/30 dark:from-emerald-950/30 dark:to-green-950/20">
                                            <div className="flex items-center justify-between">
                                                <label className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Total Paid</label>
                                                <div className="rounded-full bg-emerald-500/20 p-1 dark:bg-emerald-500/30">
                                                    <svg
                                                        className="h-3 w-3 text-emerald-600 dark:text-emerald-400"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="mt-2 text-center">
                                                <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">{totalPaid} KSH</div>
                                                <div className="mt-1 text-xs text-emerald-600/70 dark:text-emerald-400/70">Amount received</div>
                                            </div>
                                        </div>

                                        {/* Balance Card */}
                                        <div className="rounded-xl bg-gradient-to-br from-red-50 to-orange-50 p-4 dark:border dark:border-red-800/30 dark:from-red-950/30 dark:to-orange-950/20">
                                            <div className="flex items-center justify-between">
                                                <label className="text-sm font-medium text-red-700 dark:text-red-300">Balance </label>
                                                <div className="rounded-full bg-red-500/20 p-1 dark:bg-red-500/30">
                                                    <svg
                                                        className="h-3 w-3 text-red-600 dark:text-red-400"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="mt-2 text-center">
                                                <div className="text-2xl font-bold text-red-900 dark:text-red-100">{balance} KSH</div>
                                                <div className="mt-1 text-xs text-red-600/70 dark:text-red-400/70">Remaining amount</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Amount Buttons */}
                                    <div className="rounded-lg bg-gray-50/50 p-4 dark:bg-gray-800/30">
                                        <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">Quick Amounts</label>
                                        <div className="grid grid-cols-5 gap-2">
                                            {[45, 50, 80, 90, 180].map((amount) => (
                                                <button
                                                    key={amount}
                                                    type="button"
                                                    onClick={() => {
                                                        const currentTotal = mpesa + cash;
                                                        const remaining = Math.max(0, grandTotal - currentTotal);
                                                        const toAdd = Math.min(amount, remaining);

                                                        if (mpesa === 0 || mpesa < cash) {
                                                            handlePaymentChange('mpesa', mpesa + toAdd);
                                                        } else {
                                                            handlePaymentChange('cash', cash + toAdd);
                                                        }
                                                    }}
                                                    className="rounded-sm bg-white p-1 text-xs font-medium text-gray-700 shadow-xs transition-all hover:bg-gray-50 hover:shadow focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                                                >
                                                    {amount}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Summary Card */}
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg">Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal:</span>
                                        <span className="font-medium">{total} KSH</span>
                                    </div>
                                    {isDelivery && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Delivery Fee:</span>
                                            <span className="font-medium">{deliveryFee.numeric || 0} KSH</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between border-t pt-2">
                                        <span className="font-semibold text-gray-900">Grand Total:</span>
                                        <span className="font-bold text-green-600">{grandTotal.toFixed(0)} KSH</span>
                                    </div>

                                    <CustomSubmitButton label="Complete Sale" onClick={handleSubmit} isLoading={isLoading} className="w-full" />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
