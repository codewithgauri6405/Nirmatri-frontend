"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-[#F8FAFC]">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-[#0F172A] text-[#CBD5E1] p-6 hidden md:flex flex-col">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white">
            Nirmatri Seller
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Seller Control Panel
          </p>
        </div>

        <nav className="space-y-1 text-sm flex-1">
          <NavItem href="/sellerdashboard/orders" label="Orders" pathname={pathname} />
          <NavItem href="/sellerdashboard/products" label="Products" pathname={pathname} />
          <NavItem href="/sellerdashboard/earnings" label="Earnings" pathname={pathname} />
          <NavItem href="/sellerdashboard/profile" label="Profile" pathname={pathname} />
          <NavItem href="/sellerdashboard/settings" label="Settings" pathname={pathname} />
        </nav>

        <Link
          href="/sellerauth/logout"
          className="text-sm text-red-400 hover:text-red-300"
        >
          Logout
        </Link>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

function NavItem({
  href,
  label,
  pathname,
}: {
  href: string;
  label: string;
  pathname: string;
}) {
  const active = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`block rounded-lg px-4 py-2 transition
        ${
          active
            ? "bg-[#1D4ED8] text-white"
            : "hover:bg-slate-800 hover:text-white"
        }`}
    >
      {label}
    </Link>
  );
}
