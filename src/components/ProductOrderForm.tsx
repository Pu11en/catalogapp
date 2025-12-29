"use client";

import React, { useState } from "react";
import { Mail, ArrowRight, Check, AlertCircle } from "lucide-react";

interface Variant {
    id: string;
    size: string;
    price: number;
    caseQty: number;
}

interface ProductOrderFormProps {
    product: {
        id: string;
        name: string;
        brand: string;
        sku: string;
        category: string;
        image: string | null;
    };
    variants: Variant[];
}

export default function ProductOrderForm({ product, variants }: ProductOrderFormProps) {
    const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id || "");
    const [quantity, setQuantity] = useState(1);
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const selectedVariant = variants.find(v => v.id === selectedVariantId);
    const totalPrice = (selectedVariant?.price || 0) * quantity;

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitStatus("idle");

        const orderData = {
            product: {
                id: product.id,
                name: product.name,
                brand: product.brand,
                sku: product.sku,
                category: product.category,
                image: product.image
            },
            variant: selectedVariant,
            quantity,
            email,
            totalPrice,
            orderDate: new Date().toISOString()
        };

        try {
            const response = await fetch(
                "https://drewp.app.n8n.cloud/webhook/5177882d-5113-4dfa-a661-314c788c88f5",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(orderData)
                }
            );

            if (response.ok) {
                setSubmitStatus("success");
                setQuantity(1);
                setEmail("");
            } else {
                setSubmitStatus("error");
            }
        } catch (error) {
            console.error("Order submission error:", error);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-4">
            {/* Variant Dropdown */}
            {variants.length > 1 && (
                <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">
                        Select Size
                    </label>
                    <select
                        value={selectedVariantId}
                        onChange={(e) => setSelectedVariantId(e.target.value)}
                        className="w-full bg-slate-900 border-2 border-slate-800 rounded-2xl py-4 px-6
                                   focus:outline-none focus:border-teal-500/50 transition-all
                                   text-sm font-bold text-white appearance-none cursor-pointer"
                    >
                        {variants.map((variant) => (
                            <option key={variant.id} value={variant.id}>
                                {variant.size} - ${variant.price.toFixed(2)}/case
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Quantity and Email Row */}
            <div className="flex gap-3">
                {/* Quantity Input */}
                <div className="w-28">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">
                        Cases
                    </label>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full bg-slate-900 border-2 border-slate-800 rounded-2xl py-4 px-4
                                   focus:outline-none focus:border-teal-500/50 transition-all
                                   text-sm font-bold text-white text-center"
                    />
                </div>

                {/* Email Input */}
                <div className="flex-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">
                        Your Email
                    </label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600
                                         group-focus-within:text-teal-400 transition-colors" size={18} />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@example.com"
                            className="w-full bg-slate-900 border-2 border-slate-800 rounded-2xl py-4 pl-12 pr-4
                                       focus:outline-none focus:border-teal-500/50 transition-all
                                       text-sm font-bold text-white placeholder:text-slate-600"
                        />
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-teal-600 py-5 rounded-2xl font-black text-sm uppercase tracking-widest
                           flex items-center justify-center gap-3 hover:bg-teal-500
                           active:scale-[0.98] transition-all shadow-2xl shadow-teal-500/20
                           disabled:opacity-50 disabled:cursor-not-allowed group"
            >
                {isSubmitting ? (
                    "Submitting..."
                ) : submitStatus === "success" ? (
                    <>
                        <Check size={20} />
                        Order Submitted!
                    </>
                ) : (
                    <>
                        Submit Order - ${totalPrice.toFixed(2)}
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </button>

            {/* Status Messages */}
            {submitStatus === "success" && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400
                               p-4 rounded-2xl text-center text-sm font-bold flex items-center justify-center gap-2">
                    <Check size={18} />
                    Order submitted! Check your email for confirmation.
                </div>
            )}
            {submitStatus === "error" && (
                <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400
                               p-4 rounded-2xl text-center text-sm font-bold flex items-center justify-center gap-2">
                    <AlertCircle size={18} />
                    Failed to submit. Please try again.
                </div>
            )}
        </div>
    );
}
