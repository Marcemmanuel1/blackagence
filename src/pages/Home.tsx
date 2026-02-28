/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/refs */
import Navbar from "../components/Navbar";
import {
  FaInstagram,
  FaCalendarAlt,
  FaPaintBrush,
  FaCamera,
  FaMobileAlt,
  FaCode,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock
} from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import Footer from "../components/Footer";

// Hook personnalisé pour détecter la visibilité d'un élément
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null!);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // animate once
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function Home() {
  const sliderRef = useRef<HTMLDivElement>(null!);
  const sliderGalleryRef = useRef<HTMLDivElement>(null!);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [showLeftArrowGallery, setShowLeftArrowGallery] = useState(false);
  const [showRightArrowGallery, setShowRightArrowGallery] = useState(true);

  // États pour la lightbox
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // États pour le formulaire
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Refs pour les animations
  const heroContent = useInView(0.1);
  const servicesSection = useInView(0.1);
  const gallerySection = useInView(0.1);
  const trustSection = useInView(0.1);
  const philosophyText = useInView(0.15);
  const philosophyImage = useInView(0.15);
  const contactLeft = useInView(0.15);
  const contactRight = useInView(0.15);

  const services = [
    {
      icon: <FaInstagram className="text-white text-5xl group-hover:scale-110 transition-transform duration-300" />,
      title: "Gestion des Réseaux Sociaux",
      description: "Stratégie de contenu personnalisée, community management, et campagnes publicitaires ciblées pour développer votre présence sur Instagram, LinkedIn, TikTok et Facebook."
    },
    {
      icon: <FaCalendarAlt className="text-white text-5xl group-hover:scale-110 transition-transform duration-300" />,
      title: "Événements Digitaux",
      description: "Organisation de webinaires interactifs, conférences en ligne et événements virtuels avec une expérience immersive et des outils de networking innovants."
    },
    {
      icon: <FaPaintBrush className="text-white text-5xl group-hover:scale-110 transition-transform duration-300" />,
      title: "Design Graphique",
      description: "Création d'identités visuelles percutantes, chartes graphiques, logos et supports de communication qui reflètent l'essence de votre marque."
    },
    {
      icon: <FaCamera className="text-white text-5xl group-hover:scale-110 transition-transform duration-300" />,
      title: "Photographie Professionnelle",
      description: "Séances photo pour vos produits, portraits d'équipe et reportages événementiels avec un rendu esthétique et professionnel adapté à votre image."
    },
    {
      icon: <FaMobileAlt className="text-white text-5xl group-hover:scale-110 transition-transform duration-300" />,
      title: "Solutions Applications Mobiles",
      description: "Conception et développement d'applications iOS et Android sur mesure, avec une expérience utilisateur fluide et des fonctionnalités innovantes."
    },
    {
      icon: <FaCode className="text-white text-5xl group-hover:scale-110 transition-transform duration-300" />,
      title: "Développement Web",
      description: "Création de sites vitrines, e-commerce et applications web responsives, optimisés pour le référencement et adaptés à tous vos besoins digitaux."
    }
  ];

  const galleryImages = [
    { src: "/gallerie-un.png", alt: "Projet photographie 1" },
    { src: "/gallerie-deux.png", alt: "Projet design 1" },
    { src: "/gallerie-trois.png", alt: "Projet web 1" },
    { src: "/gallerie-quatre.png", alt: "Projet événement 1" },
    { src: "/gallerie-cinq.png", alt: "Projet application 1" },
    { src: "/gallerie-six.png", alt: "Projet réseaux sociaux 1" }
  ];

  const clientLogos = [
    { src: "/partenaire-un.jpg", alt: "Entreprise 1" },
    { src: "/partenaire-deux.png", alt: "Entreprise 2" },
    { src: "/partenaire-trois.png", alt: "Entreprise 3" },
    { src: "/partenaire-quatre.png", alt: "Entreprise 4" },
    { src: "/partenaire-cinq.jpg", alt: "Entreprise 5" },
    { src: "/partenaire-six.jpg", alt: "Entreprise 6" },
    { src: "/partenaire-sept.jpg", alt: "Entreprise 7" },
  ];

  const infiniteLogos = [...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') goToPrevious();
      else if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  const scroll = (direction: 'left' | 'right', ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const scrollAmount = 324;
      const newScrollLeft = ref.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      ref.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  const checkScrollButtons = (ref: React.RefObject<HTMLDivElement>, setLeft: Function, setRight: Function) => {
    if (ref.current) {
      const { scrollLeft, scrollWidth, clientWidth } = ref.current;
      setLeft(scrollLeft > 0);
      setRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      const handleScroll = () => checkScrollButtons(sliderRef, setShowLeftArrow, setShowRightArrow);
      slider.addEventListener('scroll', handleScroll);
      checkScrollButtons(sliderRef, setShowLeftArrow, setShowRightArrow);
      return () => slider.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    const sliderGallery = sliderGalleryRef.current;
    if (sliderGallery) {
      const handleScroll = () => checkScrollButtons(sliderGalleryRef, setShowLeftArrowGallery, setShowRightArrowGallery);
      sliderGallery.addEventListener('scroll', handleScroll);
      checkScrollButtons(sliderGalleryRef, setShowLeftArrowGallery, setShowRightArrowGallery);
      return () => sliderGallery.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const goToSlide = (index: number, ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollTo({ left: index * 324, behavior: 'smooth' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulaire soumis:', formData);
    setFormData({ name: '', email: '', message: '' });
    alert('Message envoyé avec succès!');
  };

  return (
    <>
      <Navbar />

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95" onClick={closeLightbox}>
          <button className="absolute top-4 right-4 text-white text-3xl z-50 hover:text-[#D4AF37] transition-colors" onClick={closeLightbox}>
            <FaTimes />
          </button>
          <button className="absolute left-4 text-white text-3xl z-50 hover:text-[#D4AF37] transition-colors" onClick={(e) => { e.stopPropagation(); goToPrevious(); }}>
            <FaChevronLeft />
          </button>
          <button className="absolute right-4 text-white text-3xl z-50 hover:text-[#D4AF37] transition-colors" onClick={(e) => { e.stopPropagation(); goToNext(); }}>
            <FaChevronRight />
          </button>
          <div className="relative w-full h-full flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryImages[currentImageIndex].src}
              alt={galleryImages[currentImageIndex].alt}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "https://via.placeholder.com/800x600?text=Image+non+trouvée";
              }}
            />
          </div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full">
            {currentImageIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="min-h-screen bg-[url(/hero-home.png)] bg-cover bg-center pt-24 relative flex items-center lg:items-end">
        <div className="absolute inset-0 bg-black/20 shadow-[inset_0_0_30px_5px_rgba(0,0,0,0.8)]" />
        <div
          ref={heroContent.ref}
          className={`relative z-10 w-full md:w-[50%] mx-auto lg:ml-15 xl:ml-25 mb-0 lg:mb-20 px-4 sm:px-6 lg:px-0 text-center lg:text-left transition-all duration-1000 ease-out ${heroContent.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6">
            Création Digitale d'Excellence
          </h1>
          <p className="text-gray-400 text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto lg:mx-0">
            Black Agence transforme vos idées en expériences digitales mémorables.
            De la conception de sites web à la gestion d'événements, nous donnons
            vie à votre vision avec élégance et innovation.
          </p>
          <a
            href="/contact"
            className="relative inline-block border-2 border-[#D4AF37] text-white text-sm sm:text-base md:text-lg lg:text-xl px-6 sm:px-8 lg:px-8 py-3 sm:py-4 overflow-hidden group"
          >
            <span className="absolute inset-0 bg-[#D4AF37] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            <span className="relative z-10 transition-colors duration-500 group-hover:text-black whitespace-nowrap">
              COMMENCER UN PROJET
            </span>
          </a>
        </div>
      </section>

      {/* Section "Nos Services" */}
      <section className="bg-neutral-900 py-16 overflow-hidden">
        <div
          ref={servicesSection.ref}
          className={`transition-all duration-700 ease-out ${servicesSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <h2 className="text-3xl md:text-5xl text-center text-white mb-12">
            NOS SERVICES
          </h2>

          {/* Version Desktop - Grille */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`bg-neutral-800 p-8 border border-neutral-800 hover:border-[#D4AF37] transition-all duration-300 group text-center
                  ${servicesSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: servicesSection.inView ? `${index * 100}ms` : '0ms', transitionProperty: 'opacity, transform', transitionDuration: '600ms' }}
              >
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-[#D4AF37] mb-4">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          {/* Version Mobile - Slider */}
          <div className="md:hidden relative px-4">
            {showLeftArrow && (
              <button onClick={() => scroll('left', sliderRef)} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-[#D4AF37] text-black p-2 rounded-full shadow-lg hover:bg-opacity-90 transition-all" aria-label="Previous">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
            )}
            {showRightArrow && (
              <button onClick={() => scroll('right', sliderRef)} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-[#D4AF37] text-black p-2 rounded-full shadow-lg hover:bg-opacity-90 transition-all" aria-label="Next">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            )}
            <div ref={sliderRef} className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {services.map((service, index) => (
                <div key={index} className="flex-none w-[280px] sm:w-[320px] snap-start bg-neutral-800 p-6 border border-neutral-800 transition-colors duration-300 group text-center mobile-border">
                  <div className="flex justify-center mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-[#D4AF37] mb-3">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {services.map((_, index) => (
                <button key={index} onClick={() => goToSlide(index, sliderRef)} className={`w-2 h-2 rounded-full transition-all ${sliderRef.current && Math.floor((sliderRef.current?.scrollLeft || 0) / 324) === index ? 'bg-[#D4AF37] w-4' : 'bg-gray-600'}`} aria-label={`Go to slide ${index + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Galerie */}
      <section className="bg-black py-16 overflow-hidden">
        <div
          ref={gallerySection.ref}
          className={`transition-all duration-700 ease-out ${gallerySection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <h2 className="text-3xl md:text-5xl text-center text-white mb-12">
            NOTRE GALERIE
          </h2>

          {/* Version Desktop - Grille */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`bg-neutral-800 overflow-hidden border border-neutral-800 hover:border-[#D4AF37] transition-all duration-300 group cursor-pointer
                  ${gallerySection.inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: gallerySection.inView ? `${index * 80}ms` : '0ms', transitionProperty: 'opacity, transform', transitionDuration: '600ms' }}
                onClick={() => openLightbox(index)}
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "https://via.placeholder.com/400x400?text=Image+non+trouvée";
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Version Mobile - Slider */}
          <div className="md:hidden relative px-4">
            {showLeftArrowGallery && (
              <button onClick={() => scroll('left', sliderGalleryRef)} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-[#D4AF37] text-black p-2 rounded-full shadow-lg hover:bg-opacity-90 transition-all" aria-label="Previous">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
            )}
            {showRightArrowGallery && (
              <button onClick={() => scroll('right', sliderGalleryRef)} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-[#D4AF37] text-black p-2 rounded-full shadow-lg hover:bg-opacity-90 transition-all" aria-label="Next">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            )}
            <div ref={sliderGalleryRef} className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {galleryImages.map((image, index) => (
                <div key={index} className="flex-none w-[300px] sm:w-[350px] snap-start bg-neutral-800 overflow-hidden border border-neutral-800 transition-all duration-300 group cursor-pointer mobile-border-gallery" onClick={() => openLightbox(index)}>
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "https://via.placeholder.com/350x300?text=Image+non+trouvée";
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-2 mt-4">
              {galleryImages.map((_, index) => (
                <button key={index} onClick={() => goToSlide(index, sliderGalleryRef)} className={`w-2 h-2 rounded-full transition-all ${sliderGalleryRef.current && Math.floor((sliderGalleryRef.current?.scrollLeft || 0) / 344) === index ? 'bg-[#D4AF37] w-4' : 'bg-gray-600'}`} aria-label={`Go to gallery slide ${index + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section "ILS NOUS FONT CONFIANCE" */}
      <section className="bg-neutral-900 py-16 overflow-hidden">
        <div
          ref={trustSection.ref}
          className={`transition-all duration-700 ease-out ${trustSection.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <h2 className="text-3xl md:text-5xl text-center text-white mb-12">
            ILS NOUS FONT CONFIANCE
          </h2>
          <div className="relative flex overflow-hidden group">
            <div className="flex animate-infinite-scroll gap-16 px-8">
              {infiniteLogos.map((logo, index) => (
                <div key={`logo-${index}`} className="flex-none w-32 h-32 md:w-40 md:h-40 transition-colors duration-300">
                  <div className="w-full h-full relative">
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className="w-full h-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "https://via.placeholder.com/160x160?text=Logo";
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Équipe / Philosophie */}
      <section className="bg-neutral-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Texte */}
            <div
              ref={philosophyText.ref}
              className={`text-white transition-all duration-800 ease-out ${philosophyText.inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
                }`}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-[#D4AF37] mb-8">
                Notre Philosophie
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Black Agence est née de la passion pour le design et la technologie.
                Nous croyons en la puissance du digital pour transformer les entreprises
                et créer des connexions significatives avec les audiences.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Notre approche combine expertise technique, créativité sans limites et
                une compréhension profonde des tendances du marché pour livrer des solutions
                qui non seulement impressionnent, mais qui génèrent des résultats tangibles.
              </p>
            </div>

            {/* Image */}

            <div
              ref={philosophyImage.ref}
              className={`relative h-100 md:w-[650px] overflow-hidden border border-neutral-800 hover:border-[#D4AF37] transition-all duration-800 ease-out ${philosophyImage.inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
                }`}
            >
              <img
                src="/equipe.png"
                alt="Notre équipe"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "https://via.placeholder.com/600x800?text=Notre+Équipe";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section Nous Contacter */}
      <section className="bg-black py-16">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-12">
          CONTACTEZ-NOUS
        </h2>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Partie gauche - Coordonnées */}
            <div
              ref={contactLeft.ref}
              className={`p-8 transition-all duration-700 ease-out ${contactLeft.inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
            >
              <h3 className="text-2xl font-bold text-[#D4AF37] mb-8">
                Travaillons ensemble
              </h3>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#D4AF37] p-3 rounded-full flex-shrink-0"><FaMapMarkerAlt className="text-black text-xl" /></div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Adresse</h4>
                    <p className="text-gray-400">Abidjan, II Cocody 2 plateau carrefour duncan</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-[#D4AF37] p-3 rounded-full flex-shrink-0"><FaPhone className="text-black text-xl" /></div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Téléphone</h4>
                    <p className="text-gray-400">+225 07 78 24 75 99</p>
                    <p className="text-gray-400">+225 07 48 25 21 85</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-[#D4AF37] p-3 rounded-full flex-shrink-0"><FaEnvelope className="text-black text-xl" /></div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Email</h4>
                    <p className="text-gray-400">contact@blackagence.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-[#D4AF37] p-3 rounded-full flex-shrink-0"><FaClock className="text-black text-xl" /></div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Heures d'ouverture</h4>
                    <p className="text-gray-400">Lun-Ven: 9h-18h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Partie droite - Formulaire */}
            <div
              ref={contactRight.ref}
              className={`bg-neutral-900 p-8 border border-neutral-800 transition-all duration-700 ease-out ${contactRight.inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
                }`}
            >
              <h3 className="text-2xl font-bold text-[#D4AF37] mb-8">
                Envoyez-nous un message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white mb-2">Nom complet</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-white focus:border-[#D4AF37] focus:outline-none transition-colors" placeholder="Votre nom" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white mb-2">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-white focus:border-[#D4AF37] focus:outline-none transition-colors" placeholder="votre@email.com" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-white mb-2">Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={5} className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-white focus:border-[#D4AF37] focus:outline-none transition-colors resize-none" placeholder="Votre message..." />
                </div>
                <button type="submit" className="w-[40%] bg-[#D4AF37] text-black font-bold py-3 px-6 hover:bg-[#D4AF37]/70 transition-all duration-300 transform">
                  ENVOYER
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        @keyframes infiniteScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .animate-infinite-scroll {
          animation: infiniteScroll 40s linear infinite;
          width: fit-content;
        }

        .group:hover .animate-infinite-scroll {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .mobile-border { border-color: #D4AF37 !important; }
          .mobile-border-gallery { border-color: #D4AF37 !important; }
        }
      `}</style>
    </>
  );
}

export default Home;