import CustomInput from '@/components/custom/custom-input';
import CustomSelection from '@/components/custom/custom-selection';
import CustomSubmitButton from '@/components/custom/custom-submit-button';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { route } from 'ziggy-js';

export default function Create({ stock, products, suppliers }: { stock?: any; products: any[]; suppliers: any[] }) {
    const isEdit = stock != null;

    const errors = usePage().props.errors;

    const [selectedProduct, setSelectedProduct] = useState({});
    const [selectedSupplier, setSelectedSupplier] = useState({});

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState({
        product_id: stock?.product_id || '',
        supplier_id: stock?.supplier_id || '',
        date: stock?.date || new Date().toISOString().split('T')[0],
        quantity_received: stock?.quantity_received || '',
    });

    const [unit, setUnit] = useState(stock?.product?.unit || 'Unit');

    useEffect(() => {
        setUnit(data.product_id ? products.find((product) => product.id === data.product_id)?.unit : '');
    }, [data.product_id, products]);

    useEffect(() => {
        if (isEdit && stock) {
            setSelectedProduct({
                value: stock.product_id,
                label: stock.product.name,
            });
            setSelectedSupplier({
                value: stock.supplier_id,
                label: stock.supplier.name,
            });

        }
    }, [isEdit, stock, products]);

    const handleSubmit = () => {
        console.log(data)
        setIsLoading(true);
        if (isEdit) {
            return router.put(route('batches.update', stock.id), data, {
                onFinish: () => {
                    setIsLoading(false);
                },
            });
        }
        return router.post(route('batches.store'), data, {
            onFinish: () => {
                setIsLoading(false);
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Add Stock" />
            <AuthLayout
                title={isEdit ? 'Update Stock' : 'Add Stock'}
                description={isEdit ? `Fill the form to update ${stock.batch_no} stock` : 'Fill the form to create a new stock'}
            >
                <div className="grid grid-cols-2 gap-6">
                    <CustomSelection
                        label="Select Product"
                        data={products}
                        onSelect={(selected) => {
                            setSelectedProduct(selected);
                            setData({ ...data, product_id: selected.value });
                        }}
                        selectedOption={selectedProduct}
                        placeholder="Select Product"
                        error={errors.product_id}
                    />

                    <CustomSelection
                        label="Select Supplier"
                        data={suppliers}
                        placeholder="Select Supplier"
                        onSelect={(selectedSupplier) => {
                            setSelectedSupplier(selectedSupplier);
                            setData({ ...data, supplier_id: selectedSupplier.value });
                        }}
                        selectedOption={selectedSupplier}
                        error={errors.supplier_id}
                    />
                    <CustomInput
                        id="date"
                        name="date"
                        type="date"
                        label="Date"
                        value={data.date}
                        onChange={(e) => setData({ ...data, date: e.target.value })}
                        error={errors.date}
                    />
                    <CustomInput
                        id="quantity_received"
                        name="quantity_received"
                        type="number"
                        label={`Quantity Received ${unit}`}
                        placeholder={`enter quantity received in ${unit}`}
                        value={data.quantity_received}
                        onChange={(e) => setData({ ...data, quantity_received: e.target.value })}
                        error={errors.quantity_received}
                    />
                </div>
                <CustomSubmitButton
                    label={isEdit ? 'Update  Stock' : 'Add Stock'}
                    isLoading={isLoading}
                    onClick={() => {
                        handleSubmit();
                    }}
                />
            </AuthLayout>
        </AppLayout>
    );
}
