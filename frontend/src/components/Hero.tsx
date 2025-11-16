import { useState, useEffect } from "react";
import vid1 from '../assets/vid1.mp4';
import sweet1 from '../assets/sweet1.png';
import sweet2 from '../assets/sweet2.png';
import sweet3 from '../assets/sweet3.png';

export default function Hero() {
  const [loading, setLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(false);
      setShowVideo(true);
    }, 2000);

    return () => clearTimeout(t);
  }, []);

  return (
    <section className="h-screen w-full relative bg-amber-100 flex items-center justify-center">

      {/* ---------------------- LOADER ---------------------- */}
      {loading && (
        <div className="flex flex-col items-center">
          {/* Jumping sweets */}
          <div className="flex gap-4 mb-3">
            <img src={sweet1} className="w-12 h-12 rounded-full shadow-lg border-2 border-white bounce1" />
            <img src={sweet2} className="w-12 h-12 rounded-full shadow-lg border-2 border-white bounce2" />
            <img src={sweet3} className="w-12 h-12 rounded-full shadow-lg border-2 border-white bounce3" />
          </div>

          {/* Preparing text BELOW the sweets */}
          <p className="text-xl font-semibold text-orange-700 animate-pulse tracking-wide">
            Preparing sweets...
          </p>
        </div>
      )}

      {/* ---------------------- VIDEO SECTION ---------------------- */}
      {showVideo && (
        <div className="absolute inset-0 w-full h-full z-40">
          <video
            autoPlay
            muted
            playsInline
            // onEnded={() => setShowVideo(false)}
            loop
            className="w-full h-full object-cover"
          >
            <source src={vid1} />
          </video>

          {/* TEXT ON VIDEO */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-black/40 backdrop-blur-lg px-5 py-4 rounded-xl max-w-lg text-center">
              <h1 className="text-white text-2xl md:text-3xl font-bold mb-3">
                Welcome to Our Sweet World 🍬
              </h1>

              <p className="text-white text-sm md:text-base leading-relaxed">
                Handcrafted with love using pure and natural ingredients.  
                Inspired by traditional recipes passed through generations.  
                Freshly prepared, hygienic, and made to perfection for every celebration.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------- AFTER VIDEO ---------------------- */}
      {!loading && !showVideo && (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <h1 className="text-4xl font-bold text-orange-700">
            Sweet Section Coming… 🍭
          </h1>
        </div>
      )}

    </section>
  );
}
