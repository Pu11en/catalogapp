"use client";

import React from "react";
import Link from "next/link";
import { Clock, CheckCircle2, Truck, Package, Mail, ArrowRight } from "lucide-react";

export default function OrdersPage() {
    const [email, setEmail] = React.useState("");
    const [orders, setOrders] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [hasEnteredEmail, setHasEnteredEmail] = React.useState(false);

    // Initial load from localStorage
    React.useEffect(() => {
        const savedEmail = localStorage.getItem("vendorEmail");
        if (savedEmail) {
            setEmail(savedEmail);
            setHasEnteredEmail(true);
            fetchOrders(savedEmail);
        }
    }, []);

    const fetchOrders = async (targetEmail: string) => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/orders?email=${encodeURIComponent(targetEmail)}`);
            if (res.ok) {
                const data = await res.json();
                setOrders(data.orders);
            }
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            localStorage.setItem("vendorEmail", email);
            setHasEnteredEmail(true);
            fetchOrders(email);
        }
    };

    if (!hasEnteredEmail) {
        return (
            <div className="min-h-screen bg-slate-950 p-8 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center mb-8 text-teal-400">
                    <Mail size={32} />
                </div>
                <h1 className="text-3xl font-black mb-4 tracking-tighter uppercase">Track Your Orders</h1>
                <p className="text-slate-500 mb-10 max-w-xs leading-relaxed font-bold">Enter your wholesale email to retrieve your recent order history and status updates.</p>
                <form onSubmit={handleEmailSubmit} className="w-full max-w-sm space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@business.com"
                        className="w-full bg-slate-900/50 border-2 border-slate-800 rounded-2xl py-4 px-6 focus:outline-none focus:border-teal-500/50 text-sm font-bold placeholder:text-slate-700"
                        required
                    />
                    <button type="submit" className="w-full bg-teal-600 py-4 rounded-xl font-black uppercase tracking-widest text-sm shadow-lg shadow-teal-500/20 active:scale-95 transition-all flex items-center justify-center gap-3">
                        View History
                        <ArrowRight size={16} />
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-black tracking-tighter uppercase">Order Status</h1>
                {isLoading && <div className="animate-spin w-4 h-4 border-2 border-teal-500 border-t-transparent rounded-full" />}
            </div>

            <div className="space-y-4">
                {orders.map((order) => {
                    const items = JSON.parse(order.items);
                    return (
                        <div key={order.id} className="bg-slate-900 border border-slate-800 p-6 rounded-[32px] group hover:border-slate-700 transition-all">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-lg font-black tracking-tight mb-1 font-mono">#{order.id.slice(0, 8).toUpperCase()}</h2>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.15em] border ${order.status === "delivered"
                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                    : "bg-teal-500/10 text-teal-400 border-teal-500/20"
                                    }`}>
                                    {order.status}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-slate-500 font-bold border-r border-slate-800 pr-4">
                                    <Package size={14} className="text-teal-400" />
                                    <span className="text-[10px] uppercase tracking-widest">{items.length} SKUs</span>
                                </div>
                                <span className="text-2xl font-black text-white">${order.subtotal.toFixed(2)}</span>
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between">
                                <button className="text-[10px] font-black uppercase tracking-widest text-teal-400 hover:text-teal-300 transition-colors">Details</button>
                                <button className="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Support</button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {orders.length === 0 && !isLoading && (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-[32px] flex items-center justify-center mb-6 text-slate-700">
                        <Clock size={32} />
                    </div>
                    <h2 className="text-xl font-black uppercase tracking-tight mb-2">No active orders</h2>
                    <p className="text-slate-500 text-sm font-bold max-w-xs">Items you order will appear here with real-time status tracking.</p>
                    <Link href="/catalog" className="mt-8 text-[10px] font-black uppercase tracking-widest text-teal-400">Back to catalog</Link>
                </div>
            )}

            <button
                onClick={() => {
                    localStorage.removeItem("vendorEmail");
                    setHasEnteredEmail(false);
                    setOrders([]);
                }}
                className="mt-12 w-full py-4 text-center text-slate-600 text-[10px] font-black uppercase tracking-widest hover:text-slate-400 transition-colors"
            >
                Switch Account
            </button>
        </div>
    );
}
