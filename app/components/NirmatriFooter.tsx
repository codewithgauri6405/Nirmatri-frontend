"use client";

import { useState } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Loader2,
} from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

const footerLinks = {
  Shop: ["All Products", "Handmade Clothes", "Crochet Work", "Pottery", "Textiles", "New Arrivals"],
  About: ["Our Story", "Meet the Artisans", "Impact Report", "Blog", "Careers", "Press"],
  Support: ["Help Center", "Shipping Info", "Returns", "Track Order", "Size Guide", "FAQs"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Seller Terms"],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function NirmatriFooter() {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);

    // fake API call – replace with real newsletter API
    await new Promise((res) => setTimeout(res, 2000));

    setLoading(false);
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 transition-colors duration-300">
      {/* Newsletter */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl text-white mb-2">Stay Connected</h3>
              <p className="text-white/90">
                Get updates on new artisan stories and exclusive deals
              </p>
            </div>

            <div className="flex gap-2 w-full md:w-auto max-w-md">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/90 border-none"
              />

              {/* 🔥 SUBSCRIBE BUTTON WITH SPINNER */}
              <Button
                onClick={handleSubscribe}
                disabled={loading}
                className="
                  bg-gray-900 text-white px-6 min-w-[140px]
                  transition-all duration-300 ease-out
                  hover:bg-gray-800
                  hover:-translate-y-1
                  hover:scale-[1.03]
                  hover:shadow-2xl hover:shadow-black/30
                  active:translate-y-0
                  active:scale-100
                  disabled:opacity-80 disabled:cursor-not-allowed
                "
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Subscribing
                  </span>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2">
              <h3 className="text-3xl bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent mb-4">
                Nirmatri
              </h3>
              <p className="text-sm mb-6">
                Empowering women artisans through sustainable, handmade crafts.
                Every purchase creates opportunity.
              </p>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span>support@nirmatri.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-400" />
                  <span>+91 1800-123-4567</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-blue-400 mt-1" />
                  <span>
                    123 Artisan Street, Craft District,
                    <br />
                    Mumbai, Maharashtra 400001
                  </span>
                </div>
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-white mb-4">{category}</h4>
                <ul className="space-y-2 text-sm">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-blue-400 transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-900 transition-colors"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>

              <p className="text-sm text-gray-400">
                © 2026 Nirmatri. Crafted with ❤️ for artisans.
              </p>

              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>We Accept:</span>
                <div className="flex gap-2">
                  <div className="bg-white rounded px-2 py-1 text-gray-900">VISA</div>
                  <div className="bg-white rounded px-2 py-1 text-gray-900">UPI</div>
                  <div className="bg-white rounded px-2 py-1 text-gray-900">COD</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
