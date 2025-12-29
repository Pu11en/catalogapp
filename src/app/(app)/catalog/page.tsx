import React from "react";
import Link from "next/link";
import { Search as SearchIcon, Filter } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function CatalogPage() {
    const products = await prisma.product.findMany({
        include: {
            variants: true
        }
    });

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-black tracking-tighter">EXPLORE FLAVORS</h1>
                <button className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-slate-400">
                    <Filter size={20} />
                </button>
            </div>

            {/* Search Bar */}
            <div className="relative mb-10 group">
                <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-teal-400 transition-colors" size={20} />
                <input
                    type="text"
                    placeholder="Search premium spices..."
                    className="w-full bg-slate-900/50 border-2 border-slate-800 rounded-[32px] py-5 pl-16 pr-8 focus:outline-none focus:border-teal-500/50 transition-all text-sm font-bold placeholder:text-slate-600"
                />
            </div>

            {/* Categories */}
            <div className="flex gap-3 mb-12 overflow-x-auto pb-2 no-scrollbar -mx-8 px-8">
                {['All', 'Noodles', 'Spices', 'Grocery', 'Drinks'].map((cat) => (
                    <button key={cat} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${cat === 'All' ? 'bg-teal-600 text-white' : 'bg-slate-900 text-slate-500 border border-slate-800'}`}>
                        {cat}
                    </button>
                ))}
            </div>

            {/* Products by Brand */}
            <div className="space-y-12">
                {Object.entries(
                    products.reduce((acc, product) => {
                        const brand = product.brand || 'Other';
                        if (!acc[brand]) acc[brand] = [];
                        acc[brand].push(product);
                        return acc;
                    }, {} as Record<string, typeof products>)
                ).map(([brand, brandProducts]) => (
                    <section key={brand}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">{brand}</h2>
                            <span className="text-[10px] font-bold text-slate-600 bg-slate-900 px-2 py-1 rounded-lg">{brandProducts.length}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {brandProducts.map((product) => (
                                <Link key={product.id} href={`/product/${product.id}`} className="bg-slate-900 border border-slate-800 p-4 rounded-3xl group hover:border-teal-500/30 transition-all flex flex-col">
                                    <div className="w-full aspect-square bg-slate-800 rounded-2xl mb-4 overflow-hidden relative">
                                        {product.image ? (
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-contain p-2 group-hover:scale-105 transition-transform"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-700">NO IMG</div>
                                        )}
                                        {product.isNew && (
                                            <div className="absolute top-2 right-2 px-2 py-0.5 bg-teal-500/10 text-teal-400 text-[10px] font-black rounded-lg border border-teal-500/20">NEW</div>
                                        )}
                                    </div>
                                    <h3 className="font-bold text-sm mb-1 leading-tight tracking-tight uppercase">{product.name}</h3>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">{product.description || product.variants[0]?.size || "Case"}</p>
                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-sm font-black text-white">
                                            $?
                                        </span>
                                        <div className="w-8 h-8 bg-teal-600 rounded-xl flex items-center justify-center text-white font-bold group-hover:bg-teal-500 active:scale-90 transition-all shadow-lg shadow-teal-500/20">
                                            +
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
