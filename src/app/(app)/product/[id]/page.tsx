import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronLeft, Heart, ShoppingBag, Info, ShieldCheck, Truck, Package } from "lucide-react";
import ProductOrderForm from "@/components/ProductOrderForm";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await prisma.product.findUnique({
        where: { id },
        include: { variants: true }
    });

    if (!product) {
        notFound();
    }

    const defaultVariant = product.variants[0];

    return (
        <div className="min-h-screen bg-slate-950 pb-40">
            {/* Header */}
            <div className="p-8 flex items-center justify-between fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl">
                <Link href="/catalog" className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-white">
                    <ChevronLeft size={20} />
                </Link>
                <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Premium Catalog</p>
                    <p className="text-xs font-black text-white uppercase truncate max-w-[150px]">{product.brand}</p>
                </div>
                <button className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-slate-400 active:text-rose-500 transition-colors">
                    <Heart size={20} />
                </button>
            </div>

            {/* Content */}
            <div className="pt-32 px-8">
                {/* Hero Image */}
                <div className="aspect-square bg-slate-900 border border-slate-800 rounded-[40px] mb-10 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {product.image ? (
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-700">NO IMAGE</div>
                    )}
                </div>

                {/* Details */}
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="px-2 py-0.5 bg-teal-500/10 text-teal-400 text-[10px] font-black rounded-lg border border-teal-500/20 uppercase tracking-widest">{product.category}</div>
                            {product.isNew && <div className="px-2 py-0.5 bg-amber-500/10 text-amber-500 text-[10px] font-black rounded-lg border border-amber-500/20 uppercase tracking-widest">Limited</div>}
                        </div>
                        <h1 className="text-4xl font-black tracking-tight leading-tight uppercase mb-2">{product.name}</h1>
                        <p className="text-slate-400 text-sm leading-relaxed">{product.description || "Authentic premium flavor sourced directly from regional masters. High-quality ingredients for wholesale distribution."}</p>
                    </div>

                    {/* Pricing Tier */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Wholesale Price</p>
                            <p className="text-3xl font-black text-teal-400">${defaultVariant?.price.toFixed(2) || '0.00'}<span className="text-xs text-slate-500 font-bold ml-1">/ case</span></p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Availability</p>
                            <p className="text-xs font-black text-emerald-400 uppercase tracking-widest">{product.stock}+ CASES IN STOCK</p>
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-teal-400">
                                <Package size={18} />
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Packaging</p>
                                <p className="text-[10px] font-black text-white uppercase">{defaultVariant?.size || "Case Pack"}</p>
                            </div>
                        </div>
                        <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-teal-400">
                                <Truck size={18} />
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Delivery</p>
                                <p className="text-[10px] font-black text-white uppercase">48H Shipping</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Order Form */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent z-50">
                <ProductOrderForm
                    product={{
                        id: product.id,
                        name: product.name,
                        brand: product.brand,
                        sku: product.sku,
                        category: product.category,
                        image: product.image
                    }}
                    variants={product.variants.map(v => ({
                        id: v.id,
                        size: v.size,
                        price: v.price,
                        caseQty: v.caseQty
                    }))}
                />
            </div>
        </div>
    );
}
