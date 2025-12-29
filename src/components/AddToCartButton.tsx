"use client";

import React from "react";
import { Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/store";

interface AddToCartButtonProps {
    product: {
        id: string;
        name: string;
        brand: string;
        price: number;
        image?: string;
    }
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const [quantity, setQuantity] = React.useState(1);
    const addItem = useCartStore((state) => state.addItem);

    const handleAdd = () => {
        addItem({
            ...product,
            quantity
        });
        // Simple success feedback
        alert(`Added ${quantity} ${product.name} to cart!`);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-[28px] p-2">
                <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-14 h-14 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center text-white active:scale-95 transition-all"
                >
                    <Minus size={20} />
                </button>
                <div className="text-center">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Order Quantity</p>
                    <p className="text-xl font-black text-white">{quantity}</p>
                </div>
                <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-14 h-14 bg-teal-600 border border-teal-500 rounded-2xl flex items-center justify-center text-white active:scale-95 transition-all shadow-lg shadow-teal-500/20"
                >
                    <Plus size={20} />
                </button>
            </div>

            <button
                onClick={handleAdd}
                className="w-full bg-teal-600 py-6 rounded-[28px] font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-teal-500 active:scale-[0.98] transition-all shadow-2xl shadow-teal-500/20 group"
            >
                Add to Order • ${(product.price * quantity).toFixed(2)}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
    );
}
