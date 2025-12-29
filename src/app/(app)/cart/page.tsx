"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, Trash2, ShoppingBag, Mail, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/store";

export default function CartPage() {
    const router = useRouter();
    const { items, removeItem, updateQuantity, clearCart } = useCartStore();
    const [email, setEmail] = React.useState("");
    const [isPlacing, setIsPlacing] = React.useState(false);

    // Load email from localStorage on mount
    React.useEffect(() => {
        const savedEmail = localStorage.getItem("vendorEmail");
        if (savedEmail) setEmail(savedEmail);
    }, []);

    const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handlePlaceOrder = async () => {
        if (!email) {
            alert("Please enter your email to place the order.");
            return;
        }

        setIsPlacing(true);
        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    items,
                    total
                })
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem("vendorEmail", email);
                alert(`Order placed successfully! Order ID: #${data.orderId.slice(0, 8)}`);
                clearCart();
                router.push("/orders");
            } else {
                throw new Error("Failed to place order");
            }
        } catch (error) {
            alert("Something went wrong. Please try again.");
            console.error(error);
        } finally {
            setIsPlacing(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-slate-950 p-8 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-slate-900 border border-slate-800 rounded-[40px] flex items-center justify-center mb-8 text-slate-700 shadow-xl">
                    <ShoppingBag size={40} />
                </div>
                <h1 className="text-3xl font-black mb-4 tracking-tighter uppercase">Your Cart is Empty</h1>
                <p className="text-slate-500 mb-10 max-w-xs leading-relaxed font-bold">Looks like you haven&apos;t added any premium island flavors to your order yet.</p>
                <Link href="/catalog" className="bg-teal-600 px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-lg shadow-teal-500/20 active:scale-95 transition-all">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 p-8 pb-40">
            <div className="flex items-center gap-4 mb-10">
                <button onClick={() => router.back()} className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-white">
                    <ChevronLeft size={20} />
                </button>
                <h1 className="text-3xl font-black tracking-tighter uppercase">Review Order</h1>
            </div>

            <div className="space-y-4 mb-12">
                {items.map((item) => (
                    <div key={item.id} className="bg-slate-900 border border-slate-800 p-6 rounded-[32px] flex items-center gap-6 group hover:border-slate-700 transition-all">
                        <div className="w-16 h-16 bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center text-[10px] text-slate-600 font-bold uppercase p-2 text-center">
                            {item.image ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img src={item.image} alt={item.name} className="object-contain w-full h-full" />
                            ) : "NO IMG"}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-black text-sm tracking-tight mb-1 uppercase leading-none">{item.name}</h3>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">{item.brand}</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl p-1 gap-3">
                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center text-white active:scale-90 transition-all">-</button>
                                    <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 bg-teal-600/20 text-teal-400 border border-teal-500/10 rounded-lg flex items-center justify-center active:scale-90 transition-all">+</button>
                                </div>
                                <span className="text-sm font-black text-teal-400">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="w-10 h-10 flex items-center justify-center text-slate-700 hover:text-rose-500 transition-colors">
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>

            {/* Identify */}
            <div className="mb-10">
                <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-4 ml-2">Wholesale Identification</h2>
                <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-teal-400 transition-colors" size={20} />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your wholesale email"
                        className="w-full bg-slate-900/50 border-2 border-slate-800 rounded-[32px] py-6 pl-16 pr-8 focus:outline-none focus:border-teal-500/50 transition-all text-sm font-black uppercase tracking-widest"
                    />
                </div>
            </div>

            {/* Action */}
            <div className="fixed bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent z-50">
                <button
                    onClick={handlePlaceOrder}
                    disabled={!email || isPlacing}
                    className="w-full bg-teal-600 py-6 rounded-[28px] font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-4 hover:bg-teal-500 active:scale-[0.98] transition-all shadow-2xl shadow-teal-500/20 disabled:opacity-50 disabled:grayscale disabled:scale-100 group"
                >
                    {isPlacing ? "Processing Order..." : `Place Order • $${total.toFixed(2)}`}
                    {!isPlacing && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                </button>
            </div>
        </div>
    );
}
