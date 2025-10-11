import CustomInput from "./custom-input";
import CustomSelection from "./custom-selection";

interface CustomSaleProductProps {
    products: { value: number; label: string; batch_number: string; price: number; unit: string }[];
    setSelectedProduct: (product: { value: number; label: string; batch_number: string; price: number; unit: string } | null) => void;
    selectedProduct: { value: number; label: string; batch_number: string; price: number; unit: string } | null;
}


const CustomSaleProduct = ({products, setSelectedProduct, selectedProduct} : CustomSaleProductProps) => { 

    return (
        <div>
            <CustomSelection
                data={products}
                label="Product"
                placeholder="Select Product"
                onSelect={(selectedProduct) => {
                    setSelectedProduct(selectedProduct);
                    console.log(selectedProduct);
                }}
                selectedOption={selectedProduct}
            />

            <CustomInput id="quantity" name="quantity" label="Quantity" disabled={selectedProduct == null} />

            <div className="mt-4 flex justify-center border-0 p-2 font-bold"> X 80</div>
            <div className="mt-4 flex flex-2 justify-end border-0 border-b-2 p-2 px-6 font-bold">300 ksh</div>
        </div>
    );
}

export default CustomSaleProduct;