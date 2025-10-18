import CustomInput from '@/components/custom/custom-input';
import CustomSubmitButton from '@/components/custom/custom-submit-button';
import CustomTextArea from '@/components/custom/custom-text-area';
import CustomToaster, { FlashMessage } from '@/components/custom/custom-toaster';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import { SupplierInterface } from '@/pages/interface/general';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { route } from 'ziggy-js';

export default function Create({ Supplier }: { Supplier?: SupplierInterface }) {
    const isEdit = !!Supplier;
    const errors = usePage().props.errors as Record<string, string>;
    const emptyData = {
        company_name: isEdit ? Supplier.company_name : '',
        contact_person: isEdit ? Supplier.contact_person : '',
        phone: isEdit ? Supplier.phone : '',
        email: isEdit ? Supplier.email : '',
        address: isEdit ? Supplier.address : '',
        description: isEdit ? Supplier.description : ''
    };
    const [data, setData] = useState(emptyData);
    const [isLoading, setIsLoading] = useState(false);
    const flash = usePage().props.flash as FlashMessage;


    const handleSubmit = () => {
        setIsLoading(true);

        if (isEdit) {
            router.put(route('suppliers.update', Supplier.id), data, {
                onSuccess: () => {
                    setData(emptyData);
                },
                onFinish: () => {
                    setIsLoading(false);
                }
            });
        } else {
            router.post(route('suppliers.store'), data, {
                onSuccess: () => {
                    setData(emptyData);
                },
                onFinish: () => {
                    setIsLoading(false);
                }
            });
        }
    };
    return (
        <AppLayout>
            <Head title={`${isEdit ? `Edit Supplier ${Supplier.company_name}}` : 'Create Supplier'}`} />
            <CustomToaster flash={flash} />
            <AuthLayout
                title={`${isEdit ? 'Edit Supplier' : 'Create Supplier'}`}
                description={`${isEdit ? `Edit Supplier ${Supplier.company_name}} details. ` : 'Create Supplier'}`}
            >
                <div className="flex flex-col items-center gap-4">
                    <div className="grid gap-4 p-2 md:grid-cols-2">
                        <CustomInput
                            id="company_name"
                            label="Company Name"
                            type="text"
                            name="company_name"
                            value={data.company_name}
                            onChange={(e) => {
                                setData({ ...data, company_name: e.target.value });
                            }}
                            error={errors.company_name}
                        />
                        <CustomInput
                            id="contact_person"
                            label="Contact Person"
                            type="text"
                            name="contact_person"
                            value={data.contact_person}
                            onChange={(e) => {
                                setData({ ...data, contact_person: e.target.value });
                            }}
                            error={errors.contact_person}
                        />
                        <CustomInput
                            id="phone"
                            label="Phone"
                            type="text"
                            name="phone"
                            value={data.phone}
                            onChange={(e) => {
                                setData({ ...data, phone: e.target.value });
                            }}
                            error={errors.phone}
                        />
                        <CustomInput
                            id="email"
                            label="Email"
                            type="text"
                            name="email"
                            value={data.email}
                            onChange={(e) => {
                                setData({ ...data, email: e.target.value });
                            }}
                            error={errors.email}
                        />
                        <CustomInput
                            id="address"
                            label="Address"
                            type="text"
                            name="address"
                            value={data.address}
                            onChange={(e) => {
                                setData({ ...data, address: e.target.value });
                            }}
                            error={errors.address}
                        />
                        <CustomTextArea
                            id="description"
                            label="Description "
                            name="description"
                            value={data.description}
                            onChange={(e) => {
                                setData({ ...data, description: e.target.value });
                            }}
                            error={errors.description}
                        />
                    </div>
                    <CustomSubmitButton
                        className='w-full'
                        isLoading={isLoading}
                        onClick={() => {handleSubmit()}}
                        label={`${isEdit ? 'Edit' : 'Create'} Supplier`}
                        activeLabel={`${isEdit ? 'Editing' : 'Saving'} Supplier...`}
                    />
                </div>
            </AuthLayout>
        </AppLayout>
    );
}
