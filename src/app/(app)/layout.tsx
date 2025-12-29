"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, Search, Package, User, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/lib/store';

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const items = useCartStore((state) => state.items);
    const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

    const isActive = (path: string) => pathname === path;

    return (
        <div className="flex flex-col min-h-screen bg-slate-950">
            {/* Header with Logo */}
            <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 px-4 py-3">
                <div className="max-w-lg mx-auto flex items-center justify-center">
                    <Link href="/home">
                        <Image
                            src="/salmo-logo.png"
                            alt="Salmo Catalog"
                            width={140}
                            height={50}
                            className="object-contain"
                            priority
                        />
                    </Link>
                </div>
            </header>

            <main className="flex-1 pb-32">
                {children}
            </main>

            {/* Floating Cart Button */}
            {itemCount > 0 && pathname !== '/cart' && (
                <div className="fixed bottom-24 left-0 right-0 px-6 z-50 pointer-events-none">
                    <Link href="/cart" className="pointer-events-auto">
                        <div className="max-w-md mx-auto bg-teal-600 shadow-2xl shadow-teal-500/40 rounded-2xl p-4 flex items-center justify-between text-white group active:scale-95 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                    <ShoppingBag size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Review Order</p>
                                    <p className="font-black text-sm">{itemCount} Items • ${total.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest">
                                View Cart
                                <ShoppingBag size={14} className="group-hover:translate-x-0.5 transition-transform" />
                            </div>
                        </div>
                    </Link>
                </div>
            )}

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-2xl border-t border-slate-800 h-20 px-4 z-50">
                <div className="max-w-lg mx-auto h-full flex items-center justify-between">
                    <Link href="/home" className={`flex flex-col items-center justify-center space-y-1 w-full transition-colors ${isActive('/home') ? 'text-teal-400' : 'text-slate-500 hover:text-slate-400'}`}>
                        <Home size={22} strokeWidth={isActive('/home') ? 2.5 : 2} />
                        <span className="text-[9px] uppercase tracking-[0.15em] font-black">Home</span>
                    </Link>
                    <Link href="/catalog" className={`flex flex-col items-center justify-center space-y-1 w-full transition-colors ${isActive('/catalog') ? 'text-teal-400' : 'text-slate-500 hover:text-slate-400'}`}>
                        <Search size={22} strokeWidth={isActive('/catalog') ? 2.5 : 2} />
                        <span className="text-[9px] uppercase tracking-[0.15em] font-black">Catalog</span>
                    </Link>
                    <Link href="/orders" className={`flex flex-col items-center justify-center space-y-1 w-full transition-colors ${isActive('/orders') ? 'text-teal-400' : 'text-slate-500 hover:text-slate-400'}`}>
                        <Package size={22} strokeWidth={isActive('/orders') ? 2.5 : 2} />
                        <span className="text-[9px] uppercase tracking-[0.15em] font-black">Orders</span>
                    </Link>
                    <Link href="/account" className={`flex flex-col items-center justify-center space-y-1 w-full transition-colors ${isActive('/account') ? 'text-teal-400' : 'text-slate-500 hover:text-slate-400'}`}>
                        <User size={22} strokeWidth={isActive('/account') ? 2.5 : 2} />
                        <span className="text-[9px] uppercase tracking-[0.15em] font-black">Account</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
}
