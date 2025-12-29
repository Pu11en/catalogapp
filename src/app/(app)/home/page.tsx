import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function HomePage() {
    const featuredProducts = await prisma.product.findMany({
        where: { isFeatured: true },
        include: { variants: true },
        take: 4
    });

    const newArrivals = await prisma.product.findMany({
        where: { isNew: true },
        include: { variants: true },
        take: 4
    });

    return (
        <div className="p-8">
            <h1 className="text-4xl font-black tracking-tighter mb-10 leading-none">FRESH FROM<br /><span className="text-teal-400 font-black">THE ISLANDS</span></h1>

            <section className="mb-12">
                <h2 className="text-xl font-bold mb-6">Featured This Week</h2>
                <div className="flex gap-4 overflow-x-auto pb-4 -mx-8 px-8 no-scrollbar">
                    {featuredProducts.map((product) => (
                        <Link key={product.id} href={`/product/${product.id}`} className="min-w-[160px] bg-slate-900 border border-slate-800 p-4 rounded-2xl block hover:border-teal-500/30 transition-all">
                            <div className="w-full aspect-square bg-slate-800 rounded-xl mb-3 overflow-hidden relative">
                                {product.image && (
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-contain p-2"
                                    />
                                )}
                            </div>
                            <h3 className="font-bold text-sm mb-1 tracking-tight truncate uppercase">{product.name}</h3>
                            <p className="text-teal-400 font-bold">${product.variants[0]?.price.toFixed(2) || '0.00'}</p>
                        </Link>
                    ))}
                    {featuredProducts.length === 0 && <p className="text-slate-500 text-xs">No featured items yet.</p>}
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-xl font-bold mb-6">New Arrivals</h2>
                <div className="flex gap-4 overflow-x-auto pb-4 -mx-8 px-8 no-scrollbar">
                    {newArrivals.map((product) => (
                        <Link key={product.id} href={`/product/${product.id}`} className="min-w-[160px] bg-slate-900 border border-slate-800 p-4 rounded-2xl block hover:border-teal-500/30 transition-all">
                            <div className="w-full aspect-square bg-slate-800 rounded-xl mb-3 overflow-hidden relative">
                                {product.image && (
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-contain p-2"
                                    />
                                )}
                            </div>
                            <h3 className="font-bold text-sm mb-1 tracking-tight truncate uppercase">{product.name}</h3>
                            <p className="text-teal-400 font-bold">${product.variants[0]?.price.toFixed(2) || '0.00'}</p>
                        </Link>
                    ))}
                    {newArrivals.length === 0 && <p className="text-slate-500 text-xs">No new arrivals yet.</p>}
                </div>
            </section>
        </div>
    );
}
