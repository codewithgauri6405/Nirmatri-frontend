"use client";

import clsx from "clsx";
import type { Section } from "@/app/components/HeaderWrapper";

import { useRouter } from "next/navigation";
import {
  User,
  ShoppingBag,
  Heart,
  ShoppingCart,
  CreditCard,
  RefreshCcw,
  LogOut,
  ChevronRight,
  MapPin,

  Settings,


} from "lucide-react";

/* ===================== TYPES ===================== */

type AccountSidebarProps = {
  open: boolean;
  onClose: () => void;
  onSelect?: (section: Section) => void;
};



/* ===================== COMPONENT ===================== */

export default function AccountSidebar({
  open,
  onClose,
  onSelect,
}: AccountSidebarProps) {
  const router = useRouter();

  return (
    <>
      {/* ================= OVERLAY ================= */}
      {open && (
        <div
          className="
            fixed inset-0 z-[60]
            bg-black/40 backdrop-blur-sm
            lg:top-14
          "
          onClick={onClose}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={clsx(
          "fixed inset-0 z-[70]",
          "lg:inset-auto lg:right-0 lg:top-14 lg:bottom-0",
          "w-full lg:w-[330px]",
          "bg-white dark:bg-gray-900",
          "border-l border-gray-200 dark:border-gray-800",
          "shadow-[0_0_40px_rgba(0,0,0,0.18)]",
          "transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* ================= HEADER ================= */}
        <div
          className="
            h-14 px-5
            flex items-center justify-between
            border-b border-gray-200 dark:border-gray-800
          "
        >
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            My Account
          </h2>

          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="
              rounded-full p-2
              hover:bg-gray-100 dark:hover:bg-gray-800
              transition
            "
          >
            ✕
          </button>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="h-[calc(100%-3.5rem)] overflow-y-auto px-4 pb-6">
          {/* ================= USER CARD ================= */}
          <div
            className="
              flex items-center gap-4
              p-4 mt-4 rounded-2xl
              bg-gradient-to-br from-blue-50 to-purple-50
              dark:from-blue-900/30 dark:to-purple-900/30
            "
          >
            <div
              className="
                h-14 w-14 rounded-full
                bg-gradient-to-br from-blue-600 to-purple-600
                text-white
                flex items-center justify-center
                font-bold text-lg
                shadow-md
              "
            >
              RK
            </div>

            <div>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                Rahul Kumar
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                +91 98765 43210
              </p>
            </div>
          </div>

          {/* ================= MENU ================= */}
          <div className="mt-6 space-y-1">
            <MenuItem icon={<User />} label="My Profile" onClick={() => onSelect?.("profile")} />
            <MenuItem icon={<ShoppingBag />} label="My Orders" onClick={() => onSelect?.("orders")} />
            <MenuItem icon={<Heart />} label="Wishlist" onClick={() => onSelect?.("wishlist")} />
            <MenuItem icon={<ShoppingCart />} label="Cart" onClick={() => onSelect?.("cart")} />
            <MenuItem icon={<CreditCard />} label="Payments" onClick={() => onSelect?.("payments")} />
            <MenuItem icon={<RefreshCcw />} label="Returns & Refunds" onClick={() => onSelect?.("returns")} />
            <MenuItem icon={<MapPin />} label="Addresses" onClick={() => onSelect?.("addresses")} />
            <MenuItem icon={<Settings/>} label="Settings" onClick={() => onSelect?.("settingsSection")} />

          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
  <button
    type="button" // ⭐ MOST IMPORTANT
    onClick={(e) => {
      e.preventDefault(); // ⭐ safety

      // 🔐 AUTH CLEAR
      document.cookie = "loggedIn=; path=/; max-age=0";
      localStorage.removeItem("loggedIn"); // optional

      onClose();

      // 🔁 LANDING PAGE
      router.replace("/");
    }}
    className="
      w-full flex items-center gap-3
      px-4 py-3 rounded-xl
      hover:bg-red-50
      dark:hover:bg-red-900/20
      font-medium transition
    "
  >
    <LogOut className="h-4 w-4" />
    Logout
  </button>
</div>

        </div>
      </aside>
    </>
  );
}

/* ================= MENU ITEM ================= */

function MenuItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="
        group flex items-center justify-between
        px-4 py-3 rounded-xl
        cursor-pointer
        transition-all duration-200
        hover:bg-gray-100 dark:hover:bg-gray-800
      "
    >
      <div className="flex items-center gap-3 text-sm font-medium text-gray-800 dark:text-gray-200">
        <span className="text-gray-500 group-hover:text-blue-600 transition">
          {icon}
        </span>
        {label}
      </div>

      <ChevronRight className="h-4 w-4 opacity-40 group-hover:opacity-100" />
    </div>
    
  );
}