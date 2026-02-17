"use client";

import { useEffect, useState } from "react";
import { Header } from "@/app/components/Header";
import dynamic from "next/dynamic";

const AccountSidebar = dynamic(
  () => import("@/app/components/AccountSidebar"),
  { ssr: false }
);

const LeftPanel = dynamic(
  () => import("@/app/components/LeftPanel"),
  { ssr: false }
);




/* ===================== SECTIONS ===================== */
import { MyProfileSection } from "@/app/components/userprofile/sections/MyProfileSection";
import { OrdersSection } from "@/app/components/userprofile/sections/OrdersSection";
import { AddressesSection } from "@/app/components/userprofile/sections/AddressesSection";
import { WishlistSection } from "@/app/components/userprofile/sections/WishlistSection";
import { CartSection } from "@/app/components/userprofile/sections/CartSection";
import { PaymentsSection } from "@/app/components/userprofile/sections/PaymentsSection";
import { ReturnsSection } from "@/app/components/userprofile/sections/ReturnsSection";
import { NotificationsSection } from "@/app/components/userprofile/sections/NotificationsSection";
import { SupportSection } from "@/app/components/userprofile/sections/SupportSection";
import { SettingsSection } from "@/app/components/userprofile/sections/SettingsSection";

/* ===================== TYPES ===================== */
export type Section =
  | "profile"
  | "orders"
  | "addresses"
  | "wishlist"
  | "cart"
  | "payments"
  | "returns"
  | "notifications"
  | "support"
  | "settingsSection";

/* ===================== COMPONENT ===================== */
export default function HeaderWrapper() {
  const [menuOpen, setMenuOpen] = useState(false);   // Sidebar open
  const [panelOpen, setPanelOpen] = useState(false); // Right panel open
  const [section, setSection] = useState<Section>("profile");

  /* 🔒 BODY SCROLL LOCK */
  useEffect(() => {
    document.body.style.overflow =
      menuOpen || panelOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, panelOpen]);

  /* ===================== SECTION RENDER ===================== */
  const renderSection = () => {
    switch (section) {
      case "orders":
        return <OrdersSection />;
      case "addresses":
        return <AddressesSection />;
      case "wishlist":
        return <WishlistSection />;
      case "cart":
        return <CartSection />;
      case "payments":
        return <PaymentsSection />;
      case "returns":
        return <ReturnsSection />;
      case "notifications":
        return <NotificationsSection />;
      case "support":
        return <SupportSection />;
      case "settingsSection":
        return <SettingsSection />;
      default:
        return <MyProfileSection />;
    }
  };
  

  /* 🔥 DEVICE CHECK */
  const isMobile = () => window.innerWidth < 1024; // lg breakpoint

  return (
    <>
      {/* ================= HEADER ================= */}
      <Header onUserClick={() => setMenuOpen((prev) => !prev)} />

      {/* ================= SIDEBAR ================= */}
      <AccountSidebar
        open={menuOpen}
        onClose={() => {
          setMenuOpen(false);
          setPanelOpen(false);
        }}
        onSelect={(sec) => {
  setSection(sec);        // ✅ ab error nahi
  setPanelOpen(true);


          // 📱 Mobile → sidebar close
          if (isMobile()) {
            setMenuOpen(false);
          }
        }}
      />

      {/* ================= RIGHT PANEL ================= */}
      <LeftPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
      >
        {renderSection()}
      </LeftPanel>
    </>
  );
}