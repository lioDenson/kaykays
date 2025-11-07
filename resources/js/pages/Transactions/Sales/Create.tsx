import CustomInput from '@/components/custom/custom-input';
import CustomSelection from '@/components/custom/custom-selection';
import CustomSubmitButton from '@/components/custom/custom-submit-button';
import CustomSwitch from '@/components/custom/custom-switch';
import CustomTextArea from '@/components/custom/custom-text-area';
import CustomToaster from '@/components/custom/custom-toaster';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { sanitizeOnBlur, sanitizeOnChange } from '@/helpers/numberSanitizer';
import { useIsMobile } from '@/hooks/use-mobile';
import AppLayout from '@/layouts/app-layout';
import { ProductInterface, RiderInterface } from '@/pages/interface/general';
import { Head, router, usePage } from '@inertiajs/react';
import { Banknote, Check, ChevronsUpDown, CreditCard, DollarSign, Package, Plus, PlusCircle, TagsIcon, Trash2, Truck, User } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { route } from 'ziggy-js';
import { DeliveryDataInterface, DeliveryInterface, customerInterface, saleItem } from './sale-interfaces';

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
                            <h1 className="light:text-gray-900 text-2xl font-bold dark:text-white">New Sale</h1>
                            <p className="text-gray-500 dark:text-gray-100">Create a new sales transaction</p>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-500">{grandTotal.toFixed(0)} KSH</div>
                            <div className="text-sm text-gray-500 dark:text-gray-100">{productCount} items</div>
                        </div>
                    </div>

                    {/* Main Grid Layout */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Left Column - Customer & Products */}
                        <div className="space-y-6 lg:col-span-2">
                            {/* Customer Card */}
                            <Card className="w-full border-0 bg-gradient-to-br from-white to-gray-50/50 shadow-lg dark:border dark:border-gray-700/50 dark:from-gray-900 dark:to-gray-800/50">
                                <Collapsible>
                                    <CollapsibleTrigger className="flex w-full justify-between">
                                        <CardHeader className="pb-4">
                                            <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-900 dark:text-white">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
                                                    <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <div>
                                                    Customer & Delivery
                                                    <CardDescription className="mt-1 text-sm font-normal text-gray-600 dark:text-gray-400">
                                                        Select customer and configure delivery options
                                                    </CardDescription>
                                                </div>
                                            </CardTitle>
                                        </CardHeader>
                                        <ChevronsUpDown className="me-2 mt-2 h-6 w-6" />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <CardContent className="space-y-6 p-0 px-6 pb-6">
                                            {/* Customer Selection & Delivery Toggle */}
                                            <div className="grid grid-cols-2 gap-6 md:grid-cols-12">
                                                {/* Customer Selection - Takes more space on desktop */}
                                                <div className="md:col-span-8">
                                                    <CustomSelection
                                                        align="start"
                                                        data={customers.map((c) => ({ id: c.id, name: c.user.name }))}
                                                        onSelect={(customer) => setSelectedCustomer(customer)}
                                                        selectedOption={selectedCustomer}
                                                        label="Select Customer"
                                                        error={errors.customer}
                                                        className="w-full"
                                                    />
                                                </div>

                                                {/* Delivery Toggle - Compact on desktop */}
                                                <div className="flex items-center justify-between md:col-span-4 xl:justify-end">
                                                    <div className="flex items-center gap-3 rounded-2xl bg-gray-100/50 px-4 py-3 dark:bg-gray-800/50">
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
                                                            className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Delivery Options - Animated Expand */}
                                            {isDelivery && (
                                                <div className="duration-300 animate-in fade-in-50 slide-in-from-top-4">
                                                    <div className="rounded-2xl border border-blue-200/50 bg-gradient-to-r from-blue-50 to-cyan-50/30 p-6 dark:border-blue-800/30 dark:from-blue-950/20 dark:to-cyan-950/10">
                                                        {/* Delivery Type Selection */}
                                                        {isNewDelivery == null ? (
                                                            <div className="text-center">
                                                                <h4 className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                                    Choose delivery option
                                                                </h4>
                                                                <div className="grid gap-4 md:grid-cols-2">
                                                                    <button
                                                                        onClick={() => setIsNewDelivery(true)}
                                                                        className="group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-300 bg-white p-6 transition-all hover:border-blue-500 hover:bg-blue-50 hover:shadow-md dark:border-gray-600 dark:bg-gray-800 dark:hover:border-blue-400 dark:hover:bg-blue-900/20"
                                                                    >
                                                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 group-hover:bg-blue-200 dark:bg-blue-900/50 dark:group-hover:bg-blue-800/50">
                                                                            <PlusCircle className="h-6 w-6 text-blue-600 group-hover:text-blue-700 dark:text-blue-400" />
                                                                        </div>
                                                                        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700 dark:text-gray-300 dark:group-hover:text-blue-300">
                                                                            Create New Delivery
                                                                        </span>
                                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                            Assign to a new rider
                                                                        </p>
                                                                    </button>

                                                                    {deliveriesAvailable && (
                                                                        <button
                                                                            onClick={() => setIsNewDelivery(false)}
                                                                            className="group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-300 bg-white p-6 transition-all hover:border-green-500 hover:bg-green-50 hover:shadow-md dark:border-gray-600 dark:bg-gray-800 dark:hover:border-green-400 dark:hover:bg-green-900/20"
                                                                        >
                                                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 group-hover:bg-green-200 dark:bg-green-900/50 dark:group-hover:bg-green-800/50">
                                                                                <TagsIcon className="h-6 w-6 text-green-600 group-hover:text-green-700 dark:text-green-400" />
                                                                            </div>
                                                                            <span className="text-sm font-medium text-gray-700 group-hover:text-green-700 dark:text-gray-300 dark:group-hover:text-green-300">
                                                                                Attach to Delivery
                                                                            </span>
                                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                                Use existing delivery
                                                                            </p>
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ) : isNewDelivery === true ? (
                                                            /* New Delivery Form */
                                                            <div className="space-y-6">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex h-4 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                                                                        <PlusCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                                    </div>
                                                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                                                        Create New Delivery
                                                                    </h4>
                                                                </div>

                                                                <div className="grid grid-cols-1 gap-6 text-xs md:grid-cols-12 md:text-base">
                                                                    <div className="md:col-span-6">
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
                                                                                          label:
                                                                                              riders.find((r) => r.id === selectedRider)?.user.name ||
                                                                                              ''
                                                                                      }
                                                                                    : null
                                                                            }
                                                                            align="start"
                                                                            label="Select Rider"
                                                                            placeholder="Choose a delivery rider"
                                                                            error={errors.rider_id}
                                                                        />
                                                                    </div>

                                                                    <div className="md:col-span-6">
                                                                        <CustomInput
                                                                            id="delivery_fee"
                                                                            name="delivery_fee"
                                                                            label="Delivery Fee (KSH)"
                                                                            placeholder="Enter delivery amount"
                                                                            type="text"
                                                                            value={
                                                                                deliveryFee.raw ??
                                                                                (isNaN(Number(deliveryFee.raw)) ? '' : String(deliveryFee.numeric))
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
                                                                    </div>

                                                                    <div className="md:col-span-12">
                                                                        <CustomTextArea
                                                                            id="description"
                                                                            label="Delivery Instructions"
                                                                            placeholder="Add any special delivery instructions..."
                                                                            value={deliveryData.description || ''}
                                                                            onChange={(e) => {
                                                                                setDeliveryData({
                                                                                    ...deliveryData,
                                                                                    description: e.target.value || ''
                                                                                });
                                                                            }}
                                                                            rows={3}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            /* Attach to Existing Delivery */
                                                            <div className="space-y-6">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="flex h-4 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
                                                                        <TagsIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                                                                    </div>
                                                                    <h4 className="font-semibold text-gray-900 dark:text-white">
                                                                        Attach to Existing Delivery
                                                                    </h4>
                                                                </div>

                                                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                                                                    <div className="lg:col-span-6">
                                                                        <CustomSelection
                                                                            data={
                                                                                deliveries?.map((d) => ({
                                                                                    id: d.id,
                                                                                    name: `#${d.id} • ${d.rider.user.name} • ${d.status}`
                                                                                })) || []
                                                                            }
                                                                            label="Select Delivery"
                                                                            placeholder="Choose existing delivery"
                                                                            onSelect={(selectedDelivery) => {
                                                                                const selected = deliveries?.find(
                                                                                    (d) => d.id === selectedDelivery?.value
                                                                                );
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
                                                                    </div>

                                                                    <div className="lg:col-span-6">
                                                                        <CustomInput
                                                                            id="delivery_fee"
                                                                            name="delivery_fee"
                                                                            label="Delivery Fee (KSH)"
                                                                            placeholder="Enter delivery amount"
                                                                            type="text"
                                                                            value={
                                                                                deliveryFee.raw ??
                                                                                (isNaN(Number(deliveryFee.raw)) ? '' : String(deliveryFee.numeric))
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
                                                                    </div>

                                                                    <div className="lg:col-span-12">
                                                                        <CustomTextArea
                                                                            id="description"
                                                                            label="Additional Notes"
                                                                            placeholder="Add any additional delivery notes..."
                                                                            value={deliveryData.description || ''}
                                                                            onChange={(e) => {
                                                                                setDeliveryData({
                                                                                    ...deliveryData,
                                                                                    description: e.target.value || ''
                                                                                });
                                                                            }}
                                                                            rows={3}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    </CollapsibleContent>
                                </Collapsible>
                            </Card>

                            {/* Products Card */}
                            <Card className="w-full border-0 bg-gradient-to-br from-white to-gray-50/50 shadow-lg dark:border dark:border-gray-700/50 dark:from-gray-900 dark:to-gray-800/50">
                                <Collapsible>
                                    <CollapsibleTrigger className="flex w-full justify-between">
                                        <CardHeader className="w-full pb-4">
                                            <CardTitle className="flex min-w-full items-center gap-3 text-xl font-semibold text-gray-900 dark:text-white">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30">
                                                    <Package className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div>
                                                        Products{' '}
                                                        <Badge
                                                            variant="secondary"
                                                            className="min-w-fit bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300"
                                                        >
                                                            {productCount} items
                                                        </Badge>
                                                        <CardDescription className="mt-1 text-sm font-normal text-gray-600 dark:text-gray-400">
                                                            Select sale products
                                                        </CardDescription>
                                                    </div>
                                                </div>
                                            </CardTitle>
                                        </CardHeader>
                                        <ChevronsUpDown className="me-2 mt-2 h-6 w-6" />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <CardContent className="space-y-4 px-4 pb-4">
                                            {/* Product List */}
                                            <div className="space-y-3">
                                                {productList.map((item, idx) => (
                                                    <div
                                                        key={item.index}
                                                        className="flex items-start gap-3 rounded-2xl border border-gray-200/70 bg-white p-4 shadow-xs transition-all hover:shadow-sm dark:border-gray-700/50 dark:bg-gray-800/50 dark:hover:border-gray-600/70"
                                                    >
                                                        {/* Item Number */}
                                                        <Badge
                                                            variant="outline"
                                                            className="flex min-w-fit flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                                                        >
                                                            {idx + 1}
                                                        </Badge>

                                                        {/* Product Content - Optimized Grid */}
                                                        <div className="grid flex-1 grid-cols-2 items-center gap-3 min-[480px]:grid-cols-6 md:grid-cols-12 md:gap-4">
                                                            {/* Product Selection - Responsive columns */}
                                                            <div className="min-[480px]:col-span-4 md:col-span-5 ">
                                                                <CustomSelection
                                                                    data={products}
                                                                    label="Product"
                                                                    placeholder="Search products..."
                                                                    onSelect={(selected) => handleSelectedProduct(selected!, idx)}
                                                                    selectedOption={
                                                                        productList[idx].id
                                                                            ? { value: productList[idx].id, label: productList[idx].display_name }
                                                                            : null
                                                                    }
                                                                    error={errors[`products.${idx}.id`] || errors['products']}
                                                                    className="max-w-fit"
                                                                />
                                                            </div>

                                                            {/* Quantity Input - Compact */}
                                                            <div className="min-[480px]:col-span-2 md:col-span-2 lg:col-span-2">
                                                                <CustomInput
                                                                    id={`quantity-${idx}`}
                                                                    name="quantity"
                                                                    label="QTY"
                                                                    type="text"
                                                                    inputClassName="text-center bg-gray-50/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600"
                                                                    className="w-full"
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

                                                            {/* Price Display - Responsive */}
                                                            <div className="min-[480px]:col-span-3 md:col-span-3 lg:col-span-3">
                                                                <div className="space-y-1">
                                                                    <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                                                        Price / Unit
                                                                    </label>
                                                                    <div
                                                                        className={`flex h-10 items-center justify-between rounded-lg border bg-gray-50/50 px-3 text-sm transition-colors dark:border-gray-600 dark:bg-gray-700/30 ${
                                                                            item.price > 0
                                                                                ? 'border-green-200 bg-green-50/30 text-gray-900 dark:border-green-800/50 dark:bg-green-900/20 dark:text-gray-100'
                                                                                : 'text-gray-500 dark:text-gray-400'
                                                                        }`}
                                                                    >
                                                                        {item.price > 0 ? (
                                                                            <span className="font-semibold">
                                                                                {item.price}{' '}
                                                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                                                    / {item.unit}
                                                                                </span>
                                                                            </span>
                                                                        ) : (
                                                                            <span className="text-gray-400 dark:text-gray-500 overflow-hidden whitespace-nowrap">Select product</span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Total & Actions - Compact */}
                                                            <div className="min-[480px]:col-span-3 md:col-span-2 lg:col-span-1">
                                                                <div className="mt-2 flex items-center justify-around gap-2">
                                                                    <div className="rounded bg-blue-500/10 px-2 py-0.5 text-center">
                                                                        <div className="text-sm font-bold text-green-600 dark:text-green-400">
                                                                            {item.subTotal.toFixed(0)}
                                                                        </div>
                                                                        <div className="text-xs text-gray-500 dark:text-gray-400">KSH</div>
                                                                    </div>
                                                                    <button
                                                                        onClick={() => handleRemoveItem(idx)}
                                                                        className="flex h-8.5 w-12 flex-shrink-0 items-center justify-center rounded border border-red-500 text-red-600 transition-all hover:bg-red-50 hover:shadow-xs dark:text-red-400 dark:hover:bg-red-900/30"
                                                                        title="Remove product"
                                                                    >
                                                                        <Trash2 className="h-3.5 w-3.5" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Add Product Button */}
                                            <button
                                                onClick={handleAddNewItem}
                                                disabled={btnDisabled}
                                                className="group flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50/50 p-4 transition-all hover:border-purple-400 hover:bg-purple-50 hover:shadow-sm disabled:opacity-30 disabled:hover:border-gray-300 disabled:hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800/30 dark:hover:border-purple-500 dark:hover:bg-purple-900/20"
                                            >
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 group-hover:bg-purple-200 dark:bg-purple-900/50 dark:group-hover:bg-purple-800/50">
                                                    <Plus className="h-4 w-4 text-purple-600 group-hover:text-purple-700 dark:text-purple-400" />
                                                </div>
                                                <span className="font-medium text-gray-700 group-hover:text-purple-700 dark:text-gray-300 dark:group-hover:text-purple-300">
                                                    Add Product
                                                </span>
                                            </button>

                                            {/* Quick Summary Footer */}
                                            {productCount > 0 && (
                                                <div className="rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/50 p-3 dark:from-gray-800/50 dark:to-gray-700/50">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                                                        <span className="font-semibold text-gray-900 dark:text-white">{total} KSH</span>
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    </CollapsibleContent>
                                </Collapsible>
                            </Card>
                        </div>

                        {/* Right Column - Payment & Summary */}
                        <div className="space-y-6">
                            {/* Payment Card */}
                            <Card className="bg-gradient-to-br border-0 from-white to-gray-50/50 shadow-lg dark:border dark:border-gray-700/50 dark:from-gray-900 dark:to-gray-800/50">
                                <Collapsible>
                                    <CollapsibleTrigger className="flex w-full justify-between">
                                        <CardHeader className="pb-3">
                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
                                                    <CreditCard className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        Payment
                                                        <Badge
                                                            variant="secondary"
                                                            className="min-w-fit bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
                                                        >
                                                            M-Pesa
                                                        </Badge>
                                                        <Badge
                                                            variant="secondary"
                                                            className="min-w-fit bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
                                                        >
                                                            Cash
                                                        </Badge>
                                                    </div>
                                                    <CardDescription className="mt-1 text-sm font-normal text-gray-600 dark:text-gray-400">
                                                        Select payment method and amount
                                                    </CardDescription>
                                                </div>
                                            </CardTitle>
                                        </CardHeader>
                                        <ChevronsUpDown className="me-2 mt-2 h-6 w-6" />
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <CardContent className="space-y-4">
                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                {/* M-Pesa Card */}
                                                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 p-4 dark:border dark:border-green-800/30 dark:from-green-950/30 dark:to-emerald-950/20">
                                                    <div className="absolute top-3 right-3">
                                                        <div className="rounded-full bg-green-500/20 p-2 dark:bg-green-500/30">
                                                            <Banknote className="h-4 w-4 text-green-600 dark:text-green-400" />
                                                        </div>
                                                    </div>
                                                    <label
                                                        htmlFor="mpesa"
                                                        className="mb-2 block text-sm font-medium text-green-700 dark:text-green-300"
                                                    >
                                                        M-Pesa
                                                    </label>
                                                    <CustomInput
                                                        inputClassName="border-0 rounded-none text-end pe-4  border-b  bg-transparent p-0 text-2xl font-bold text-green-900 placeholder-green-400/60 focus:ring-0 dark:text-green-100 dark:placeholder-green-400/40"
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
                                                        inputClassName="border-0 rounded-none  border-b text-end  bg-transparent p-0 text-2xl font-bold text-blue-900 placeholder-blue-400/60  dark:text-blue-100 dark:placeholder-blue-400/40"
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
                                                        <label className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                                                            Total Paid
                                                        </label>
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
                                                        <div className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
                                                            {totalPaid} KSH
                                                        </div>
                                                        <div className="mt-1 text-xs text-emerald-600/70 dark:text-emerald-400/70">
                                                            Amount received
                                                        </div>
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
                                                        <div className="text-2xl font-bold  text-red-900 dark:text-red-100">{balance} KSH</div>
                                                        <div className="mt-1 text-xs text-red-600/70 dark:text-red-400/70">Remaining amount</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Quick Amount Buttons */}
                                            <div className="rounded-lg bg-gray-50/50 p-4 dark:bg-gray-800/30">
                                                <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Quick Amounts
                                                </label>
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
                                    </CollapsibleContent>
                                </Collapsible>
                            </Card>

                            {/* Summary Card */}
                            <Card className="w-full border-0 bg-gradient-to-br from-white to-gray-50/80 shadow-xl dark:border dark:border-gray-700/50 dark:from-gray-900 dark:to-gray-800/60">
                                <CardHeader className="pb-4">
                                    <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-900 dark:text-white">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/30">
                                            <svg
                                                className="h-5 w-5 text-green-600 dark:text-green-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </div>
                                        Order Summary
                                    </CardTitle>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    {/* Amount Breakdown */}
                                    <div className="space-y-3 rounded-2xl bg-gray-50/50 p-4 dark:bg-gray-800/30">
                                        {/* Subtotal */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40">
                                                    <svg className="h-3 w-3 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 2a8 8 0 100 16 8 8 0 000-16zM8 8a2 2 0 114 0 2 2 0 01-4 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Subtotal</span>
                                            </div>
                                            <span className="font-semibold text-gray-900 dark:text-white">{total} KSH</span>
                                        </div>

                                        {/* Delivery Fee */}
                                        {isDelivery && (
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/40">
                                                        <Truck className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Delivery Fee</span>
                                                </div>
                                                <span className="font-semibold text-gray-900 dark:text-white">{deliveryFee.numeric || 0} KSH</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Grand Total Highlight */}
                                    <div className="rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 p-4 dark:border dark:border-green-800/30 dark:from-green-900/20 dark:to-emerald-900/10">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
                                                    <svg
                                                        className="h-4 w-4 text-green-600 dark:text-green-400"
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
                                                <div>
                                                    <div className="font-semibold text-gray-900 dark:text-white">Grand Total</div>
                                                    <div className="text-xs text-gray-600 dark:text-gray-400">Including all charges</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{grandTotal.toFixed(0)}</div>
                                                <div className="text-xs font-medium text-green-700/80 dark:text-green-300/80">KSH</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Status (Optional) */}
                                    <div className="rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 p-3 dark:from-blue-900/20 dark:to-cyan-900/10">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-700 dark:text-gray-300">Payment Status</span>
                                            <Badge
                                                variant={Number(balance) === 0 ? 'default' : 'secondary'}
                                                className={
                                                    Number(balance) === 0
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                                                        : 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300'
                                                }
                                            >
                                                {Number(balance) === 0 ? 'Fully Paid' : `Balance Due: ${balance} KSH`}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Complete Sale Button */}
                                    <CustomSubmitButton
                                        label={
                                            <div className="flex items-center justify-center gap-2">
                                                <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                                                Complete Sale
                                            </div>
                                        }
                                        onClick={handleSubmit}
                                        isLoading={isLoading}
                                        className="w-full rounded-xl border-0 bg-gradient-to-r from-green-600 to-emerald-600 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:from-green-700 hover:to-emerald-700 hover:shadow-xl"
                                        // disabledClassName="bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                                    />

                                    {/* Quick Info */}
                                    <div className="flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center gap-1">
                                            <Package className="h-3 w-3" />
                                            <span>{productCount} items</span>
                                        </div>
                                        {isDelivery && (
                                            <div className="flex items-center gap-1">
                                                <Truck className="h-3 w-3" />
                                                <span>Delivery</span>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
