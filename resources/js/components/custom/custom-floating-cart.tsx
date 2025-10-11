import {  Car, ChevronLeft, X } from 'lucide-react';
import { useState } from 'react';

const CustomFloatingCart = ({ productCount, total, fee=0 }: { productCount: number; total: number, fee?:number }) => {
    const [visible, setVisible] = useState(true);

    return (
        <>
            {visible && (
                <div className="fixed top-15 right-2 z-50 grid items-center gap-2 rounded-2xl border bg-white px-2 py-2 shadow-lg transition-all duration-600">
                    <div className='flex gap-4 justify-around'>
                        <button
                            onClick={() => setVisible(false)}
                            className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white shadow hover:bg-red-300"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        {/* Product count badge */}
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs font-bold text-white">
                            {productCount}
                        </span>

                        <span className="text-sm font-semibold text-red-700">{Math.round(total)} Ksh</span>
                    </div>
                    {fee > 0 && <div className='flex gap-2 justify-around items-center' >
                        <span className="rounded-full  p-0.5 text-center text-xs text-black"> <Car/> </span>
                        <span className="text-red-700 text-xs font-bolder">
                        {fee} Ksh 
                    </span>
                    </div>}
                </div>
            )}

            {/* Show button when hidden */}
            {!visible && (
                <button
                    onClick={() => setVisible(true)}
                    className="fixed right-1 bottom-6 z-50 flex items-center gap-1 rounded bg-green-500/70 py-2 text-white shadow-lg transition hover:bg-green-300"
                >
                    <ChevronLeft className="font-bolder h-6 w-4" />
                </button>
            )}
        </>
    );
};

export default CustomFloatingCart;
