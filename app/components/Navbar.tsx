"use client";

import { Search, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { ThemeToggle } from "@/app/components/ThemeToggle";

type Props = {
  onUserClick: () => void;
};

export function Navbar({ onUserClick }: Props) {
  const [showTopBar, setShowTopBar] = useState(true);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const pathname = usePathname();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowTopBar(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setMobileSearchOpen(false);
  }, [pathname]);

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
    <header
      className="
        sticky top-0 z-[100]
        backdrop-blur-xl

        bg-gradient-to-r
        from-[#CF9893]/30 via-white/70 to-[#6968A6]/30

        dark:bg-gradient-to-r
        dark:from-gray-900
        dark:to-gray-900

        border-b border-[#6968A6]/20
        dark:border-white/15

      
      "
    >
      {/* TOP BAR */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          showTopBar ? "max-h-10" : "max-h-0"
        }`}
      >
        <div className="bg-gradient-to-r from-[#CF9893] via-[#6968A6] to-[#085078] text-white text-center text-xs py-2 tracking-wide">
          Where tradition is handcrafted into elegance
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <div className="h-14">
        <div className="max-w-7xl mx-auto h-full px-4 flex items-center gap-3">
          {/* LOGO */}
          <Link href="/" className="flex-shrink-0">
            <img
              src="/bgnirmatri.png"
              alt="Nirmatri Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* SEARCH */}
          <div className="hidden md:flex flex-1 justify-center">
            <form action="/search" className="relative w-full max-w-xl">
              <Input
                name="q"
                type="search"
                placeholder="Search handcrafted products..."
                className="
                  w-full h-10 pl-5 pr-12 rounded-full
                  bg-white/95
                  dark:bg-white/90
                  text-gray-900
                  placeholder:text-gray-500
                  border border-[#6968A6]/20
                  dark:border-white/30
                  focus:ring-2 focus:ring-[#6968A6]/40
                "
              />
              <Button
                size="icon"
                type="submit"
                className="
                  absolute right-1 top-1/2 -translate-y-1/2
                  h-8 w-8 rounded-full
                  bg-gradient-to-br from-[#6968A6] to-[#085078]
                  shadow-md
                "
              >
                <Search className="h-4 w-4 text-white" />
              </Button>
            </form>
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-2 ml-auto">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setMobileSearchOpen((p) => !p)}
            >
              <Search className="h-6 w-6" />
            </Button>

            <ThemeToggle />

            <Button
              variant="ghost"
              size="icon"
              onClick={onUserClick}
              className="
                rounded-full
                border border-[#6968A6]/30
                dark:border-white/40
                hover:bg-white/20
                transition-all
              "
            >
              <User className="h-5 w-5 text-gray-900 dark:text-white" />
            </Button>
          </div>
        </div>
      </div>

      {/* MOBILE SEARCH */}
      <div
        ref={searchRef}
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileSearchOpen ? "max-h-20 px-4 pb-4" : "max-h-0"
        }`}
      >
        <form action="/search" className="flex gap-2">
          <Input
            autoFocus
            name="q"
            type="search"
            placeholder="Search products..."
            className="
              flex-1 h-11 rounded-full
              bg-white/95
              border border-white/30
              text-gray-900
            "
          />
          <Button
            size="icon"
            type="submit"
            className="bg-gradient-to-br from-[#6968A6] to-[#085078]"
          >
            <Search className="h-4 w-4 text-white" />
          </Button>
        </form>
      </div>
    </header>
  );
}