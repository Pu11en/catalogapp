"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart, Truck, ShieldCheck, Star, Search } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-950 text-slate-50 selection:bg-teal-500/30 selection:text-teal-200">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image / Placeholder */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/80 to-slate-950 z-10" />
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1547517023-7ca0c162f816?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-60 scale-105" />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-teal-500/10 text-teal-400 border border-teal-500/20 rounded-full">
              Established 1989 • Jamaica, NY
            </span>
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
              QUALITY <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500">CARIBBEAN</span> & ASIAN WHOLESALE
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
              Join 500+ NYC retailers who trust Salmo Corp for authentic island flavors.
              Sub-100ms ordering, zero calls, instant fulfillment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/home"
                className="group relative px-8 py-4 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-teal-500/20 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span className="flex items-center gap-2">
                  START ORDERING <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                href="/home"
                className="px-8 py-4 bg-slate-900 border border-slate-800 hover:border-slate-700 font-bold rounded-xl transition-all hover:bg-slate-800"
              >
                BROWSE CATALOG
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 pointer-events-none"
        >
          <div className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-teal-500 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-slate-900 bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { label: "Active Brands", value: "40+" },
              { label: "SKUs in Stock", value: "2,500+" },
              { label: "Daily Deliveries", value: "100+" },
              { label: "Years Experience", value: "35" },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-3xl md:text-5xl font-black text-white mb-2 group-hover:text-teal-400 transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-slate-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-32 relative">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-16 tracking-tight">MODERN ORDERING, <span className="text-teal-500">TRADITIONAL TRUST.</span></h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Search className="text-teal-400" size={32} />,
                title: "Browse Catalog",
                desc: "Filter by brand or category. Real-time stock counts always accurate."
              },
              {
                icon: <ShoppingCart className="text-emerald-400" size={32} />,
                title: "One-Click Add",
                desc: "Quick-add items to your cart. Smart suggestions based on history."
              },
              {
                icon: <Truck className="text-teal-500" size={32} />,
                title: "Same-Day Ready",
                desc: "We process instantly. Digital invoices sent to your email."
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl text-left hover:border-teal-500/30 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-12 px-6 border-t border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-black tracking-tighter mb-2">FLAVOR<span className="text-teal-500 font-medium">FLOW</span></h3>
            <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Salmo Corp Imports. All island flavors secured.</p>
          </div>
          <div className="flex gap-6 text-sm font-bold text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-teal-500">Terms</a>
            <a href="#" className="hover:text-teal-500">Contact</a>
            <a href="#" className="hover:text-teal-500">Help</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
