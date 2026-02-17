import { useState, useEffect } from "react";

import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

const slides = [
  {
    id: 1,
    image: "/workingplace.png", // Pottery/Craft focus
    title: "Hand-Molded With Love",
    subtitle: "Authentic pottery and home decor crafted by local women artisans.",
    // cta: "View Collection",
    tag: "ARTISANAL POTTERY",
    color: "from-orange-900/80"
  },
  {
    id: 2,
    image: "/women_achar_papad_photo.jpeg", // Food/Pickle focus
    title: "The Taste of Tradition",
    subtitle: "Homemade pickles, papads, and organic spices from grandmother's recipes.",
    // cta: "Explore Pantry",
    tag: "HOMEMADE FOOD",
    color: "from-emerald-900/80"
  },
  {
    id: 3,
    image: "/boutique.png", // Crochet/Bouquet focus
    title: "Threads That Empower",
    subtitle: "Intricate crochet bouquets and handmade clothes that tells a story.  ",
    // cta: "Shop Apparel",
    tag: "HAND-KNITTED",
    color: "from-rose-900/80"
  },
];

export function VideoLikeCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [isPaused]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[300px] md:h-[300px] overflow-hidden bg-[#FAF9F6]">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide 
              ? "opacity-100 scale-100 translate-x-0" 
              : "opacity-0 scale-105 translate-x-4"
          }`}
        >
          <ImageWithFallback
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center grayscale-[20%] sepia-[10%]"
          />
          
          {/* Enhanced "Warm Organic" Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} via-black/20 to-transparent`} />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
              <div className="max-w-2xl space-y-8">
                {/* Artisanal Tag */}
                <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left duration-700">
                  <div className="h-[2px] w-8 bg-amber-400" />
                  <span className="text-amber-400 text-xs md:text-sm font-black tracking-[0.3em] uppercase">
                    {slide.tag}
                  </span>
                </div>

                {/* Title with Serif feel */}
                <h2 className="text-5xl md:text-7xl lg:text-8xl text-white font-serif leading-tight drop-shadow-md">
                  {slide.title}
                </h2>

                {/* Subtitle */}
                <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed font-light">
                  {slide.subtitle}
                </p>

                {/* Thematic CTAs */}
                <div className="flex flex-wrap gap-5 pt-4">
                  {/* <Button 
                    size="lg" 
                    className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-10 py-7 text-lg font-bold shadow-xl shadow-amber-900/40 transition-all duration-300 hover:scale-105"
                  >
                    {slide.cta}
                  </Button> */}
                  
                  {/* <button 
                    className="group flex items-center gap-4 text-white hover:text-amber-400 transition-colors"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                    <div className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-amber-400 transition-all bg-white/10 backdrop-blur-sm">
                      <Play className="fill-white group-hover:fill-amber-400 transition-all h-5 w-5 ml-1" />
                    </div>
                    <span className="font-bold tracking-wider uppercase text-sm">Meet the Artisan</span>
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Decorative "Community" Label */}
      <div className="absolute top-10 right-10 hidden lg:flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-white text-xs font-bold">
        <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
        <span>SUPPORTING 150+ WOMEN ARTIANS</span>
      </div>

      {/* Navigation Arrows (Artisanal Style) */}
      <div className="absolute bottom-12 right-12 flex gap-4 z-20">

    
        <Button
          onClick={prevSlide}
          className="bg-white/10 backdrop-blur-md hover:bg-amber-600 text-white p-4 rounded-full border border-white/20 transition-all duration-300"
        >
          <ChevronLeft className="h-5 w-5" />

      

        
        </Button>

        <Button
          onClick={nextSlide}
          className="bg-white/10 backdrop-blur-md hover:bg-amber-600 text-white p-4 rounded-full border border-white/20 transition-all duration-300"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>


      {/*
            ))}
         </div>
         <span className="text-white font-serif text-xl opacity-30">0{slides.length}</span>
      </div>

      {/* Modern Number Indicators */}
      {/* <div className="absolute bottom-12 left-12 flex items-center gap-6 z-20">
         <span className="text-white font-serif text-4xl italic opacity-50">0{currentSlide + 1}</span>
         <div className="flex gap-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-1 transition-all duration-500 rounded-full ${
                  index === currentSlide ? "bg-amber-500 w-12" : "bg-white/30 w-4"
                }`}
              />
            ))}
         </div>
         <span className="text-white font-serif text-xl opacity-30">0{slides.length}</span>
      </div> */}




      {/* Progress Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
        <div 
          className="h-full bg-black-500 transition-all duration-100 linear"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </section>
  );
}