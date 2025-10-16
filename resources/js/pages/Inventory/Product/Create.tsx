import CustomInput from '@/components/custom/custom-input';
import CustomSubmitButton from '@/components/custom/custom-submit-button';
import CustomTextArea from '@/components/custom/custom-text-area';
import CustomToaster from '@/components/custom/custom-toaster';
import { sanitizeOnBlur, sanitizeOnChange } from '@/helpers/numberSanitizer';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import { ProductInterface } from '@/pages/interface/general';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Create({ product }: { product?: ProductInterface }) {
    const isEdit = product != null;
    const [isLoading, setIsLoading] = useState(false);
    const { errors } = usePage().props as any;
    const { account } = usePage().props as any;
    const { flash } = usePage().props as any;

    const emptyData = {
        name: '',
        unit: '',
        price: 0,
        description: '',
        account_id: account.id
    };
    const [price, setPrice] = useState({
        raw: '',
        numeric: 0
    });
    const [data, setData] = useState({
        name: product?.name || '',
        unit: product?.unit || '',
        price: product?.price || price.numeric,
        description: product?.description as string || '',
        account_id: account.id
    });

    const handleSubmit = () => {
        setIsLoading(true);
        if (isEdit) {
            return router.put(`/products/${product?.id}`, data, {
                onFinish: () => {
                    setIsLoading(false);
                }
            });
        }
        return router.post('/products', data, {
            onFinish: () => {
                setIsLoading(false);
                setData(emptyData);
                setPrice({
                    raw: '',
                    numeric: 0
                });
            }
        });
    };
    return (
        <AppLayout>
            {flash && <CustomToaster flash={flash} />}
            <AuthLayout
                title={`${isEdit ? 'Edit' : 'Create New'} Product`}
                description={isEdit ? `Fill the form to update ${product.name} product` : 'Fill the form to create a new product'}
            >
                <div className="flex columns-2 flex-col gap-2">
                    <CustomInput
                        id="name"
                        label="Name"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        error={errors.name}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <CustomInput
                            id="unit"
                            label="Unit"
                            name="unit"
                            value={data.unit}
                            onChange={(e) => setData({ ...data, unit: e.target.value })}
                            error={errors.unit}
                        />
                        <CustomInput
                            id="price"
                            label="Price"
                            name="price"
                            value={price.raw ?? (price.raw == '' ? '' : String(price.numeric))}
                            onChange={(e) => {
                                const { raw, numeric } = sanitizeOnChange(e.target.value);
                                setPrice({
                                    raw: raw,
                                    numeric: numeric
                                });
                                setData({
                                    ...data,
                                    price: numeric
                                });
                            }}
                            onBlur={(e) => {
                                const { raw, numeric } = sanitizeOnBlur(e.target.value);
                                setPrice({
                                    raw: raw,
                                    numeric: numeric
                                });
                            }}
                            error={errors.price}
                        />
                    </div>
                    <CustomTextArea
                        id="description"
                        label="Description"
                        name="description"
                        value={data.description}
                        onChange={(e) => setData({ ...data, description: e.target.value })}
                    />
                </div>
                <CustomSubmitButton label={isEdit ? 'Update' : 'Create'} isLoading={isLoading} onClick={() => handleSubmit()} />
            </AuthLayout>
        </AppLayout>
    );
}
