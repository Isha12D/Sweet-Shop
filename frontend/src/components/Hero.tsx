import { useState, useEffect } from "react";
import vid1 from '../assets/vid1.mp4';
import sweet1 from '../assets/sweet1.png';
import sweet2 from '../assets/sweet2.png';
import sweet3 from '../assets/sweet3.png';


// REMOVE SLIDES IF YOU DON'T NEED THEM NOW

export default function Hero() {
  const [loading, setLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  // HIDE LOADER AFTER 2 SECONDS → SHOW VIDEO
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
        <div className="flex gap-4">
            <img
                src={sweet1}
                className="w-12 h-12 rounded-full shadow-lg border-2 border-white bounce1"
            />

            <img
                src={sweet2}
                className="w-12 h-12 rounded-full shadow-lg border-2 border-white bounce2"
            />

            <img
                src={sweet3}
                className="w-12 h-12 rounded-full shadow-lg border-2 border-white bounce3"
            />

            <p className="mt-5 text-xl font-semibold text-orange-700 animate-pulse">
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
            onEnded={() => setShowVideo(false)}
            className="w-full h-full object-cover"
          >
            <source src={vid1} />
          </video>

          {/* TEXT ON VIDEO */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white text-3xl md:text-5xl font-bold bg-black/40 px-6 py-3 rounded-xl backdrop-blur">
              Welcome to Our Sweet World 🍬
            </h1>
          </div>
        </div>
      )}

      {/* ---------------------- AFTER VIDEO (KEEP EMPTY FOR NOW) ---------------------- */}
      {!loading && !showVideo && (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <h1 className="text-4xl font-bold">Sweet Section Coming… 🍭</h1>
        </div>
      )}

    </section>
  );
}