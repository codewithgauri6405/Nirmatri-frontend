import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { MapPin, Award, Heart } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";



export function ArtisanSpotlight() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50 dark:from-gray-950 dark:to-gray-990 transition-colors duration-300">
     
        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-920 to-blue-810 rounded-2xl p-8 md:p-12 text-black text-center">
<Heart className="h-12 w-12 mx-auto mb-4 fill-red-400 text-orange-500" />
          <h3 className="text-2xl md:text-3xl mb-4">Your Purchase Makes a Difference</h3>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Every item you buy directly supports local women artisans and helps preserve traditional crafts for future generations.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="
              bg-white text-blue-900
              transition-all duration-300
               hover:bg-gray-100
                hover:px-8" 
          >
            Learn About Our Impact →
          </Button>

        </div>

    </section>
  );
}