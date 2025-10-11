import CustomSubmitButton from "@/components/custom/custom-submit-button";
import InputError from "@/components/input-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLayout from "@/layouts/app-layout";
import AuthLayout from "@/layouts/auth-layout";
import { ProductInterface } from "@/pages/interface/general";
import { router, usePage } from "@inertiajs/react";
import { useState } from "react";



export default function Create({ product }: { product?: ProductInterface }) {
    const isEdit = product != null;
    const [isLoading, setIsLoading] = useState(false);
    const { errors: formErrors } = usePage().props as { errors: Record<string, string> };
    const [data, setData] = useState({
        name: product?.name || '',
        unit: product?.unit || '',
        price: product?.price || '',
    });

    const handleSubmit = () => {
        setIsLoading(true);
        if (isEdit) {
            return router.put(`/products/${product?.id}`, data, {
                onFinish: () => {
                    setIsLoading(false);
                },
            });
        }
        return router.post('/products', data, {
            onFinish: () => {
                setIsLoading(false);
            },
        });
    }
    return (
        <AppLayout>
            <AuthLayout
                title={`${isEdit ? 'Edit' : 'Create New'} Product`}
                description={isEdit ? `Fill the form to update ${product.name} product` : 'Fill the form to create a new product'}
            >
                <div className="flex-col columns-2 flex gap-2">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
                        <InputError message={formErrors.name} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="unit">Unit</Label>
                        <Input id="unit" name="unit" value={data.unit} onChange={(e) => setData({ ...data, unit: e.target.value })} />
                        <InputError message={formErrors.unit} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="price">Price</Label>
                        <Input
                            id="price"
                            type="number"
                            name="price"
                            step={1}
                            value={data.price}
                            onChange={(e) => setData({ ...data, price: Number(e.target.value) > 0 ? Number(e.target.value) : '' })}
                        />
                        <InputError message={formErrors.price} />
                    </div>
                </div>
                <CustomSubmitButton label={isEdit ? 'Update' : 'Create'} isLoading={isLoading} onClick={() => handleSubmit()} />
            </AuthLayout>
        </AppLayout>
    );
}