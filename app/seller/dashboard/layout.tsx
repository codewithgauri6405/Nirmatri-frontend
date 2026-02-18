"use client";

import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-gray-900 transition-colors">
      {/* ================= SIDEBAR (Enhanced Divider & Depth) ================= */}
      <aside className="w-64 bg-[#0F172A] dark:bg-gray-950 text-[#CBD5E1] hidden md:flex flex-col fixed h-screen z-50 border-r border-white/[0.06] shadow-[4px_0_24px_rgba(0,0,0,0.3)]">
        {/* Sidebar Header */}
        <div className="p-6">
          <Link href="/seller/dashboard" className="group">
            <h2 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
              Nirmatri Seller
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                Control Panel
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 space-y-1.5 mt-4 overflow-y-auto">
          <NavItem 
            href="/seller/dashboard" 
            label="Dashboard" 
            icon=""
            pathname={pathname}
            exact
          />
          <NavItem 
            href="/seller/dashboard/orders" 
            label="Orders" 
            icon=""
            pathname={pathname} 
          />
          <NavItem 
            href="/seller/dashboard/products" 
            label="Products" 
           icon=""
            pathname={pathname} 
          />
          <NavItem 
            href="/seller/dashboard/earnings" 
            label="Earnings" 
            icon=""
            pathname={pathname} 
          />
          <div className="pt-4 pb-2 px-4">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">System</p>
          </div>
          <NavItem 
            href="/seller/dashboard/profile" 
            label="Profile" 
            icon=""
            pathname={pathname} 
          />
          <NavItem 
            href="/seller/dashboard/settings" 
            label="Settings" 
           icon=""
            pathname={pathname} 
          />
        </nav>

        {/* Logout Section with clean divider */}
        <div className="p-4 mt-auto border-t border-white/[0.05]">
          <Link
            href="http://localhost:3000/"
            className="flex items-center gap-3 text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 px-4 py-3 rounded-xl transition-all duration-200"
          >
            <span>🚪</span>
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* ================= MAIN CONTENT (Enhanced Margin & Layout) ================= */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen relative">
        {/* Decorative Divider Seam (This makes the transition "attractive") */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent z-10" />

        {/* Mobile Header (Enhanced Glassmorphism) */}
        <header className="md:hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </Button>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Nirmatri</h2>
            <div className="w-8" />
          </div>

          {/* Mobile Nav with Animation */}
          {isMobileMenuOpen && (
            <div className="px-4 pb-6 space-y-1 animate-in slide-in-from-top duration-200">
               <MobileNavItem href="/seller/dashboard/orders" label="Orders" icon="📦" pathname={pathname} onClick={() => setIsMobileMenuOpen(false)} />
               <MobileNavItem href="/seller/dashboard/products" label="Products" icon="🏺" pathname={pathname} onClick={() => setIsMobileMenuOpen(false)} />
               <MobileNavItem href="/seller/dashboard/earnings" label="Earnings" icon="💰" pathname={pathname} onClick={() => setIsMobileMenuOpen(false)} />
               <MobileNavItem href="/seller/dashboard/profile" label="Profile" icon="👤" pathname={pathname} onClick={() => setIsMobileMenuOpen(false)} />
               <MobileNavItem href="/seller/dashboard/settings" label="Settings" icon="⚙️" pathname={pathname} onClick={() => setIsMobileMenuOpen(false)} />
               <Link href="/sellerauth/" className="flex items-center gap-3 px-4 py-4 text-red-500 font-semibold">
                 <span>🚪</span><span>Logout</span>
               </Link>
            </div>
          )}
        </header>

        {/* ================= PAGE CONTENT ================= */}
        <main className="flex-1">
          {children}
        </main>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </div>
  );
}

// Enhanced Desktop Nav Item with Active Glow
function NavItem({ href, label, icon, pathname, exact = false }: any) {
  const active = exact ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 relative ${
        active
          ? "bg-blue-600 text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)]"
          : "text-slate-400 hover:text-white hover:bg-white/5"
      }`}
    >
      <span className={`text-lg transition-transform duration-200 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
        {icon}
      </span>
      <span>{label}</span>
      {active && (
        <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-blue-200 shadow-[0_0_8px_white]" />
      )}
    </Link>
  );
}

function MobileNavItem({ href, label, icon, pathname, onClick, exact = false }: any) {
  const active = exact ? pathname === href : pathname.startsWith(href);
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all ${
        active ? "bg-blue-600 text-white shadow-lg" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-semibold">{label}</span>
    </Link>
  );
}