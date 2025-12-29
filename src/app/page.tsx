"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart, Truck, Search, Package, Clock, CheckCircle, Sparkles } from "lucide-react";
import AnimatedLogo from "@/components/AnimatedLogo";

export default function LandingPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white text-[#0D3B66] selection:bg-[#00A8E8]/20 selection:text-[#0D3B66]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-[#F8FAFC] to-white">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Animated gradient orbs */}
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-[#00A8E8]/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 30, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-40 right-20 w-96 h-96 bg-[#47B5E6]/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
              y: [0, -40, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Animated Wave SVG */}
          <motion.svg
            className="absolute bottom-0 left-0 w-full h-64"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00A8E8" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#47B5E6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#00A8E8" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            <motion.path
              fill="url(#waveGradient)"
              d="M0,224L48,208C96,192,192,160,288,154.7C384,149,480,171,576,186.7C672,203,768,213,864,197.3C960,181,1056,139,1152,128C1248,117,1344,139,1392,149.3L1440,160L1440,320L0,320Z"
              animate={{
                d: [
                  "M0,224L48,208C96,192,192,160,288,154.7C384,149,480,171,576,186.7C672,203,768,213,864,197.3C960,181,1056,139,1152,128C1248,117,1344,139,1392,149.3L1440,160L1440,320L0,320Z",
                  "M0,192L48,181.3C96,171,192,149,288,160C384,171,480,213,576,218.7C672,224,768,192,864,176C960,160,1056,160,1152,165.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L0,320Z",
                  "M0,224L48,208C96,192,192,160,288,154.7C384,149,480,171,576,186.7C672,203,768,213,864,197.3C960,181,1056,139,1152,128C1248,117,1344,139,1392,149.3L1440,160L1440,320L0,320Z",
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.svg>

          {/* Floating circles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full border-2 border-[#00A8E8]/30"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="relative z-20 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Animated Logo */}
            <div className="flex justify-center mb-8">
              <AnimatedLogo size="xl" />
            </div>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight text-[#0D3B66]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              Your Trusted <span className="text-[#00A8E8]">Wholesale</span> Partner
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-[#0D3B66]/70 mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.7 }}
            >
              Caribbean & Asian specialty foods delivered to NYC retailers since 1989.
              Browse 2,500+ SKUs and order in seconds.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.9 }}
            >
              <Link
                href="/home"
                className="group relative px-8 py-4 bg-[#00A8E8] hover:bg-[#0090C8] text-white font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#00A8E8]/30 overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
                <span className="relative flex items-center gap-2">
                  <Sparkles size={18} className="animate-pulse" />
                  START ORDERING
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                href="/home"
                className="px-8 py-4 bg-white border-2 border-[#0D3B66] hover:border-[#00A8E8] hover:text-[#00A8E8] font-bold rounded-xl transition-all group"
              >
                <span className="flex items-center gap-2">
                  BROWSE CATALOG
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 2.5, duration: 0.5 },
            y: { repeat: Infinity, duration: 2 }
          }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#00A8E8] pointer-events-none"
        >
          <div className="w-6 h-10 border-2 border-[#00A8E8]/50 rounded-full flex justify-center p-1">
            <motion.div
              className="w-1 h-2 bg-[#00A8E8] rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#F8FAFC] border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { label: "Active Brands", value: "40+", icon: "🏷️" },
              { label: "SKUs in Stock", value: "2,500+", icon: "📦" },
              { label: "Daily Deliveries", value: "100+", icon: "🚚" },
              { label: "Years Experience", value: "35", icon: "⭐" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="text-4xl mb-2"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  {stat.icon}
                </motion.div>
                <motion.div
                  className="text-3xl md:text-5xl font-black text-[#0D3B66] mb-2 group-hover:text-[#00A8E8] transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs md:text-sm font-bold uppercase tracking-widest text-[#0D3B66]/50">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#00A8E8]/5 to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight text-[#0D3B66]">
              How It <span className="text-[#00A8E8]">Works</span>
            </h2>
            <p className="text-[#0D3B66]/60 mb-16 max-w-xl mx-auto">
              Modern ordering with the trust you expect. Three simple steps to stock your shelves.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-[#00A8E8]/20 via-[#00A8E8] to-[#00A8E8]/20" />

            {[
              {
                icon: <Search className="text-white" size={28} />,
                title: "Browse Catalog",
                desc: "Filter by brand or category. Real-time stock counts always accurate.",
                step: "01"
              },
              {
                icon: <ShoppingCart className="text-white" size={28} />,
                title: "One-Click Add",
                desc: "Quick-add items to your cart. Smart suggestions based on history.",
                step: "02"
              },
              {
                icon: <Truck className="text-white" size={28} />,
                title: "Same-Day Ready",
                desc: "We process instantly. Digital invoices sent to your email.",
                step: "03"
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative p-8 bg-white border-2 border-[#E2E8F0] hover:border-[#00A8E8] rounded-2xl text-left transition-all duration-300 shadow-sm hover:shadow-xl group"
              >
                {/* Step number */}
                <span className="absolute -top-4 -right-4 w-10 h-10 bg-[#0D3B66] text-white text-sm font-bold rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  {step.step}
                </span>

                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-[#00A8E8] to-[#47B5E6] rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-[#00A8E8]/20"
                  whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                >
                  {step.icon}
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-[#0D3B66] group-hover:text-[#00A8E8] transition-colors">{step.title}</h3>
                <p className="text-[#0D3B66]/60 leading-relaxed text-sm">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[#F8FAFC] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight text-[#0D3B66]">
              Why <span className="text-[#00A8E8]">Retailers</span> Choose Us
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Package size={24} />, title: "Wide Selection", desc: "40+ brands, 2,500+ products" },
              { icon: <Clock size={24} />, title: "Fast Delivery", desc: "Same-day processing" },
              { icon: <CheckCircle size={24} />, title: "Quality Assured", desc: "Authentic products only" },
              { icon: <Truck size={24} />, title: "Reliable Service", desc: "35 years of trust" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i < 2 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex items-start gap-4 p-6 bg-white rounded-xl border border-[#E2E8F0] hover:border-[#00A8E8] transition-all shadow-sm hover:shadow-lg group cursor-pointer"
              >
                <motion.div
                  className="text-[#00A8E8] mt-1 p-2 bg-[#00A8E8]/10 rounded-lg group-hover:bg-[#00A8E8] group-hover:text-white transition-all"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {item.icon}
                </motion.div>
                <div>
                  <h4 className="font-bold text-[#0D3B66] mb-1 group-hover:text-[#00A8E8] transition-colors">{item.title}</h4>
                  <p className="text-sm text-[#0D3B66]/60">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#0D3B66] via-[#1a4f7a] to-[#0D3B66] relative overflow-hidden">
        {/* Animated background */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle at 20% 50%, #00A8E8 1px, transparent 1px), radial-gradient(circle at 80% 50%, #47B5E6 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <Sparkles className="text-[#00A8E8] w-12 h-12" />
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Ready to Stock Your Shelves?
            </h2>
            <p className="text-white/70 mb-10 max-w-xl mx-auto text-lg">
              Join 500+ NYC retailers who trust Salmo Corp for authentic Caribbean & Asian specialty foods.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/home"
                className="inline-flex items-center gap-3 px-10 py-5 bg-[#00A8E8] hover:bg-[#47B5E6] text-white font-bold rounded-xl transition-all shadow-2xl shadow-[#00A8E8]/30 text-lg"
              >
                Get Started Today
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ArrowRight size={22} />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#0D3B66] text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <motion.div
              className="flex items-center justify-center md:justify-start gap-3 mb-3"
              whileHover={{ scale: 1.05 }}
            >
              <Image
                src="/salmo-logo.png"
                alt="Salmo Catalog"
                width={140}
                height={70}
                className="object-contain brightness-0 invert"
              />
            </motion.div>
            <p className="text-white/60 text-sm">© {new Date().getFullYear()} Salmo Corp Imports. Jamaica, NY.</p>
          </div>
          <div className="flex gap-8 text-sm font-bold text-white/80 uppercase tracking-widest">
            {["Terms", "Contact", "Help"].map((link) => (
              <motion.a
                key={link}
                href="#"
                className="hover:text-[#00A8E8] transition-colors"
                whileHover={{ y: -2 }}
              >
                {link}
              </motion.a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
