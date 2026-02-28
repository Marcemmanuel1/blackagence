/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/refs */
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRef, useState, useEffect } from "react";
import { FaArrowRight, FaCalendarAlt, FaPaintBrush, FaGlobe } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa6";

// Hook personnalisé pour détecter la visibilité d'un élément
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null!);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

const categories = [
  {
    id: "evenements",
    href: "/evenements",
    icon: <FaCalendarAlt className="text-5xl md:text-6xl text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform duration-500" />,
    label: "ÉVÉNEMENTS",
    description:
      "Organisation, couverture et mise en scène d'événements d'entreprise, lancements de produits, galas et conférences. Chaque projet raconte une histoire unique.",
    image: "/gallerie-quatre.png",
    accent: "from-neutral-900/90 to-neutral-900/60",
  },
  {
    id: "design-graphique",
    href: "/design-graphique",
    icon: <FaPaintBrush className="text-5xl md:text-6xl text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform duration-500" />,
    label: "DESIGN GRAPHIQUE",
    description:
      "Création d’affiches, identités visuelles, flyers et supports de communication modernes qui valorisent votre image de marque.",
    image: "/realisation-trois.png",
    accent: "from-neutral-900/90 to-neutral-900/60",
  },
  {
    id: "applications-web-mobile",
    href: "/applications-web-mobile",
    icon: <FaGlobe className="text-5xl md:text-6xl text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform duration-500" />,
    label: "APPLICATIONS WEB & MOBILE",
    description:
      "Développement de sites vitrines, e-commerce et plateformes web sur mesure, optimisés SEO et pensés pour une expérience utilisateur irréprochable.",
    image: "/realisation-un.webp",
    accent: "from-neutral-900/90 to-neutral-900/60",
  },
  {
    id: "gestion-reseaux-sociaus",
    href: "/gestion-reseaux-sociaus",
    icon: (
      <FaHashtag className="text-5xl md:text-6xl text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform duration-500" />
    ), label: "GESTION DES RESEAUX SOCIAUX",
    description:
      "Stratégie digitale, création de contenus, community management et campagnes sponsorisées pour développer votre visibilité et engager votre audience.",
    image: "/realisation-deux.jpg",
    accent: "from-neutral-900/90 to-neutral-900/60",
  },
];

function Realisations() {
  const heroRef = useInView(0.1);
  const gridRef = useInView(0.1);
  const ctaRef = useInView(0.1);

  const [, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="min-h-[100vh] bg-[url(/hero-realisations.png)] bg-cover bg-center pt-24 relative flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60 shadow-[inset_0_0_60px_10px_rgba(0,0,0,0.9)]" />
        <div
          ref={heroRef.ref}
          className={`relative z-10 text-center px-4 transition-all duration-1000 ease-out ${heroRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
        >

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            NOS RÉALISATIONS
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Chaque projet est une vision concrétisée — explorez notre portfolio par univers.
          </p>
        </div>
      </section>

      {/* ── Grille des catégories ── */}
      <section className="bg-black py-20">
        <div
          ref={gridRef.ref}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ease-out ${gridRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <h2 className="text-3xl md:text-5xl text-center text-white mb-4">
            EXPLORER PAR CATÉGORIE
          </h2>
          <p className="text-center text-gray-500 mb-14 text-base md:text-lg">
            Cliquez sur une catégorie pour découvrir les projets associés.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat, index) => (
              <a
                key={cat.id}
                href={cat.href}
                className="group relative overflow-hidden border border-neutral-800 hover:border-[#D4AF37] transition-all duration-500 cursor-pointer block"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  transitionDelay: gridRef.inView ? `${index * 120}ms` : "0ms",
                  opacity: gridRef.inView ? 1 : 0,
                  transform: gridRef.inView ? "translateY(0)" : "translateY(30px)",
                  transitionProperty: "opacity, transform, border-color",
                  transitionDuration: "600ms",
                }}
              >
                {/* Image de fond */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "https://via.placeholder.com/700x400?text=Réalisation";
                    }}
                  />
                  {/* Overlay de base */}
                  <div className="absolute inset-0 bg-black/70 group-hover:bg-black/50 transition-all duration-500" />
                  {/* Gradient doré au hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(135deg, #D4AF37 0%, transparent 60%)",
                    }}
                  />
                </div>

                {/* Contenu */}
                <div className="relative z-10 p-8 md:p-10 flex flex-col min-h-[320px] justify-between">
                  {/* Top : icône + badge */}
                  <div className="flex items-start justify-between">
                    <div>{cat.icon}</div>

                  </div>

                  {/* Bas : titre + description + CTA */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
                      {cat.label}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 max-w-md">
                      {cat.description}
                    </p>

                    {/* Bouton */}
                    <div className="flex items-center gap-3 text-[#D4AF37] font-semibold text-sm tracking-widest uppercase group/btn">
                      <span>Voir les projets</span>
                      <span
                        className="inline-flex items-center justify-center w-8 h-8 border border-[#D4AF37] rounded-full transition-all duration-300 group-hover:bg-[#D4AF37]"
                      >
                        <FaArrowRight className="text-xs group-hover:text-black transition-colors duration-300" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ligne décorative bottom */}
                <div className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full bg-[#D4AF37] transition-all duration-500" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA bas de page ── */}
      <section className="bg-neutral-900 py-20 border-t border-neutral-800">
        <div
          ref={ctaRef.ref}
          className={`max-w-3xl mx-auto px-6 text-center transition-all duration-700 ease-out ${ctaRef.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à rejoindre nos réalisations ?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Chaque grande réalisation commence par une conversation. Parlez-nous de votre vision.
          </p>
          <a
            href="/contact"
            className="relative inline-block border-2 border-[#D4AF37] text-white text-base md:text-lg px-10 py-4 overflow-hidden group"
          >
            <span className="absolute inset-0 bg-[#D4AF37] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            <span className="relative z-10 transition-colors duration-500 group-hover:text-black tracking-widest uppercase font-semibold">
              Démarrer un projet
            </span>
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Realisations;