"use client";

import { Search, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { ThemeToggle } from "@/app/components/ThemeToggle";

export function Navbar() {
  const [showTopBar, setShowTopBar] = useState(true);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const pathname = usePathname();
  const searchRef = useRef<HTMLDivElement>(null);

  // Auto-hide top bar
  useEffect(() => {
    const timer = setTimeout(() => setShowTopBar(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Route change → close search (Shop / any page)
  useEffect(() => {
    setMobileSearchOpen(false);
  }, [pathname]);

  // ✅ Outside click → close search
  // ❌ BUT: click inside search should NOT close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileSearchOpen &&
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setMobileSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileSearchOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      {/* TOP BAR */}
      <div
        className={`overflow-hidden transition-all duration-700 ${
          showTopBar ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-2 px-4 text-center text-sm">
          Where tradition is handcrafted into elegance
        </div>
      </div>

      {/* MAIN NAV */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          {/* LOGO */}
          <Link href="/">
            <img
              src="/bgnirmatri.png"
              alt="Nirmatri Logo"
              className="h-14 w-auto object-contain"
            />
          </Link>

          {/* DESKTOP SEARCH */}
          <div className="hidden md:flex flex-1 justify-center">
            <form action="/search" className="relative w-full max-w-xl">
              <Input
                name="q"
                type="search"
                placeholder="Search handcrafted products..."
                className="w-full h-12 pl-5 pr-12 rounded-full border"
              />
              <Button
                size="icon"
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-blue-900"
              >
                <Search className="h-4 w-4 text-white" />
              </Button>
            </form>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2 ml-auto">
            {/* 🔍 MOBILE SEARCH TOGGLE */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileSearchOpen((p) => !p)}
            >
              <Search className="h-6 w-6" />
            </Button>

            <ThemeToggle />

            <Link href="/userdashboard">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border"
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* ✅ MOBILE SEARCH BAR */}
        <div
          ref={searchRef}
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileSearchOpen ? "max-h-20 mt-4" : "max-h-0"
          }`}
        >
          <form action="/search" className="flex gap-2">
            <Input
              autoFocus
              name="q"
              type="search"
              placeholder="Search products..."
              className="flex-1 h-11 rounded-full"
            />
            <Button size="icon" type="submit">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
