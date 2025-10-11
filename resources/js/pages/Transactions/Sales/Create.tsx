import CustomFloatingCart from '@/components/custom/custom-floating-cart';
import CustomIconButton from '@/components/custom/custom-icon-button';
import CustomInput from '@/components/custom/custom-input';
import CustomSelection from '@/components/custom/custom-selection';
import CustomSubmitButton from '@/components/custom/custom-submit-button';
import CustomSwitch from '@/components/custom/custom-switch';
import CustomTextArea from '@/components/custom/custom-text-area';
import CustomToaster from '@/components/custom/custom-toaster';
import { Skeleton } from '@/components/ui/skeleton';
import { sanitizeOnBlur, sanitizeOnChange } from '@/helpers/numberSanitizer';
import AppLayout from '@/layouts/app-layout';
import { ProductInterface, RiderInterface } from '@/pages/interface/general';
import { Head, router, usePage } from '@inertiajs/react';
import { Plus, PlusCircle, TagsIcon, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
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
    quantity: '', // Initialize as empty string to allow empty input state
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
    const [nextIndex, setNextIndex] = useState(1); // Use for assigning unique index
    const [isDelivery, setIsDelivery] = useState(false);
    const [productList, setProductList] = useState<saleItem[]>([
        createEmptySaleItem(0) // Initial empty row
    ]);

    const [productCount, setProductCount] = useState(0);

    const emptyDelivery = {
        rider_id: null,
        delivery_id: null,
        description: '',
        status: 'pending'
    };
    const [deliveryData, setDeliveryData] = useState<DeliveryDataInterface>(emptyDelivery);
    const [isLoading, setIsLoading] = useState(false);
    // Effect to calculate product count and enable/disable the Add Product button
    useEffect(() => {
        // Count valid products (must have an ID and a valid quantity)
        const validItems = productList.filter((item) => item.id != null && Number(item.quantity) > 0);
        setProductCount(validItems.length);

        // Enable button if the LAST item is complete (has product ID AND quantity)
        const lastItem = productList[productList.length - 1];
        const canAdd = lastItem.id != null && Number(lastItem.quantity) > 0;
        setBtnDisabled(!canAdd);
    }, [productList]);

    // Function to handle product selection/change
    const handleSelectedProduct = (selected: { value: number }, idx: number) => {
        const product = products.find((p) => p.id === selected?.value);
        const updated = [...productList];
        const currentItem = updated[idx];

        if (!product) {
            // If selection is cleared, reset the item to an empty state but keep it in the list
            updated[idx] = createEmptySaleItem(currentItem.index);
            updated[idx].quantity = currentItem.quantity; // Keep the existing quantity value
            updated[idx].quantityRaw = currentItem.quantityRaw; // Keep the existing raw quantity value
        } else {
            const currentQuantity = Number(currentItem.quantity) || 0;
            updated[idx] = {
                ...currentItem,
                id: product.id,
                name: product.name,
                price: product.price,
                display_name: product.display_name as string,
                unit: product.unit,
                // **RECALCULATION LOGIC**
                subTotal: Number((currentQuantity * product.price).toFixed(2)) || 0
                // **END RECALCULATION**
            };
        }
        setProductList(updated);
    };

    // Function to remove an item
    const handleRemoveItem = (idx: number) => {
        const updated = productList.filter((_, index) => index !== idx);

        // Ensure there's at least one empty row left if all were deleted
        if (updated.length === 0) {
            updated.push(createEmptySaleItem(nextIndex));
            setNextIndex((prev) => prev + 1);
        }

        setProductList(updated);
    };

    const handleAddNewItem = () => {
        const currentItem = productList[productList.length - 1];

        // 1. Basic check if the last item is complete
        if (currentItem.id == null || Number(currentItem.quantity) === 0 || currentItem.quantity === '') {
            return;
        }

        // 2. Add the new empty row
        setProductList((prev) => [...prev, createEmptySaleItem(nextIndex)]);
        setNextIndex((prev) => prev + 1);
    };

    // Calculation of total and payment details
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

    // grandTotal calculation dependency (used in payment logic and balance useEffect)
    const grandTotal = useMemo(() => {
        return Number(total) + Number(deliveryFee?.numeric ?? 0);
    }, [total, deliveryFee.numeric]);

    const handlePaymentChange = (type: 'mpesa' | 'cash', amount: number) => {
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
        if (newMpesa + newCash > grandTotal) {
            if (type === 'mpesa') {
                newMpesa = grandTotal - newCash;
                setMpesa(Math.max(0, newMpesa)); // ensure it doesn't go negative
            } else {
                newCash = grandTotal - newMpesa;
                setCash(Math.max(0, newCash)); // ensure it doesn't go negative
            }
        }

        const totalPaid = newMpesa + newCash;
        setTotalPaid(totalPaid);
        setBalance((grandTotal - totalPaid).toFixed(0));
    };

    useEffect(() => {
        // Recalculate balance whenever payment or grandTotal changes
        const currentBalance = grandTotal - totalPaid;
        setBalance(currentBalance.toFixed(0));
    }, [grandTotal, totalPaid]);

    // Recalculate totalPaid on initial load if needed (e.g., if total changes)
    useEffect(() => {
        handlePaymentChange('cash', cash);
    }, [grandTotal, handlePaymentChange, cash]);

    const data = useMemo(
        () => ({
            customer: selectedCustomer,
            total: parseInt(total).toString(),
            products: productList.filter((item) => item.id != null && Number(item.quantity) > 0), // Filter out incomplete items for submission
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
                    // router.get(route('sales.index'))
                },
                onFinish: () => {
                    setIsLoading(false);
                }
            }
        );
    };

    return (
        <AppLayout>
            <Head title="Sales" />
            <CustomToaster flash={flash} />
            {/* <Toaster richColors position="top-center" /> */}
            <div className="flex w-full flex-col justify-center">
                <div className="flex w-full items-center justify-between px-4">
                    <h1 className="text-2xl font-medium">Sales</h1>

                    <CustomFloatingCart
                        fee={Number(data.deliveryFee?.numeric)}
                        productCount={productCount}
                        total={isNaN(Number(total)) ? 0 : Number(total)}
                    />
                </div>

                <div className="flex w-full flex-col items-center">
                    {/* Customer and Delivery Section */}
                    <div className="m-2 flex w-11/12 flex-col justify-center gap-4 rounded border-2 p-4 md:w-10/12">
                        <div className="font-bolder">Customer</div>

                        <div className={`flex w-full justify-between gap-4`}>
                            <CustomSelection
                                align="start"
                                data={customers.map((c) => ({ id: c.id, name: c.user.name }))}
                                onSelect={(customer) => setSelectedCustomer(customer)}
                                selectedOption={selectedCustomer}
                                label="Select Customer"
                                className="w-full"
                                error={errors.customer}
                            />
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
                                label="Set as Delivery?"
                                className="bg-pink-300"
                                error={errors.isDelivery || errors.deliveryData}
                            />
                        </div>
                        {isDelivery && (
                            <div className="flex items-center justify-between gap-4 border-0 border-t-2 pt-2 md:justify-around">
                                {isNewDelivery == null || isNewDelivery == false ? (
                                    <Skeleton
                                        onClick={() => {
                                            setIsNewDelivery(true);
                                            setSelectedRider(null);
                                            setSelectedDelivery(null);
                                            setDeliveryData(emptyDelivery);
                                            setDeliveryFee({ raw: '', numeric: 0 });
                                        }}
                                        className="flex h-[100px] w-1/2 cursor-pointer items-center justify-center gap-2 overflow-hidden p-2 hover:border-2 hover:bg-primary/70 hover:shadow-2xs md:w-1/4"
                                    >
                                        <PlusCircle /> <span>Create New Delivery</span>
                                    </Skeleton>
                                ) : (
                                    <div
                                        className={`flex ${deliveriesAvailable ? 'flex-col gap-2' : 'w-full items-center justify-around'} ${errors.deliveryData || errors.deliveryFee ? 'border border-red-500/80' : ''} rounded-2xl p-2`}
                                    >
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
                                                    ? { value: selectedRider, label: riders.find((r) => r.id === selectedRider)?.user.name || '' }
                                                    : null
                                            }
                                            align="start"
                                            label="Select Rider"
                                            placeholder="Select a rider to create delivery"
                                            error={errors.rider_id}
                                        />
                                        <CustomTextArea
                                            id="description"
                                            label="Delivery description"
                                            value={deliveryData.description || ''}
                                            onChange={(e) => {
                                                setDeliveryData({ ...deliveryData, description: e.target.value || '' });
                                            }}
                                        />
                                        <CustomInput
                                            id="delivery_fee"
                                            name="deliver_fee"
                                            label="Delivery Fee (KSH)"
                                            placeholder="Enter amount to charge for delivery"
                                            type="text"
                                            value={deliveryFee.raw ?? (isNaN(Number(deliveryFee.raw)) ? '' : String(deliveryFee.numeric))}
                                            onChange={(e) => {
                                                const { raw, numeric } = sanitizeOnChange(e.target.value);
                                                setDeliveryFee({
                                                    raw: raw,
                                                    numeric: numeric
                                                });
                                            }}
                                            onBlur={(e) => {
                                                const { raw, numeric } = sanitizeOnBlur(e.target.value);
                                                setDeliveryFee({
                                                    raw: raw,
                                                    numeric: numeric
                                                });
                                            }}
                                            error={errors.deliveryFee}
                                        />
                                    </div>
                                )}
                                {isNewDelivery == null || isNewDelivery == true ? (
                                    deliveriesAvailable && (
                                        <Skeleton
                                            onClick={() => setIsNewDelivery(false)}
                                            className="flex h-[100px] w-1/2 cursor-pointer items-center justify-center gap-2 overflow-hidden hover:border-2 hover:bg-primary/70 hover:shadow-2xs md:w-1/4"
                                        >
                                            <TagsIcon /> <span>Attach to Delivery</span>
                                        </Skeleton>
                                    )
                                ) : (
                                    <div
                                        className={`flex ${deliveriesAvailable ? 'flex-col gap-2' : 'w-full items-center justify-around'} ${errors.deliveryData || errors.deliveryFee ? 'border border-red-500/80' : ''} rounded-2xl p-2`}
                                    >
                                        <CustomSelection
                                            data={
                                                deliveries?.map((d) => ({
                                                    id: d.id,
                                                    name: `Delivery #${d.id} - ${d.rider.user.name} (${d.status})`
                                                })) || []
                                            }
                                            label="Select Delivery"
                                            placeholder="Select Delivery to attach sale to"
                                            onSelect={(selectedDelivery) => {
                                                const selected =
                                                    deliveries?.find((d) => d.id === selectedDelivery.value) || ({} as DeliveryInterface);

                                                setSelectedDelivery(selectedDelivery.value);
                                                setDeliveryData({
                                                    ...emptyDelivery,
                                                    delivery_id: selected.id,
                                                    description: selected.description || ''
                                                });
                                            }}
                                            selectedOption={
                                                selectedDelivery
                                                    ? {
                                                          value: selectedDelivery,
                                                          label: `Delivery #${selectedDelivery} - ${deliveries?.find((d) => d.id === selectedDelivery)?.rider.user.name} `
                                                      }
                                                    : null
                                            }
                                            align="start"
                                            error={errors.delivery_id}
                                        />

                                        <CustomTextArea
                                            id="description"
                                            label="Delivery description"
                                            value={deliveryData.description || ''}
                                            onChange={(e) => {
                                                setDeliveryData({ ...deliveryData, description: e.target.value || '' });
                                            }}
                                        />
                                        <CustomInput
                                            id="delivery_fee"
                                            name="deliver_fee"
                                            label="Delivery Fee (KSH)"
                                            placeholder="Enter amount to charge for delivery"
                                            type="text"
                                            value={deliveryFee.raw ?? (isNaN(Number(deliveryFee.raw)) ? '' : String(deliveryFee.numeric))}
                                            onChange={(e) => {
                                                const { raw, numeric } = sanitizeOnChange(e.target.value);
                                                setDeliveryFee({
                                                    raw: raw,
                                                    numeric: numeric
                                                });
                                            }}
                                            onBlur={(e) => {
                                                const { raw, numeric } = sanitizeOnBlur(e.target.value);
                                                setDeliveryFee({
                                                    raw: raw,
                                                    numeric: numeric
                                                });
                                            }}
                                            error={errors.deliveryFee}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    {/* Sales Products Section */}
                    <div className="m-2 flex w-11/12 flex-col justify-center gap-4 rounded border-2 p-4 md:w-10/12">
                        <div className="text-bol">Sales Products</div>
                        {productList.map((item, idx) => (
                            <div key={item.index} className="flex w-full items-center justify-between">
                                <span className="relative left-4 z-10 flex h-6 w-8 items-center justify-center rounded bg-primary p-1 text-xs text-secondary">
                                    {idx + 1}
                                </span>

                                <div className="md grid min-w-10/12 grid-cols-2 gap-6 rounded-2xl border p-4 md:flex md:justify-around">
                                    <CustomSelection
                                        data={products}
                                        label="Product"
                                        placeholder="Select Product"
                                        onSelect={(selected: { value: number } | null) => {
                                            handleSelectedProduct(selected!, idx);
                                        }}
                                        selectedOption={
                                            productList[idx].id ? { value: productList[idx].id, label: productList[idx].display_name } : null
                                        }
                                        error={errors[`products.${idx}.id`] || errors['products']}
                                    />

                                    <CustomInput
                                        className="flex-1"
                                        id={`quantity-${idx}`}
                                        name="quantity"
                                        label="Quantity"
                                        type="text"
                                        step={0.1}
                                        // Use 'quantity' or 'quantityRaw' to display the user's input before/after blur
                                        value={item.quantityRaw ?? (item.quantity === '' ? '' : String(item.quantity))}
                                        disabled={item.id == null}
                                        onChange={(e) => {
                                            const { raw, numeric } = sanitizeOnChange(e.target.value);
                                            const updated = [...productList];
                                            updated[idx] = {
                                                ...updated[idx],
                                                quantityRaw: raw,
                                                quantity: numeric,
                                                // Recalculate subTotal immediately
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
                                                // Recalculate subTotal on blur
                                                subTotal: numeric * (updated[idx].price ?? 0)
                                            };
                                            setProductList(updated);
                                        }}
                                        error={errors[`products.${idx}.quantity`]}
                                    />

                                    {item.price != 0 ? (
                                        <div className="mt-4 flex flex-3 items-center justify-center gap-3 font-bold">
                                            <span>@</span> <span>{item.price} </span>{' '}
                                            <span>
                                                {item.name && '/'} {item.unit}{' '}
                                            </span>
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}
                                    <div className="mt-5 flex flex-2 items-center justify-end gap-2 p-2 px-6 font-bold text-green-400 md:border-b-2">
                                        <span>{item.subTotal.toFixed(0)}</span> <span>ksh</span>
                                    </div>
                                </div>
                                {/* Delete Icon Implementation */}
                                <CustomIconButton
                                    icon={Trash2}
                                    onClick={() => handleRemoveItem(idx)}
                                    className="relative right-2 flex h-8 w-8 items-center justify-center rounded bg-red-50 p-1 text-xs text-red-900 hover:bg-red-200"
                                />
                            </div>
                        ))}

                        {/* Add product button */}
                        <div className="flex justify-end px-4">
                            <CustomIconButton
                                icon={Plus}
                                label="Add Product"
                                showLabel
                                onClick={handleAddNewItem}
                                disabled={btnDisabled}
                                className="w-[150px] bg-primary/90 p-2 hover:bg-primary/30"
                            />
                        </div>
                    </div>
                    {/* Payment Details Section */}
                    <div className="m-2 mx-5 flex w-11/12 flex-col justify-center gap-4 rounded border-2 p-4 md:w-10/12">
                        <div className="font-bolder">Payment Details</div>
                        <div className="grid grid-cols-2 items-center justify-center gap-4 md:flex">
                            <CustomInput
                                id="mpesa"
                                name="mpesa"
                                label="Mpesa Amount"
                                type="text"
                                placeholder="Enter Amount paid "
                                value={!isNaN(mpesa) && mpesa !== 0 ? mpesa : ''}
                                onChange={(e) => {
                                    const { numeric } = sanitizeOnChange(e.target.value);
                                    handlePaymentChange('mpesa', numeric);
                                }}
                            />
                            <CustomInput
                                id="cash"
                                name="cash"
                                label="Cash Amount"
                                type="text"
                                placeholder="Enter Amount paid "
                                value={!isNaN(cash) && cash !== 0 ? cash : ''}
                                onChange={(e) => {
                                    const { numeric } = sanitizeOnChange(e.target.value);
                                    handlePaymentChange('cash', numeric);
                                }}
                            />
                            <CustomInput
                                id="total"
                                name="total"
                                readOnly
                                label="Total Paid"
                                className="w-3/5 bg-white text-center font-bold text-green-500 md:w-1/2"
                                value={`${totalPaid} ksh`}
                                error={errors.totalPaid}
                            />
                            <CustomInput
                                id="balance"
                                name="balance"
                                label="Balance"
                                readOnly
                                className="w-3/5 bg-white text-end font-bold text-red-500 md:w-1/2"
                                value={`${balance} ksh`}
                            />
                        </div>
                    </div>
                    <div className="m-2 flex w-11/12 flex-col justify-center gap-4 rounded border-2 p-4 md:w-10/12">
                        <CustomSubmitButton
                            label="Save Sale data"
                            onClick={() => {
                                handleSubmit();
                            }}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
