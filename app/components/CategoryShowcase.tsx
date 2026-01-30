"use client";

import { useState, useRef, useEffect } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { ArrowRight, SlidersHorizontal } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Handmade Clothes",
    image: "https://images.unsplash.com/photo-1568371600021-36b968768c30",
    count: "250+ items",
  },
  {
    id: 2,
    name: "Crochet Work",
    image: "https://images.unsplash.com/photo-1612208141706-2fbd2d45a143",
    count: "180+ items",
  },
  {
    id: 3,
    name: "Pottery & Ceramics",
    image: "https://images.unsplash.com/photo-1611152171907-886a565484b5",
    count: "120+ items",
  },
  {
    id: 4,
    name: "Handwoven Textiles",
    image: "https://images.unsplash.com/photo-1748141951488-9c9fb9603daf",
    count: "200+ items",
  },
];

export function CategoryShowcase() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // close filter on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered =
    activeFilter === "All"
      ? categories
      : categories.filter((c) => c.name === activeFilter);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl dark:text-gray-100">
            Shop by Category
          </h2>

          <a
            href="#"
            className="text-blue-900 dark:text-blue-400 flex items-center gap-1 text-sm hover:gap-2 transition-all"
          >
            View More <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* 🔹 MINI EXPANDABLE FILTER */}
        <div className="relative mb-8" ref={ref}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm dark:border-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
          >
            <SlidersHorizontal size={16} />
            {activeFilter}
          </button>

          {open && (
            <div className="absolute z-20 mt-3 bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl shadow-lg p-2 flex flex-wrap gap-2 w-max max-w-full">
              {["All", ...categories.map((c) => c.name)].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveFilter(cat);
                    setOpen(false);
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm transition
                    ${
                      activeFilter === cat
                        ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((category) => (
            <a
              key={category.id}
              href="#"
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all hover:-translate-y-2"
            >
              <div className="aspect-square relative">
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-lg">{category.name}</h3>
                <p className="text-sm opacity-90">{category.count}</p>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
