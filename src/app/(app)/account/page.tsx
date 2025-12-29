import React from "react";
import { User, Mail, MapPin, Settings, LogOut, ChevronRight, HelpCircle, Shield } from "lucide-react";

export default function AccountPage() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-black tracking-tighter mb-8">ACCOUNT</h1>

            {/* Profile Card */}
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-[40px] mb-10 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                <div className="relative z-10 flex items-center gap-6">
                    <div className="w-20 h-20 bg-slate-800 border border-slate-700 rounded-3xl flex items-center justify-center text-teal-400 font-black text-2xl shadow-xl">
                        S
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tight mb-1">SALMO CORP</h2>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-1.5">
                            <Mail size={12} className="text-teal-500/50" /> salmoimports@gmail.com
                        </p>
                    </div>
                </div>
            </div>

            {/* Menu List */}
            <div className="space-y-2 mb-10">
                {[
                    { icon: <User size={20} className="text-blue-400" />, label: "Business Profile" },
                    { icon: <MapPin size={20} className="text-rose-400" />, label: "Delivery Addresses" },
                    { icon: <Shield size={20} className="text-emerald-400" />, label: "Privacy & Security" },
                    { icon: <Settings size={20} className="text-slate-400" />, label: "Preferences" },
                    { icon: <HelpCircle size={20} className="text-amber-400" />, label: "Help & Support" },
                ].map((item, i) => (
                    <button key={i} className="w-full flex items-center justify-between p-5 bg-slate-900/40 border border-slate-900 hover:border-slate-800 hover:bg-slate-900/60 transition-all rounded-3xl group">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                            <span className="text-sm font-bold tracking-tight">{item.label}</span>
                        </div>
                        <ChevronRight size={18} className="text-slate-600 group-hover:translate-x-1 transition-transform" />
                    </button>
                ))}
            </div>

            <button className="w-full p-5 bg-slate-900/20 border border-slate-900 hover:bg-rose-500/5 hover:border-rose-500/20 text-slate-500 hover:text-rose-400 font-bold rounded-3xl transition-all flex items-center gap-4 mb-20 group">
                <div className="w-10 h-10 bg-slate-900/40 border border-slate-800 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                    <LogOut size={18} />
                </div>
                <span className="text-sm uppercase tracking-widest font-black">Sign Out</span>
            </button>

            <div className="text-center">
                <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em]">FlavorFlow v1.0.4</p>
            </div>
        </div>
    );
}
