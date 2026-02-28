/* eslint-disable react-hooks/refs */
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useRef, useState, useEffect } from "react";
import { motion, useInView as useFramerInView } from "framer-motion";
import {
  FiCode,
  FiArrowRight,
  FiUsers,
  FiHeart,
  FiCheckCircle
} from "react-icons/fi";
import {
  FaLaptopCode,
  FaMobileAlt,
  FaCamera,
  FaHashtag,
  FaPalette,
  FaRocket,
  FaLightbulb,
  FaRegCalendarCheck,
  FaRegGem
} from "react-icons/fa";
import {
  IoCheckmarkCircleOutline
} from "react-icons/io5";
import { BsPencil, BsSpeedometer2 } from "react-icons/bs"; // Ajout de BsPencil et BsSpeedometer2

/* ─── Custom hook (ne doit PAS être appelé dans une boucle) ─── */
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null!);
  const inView = useFramerInView(ref, { once: true, amount: threshold });
  return { ref, inView };
}

/* ─── Données des services (SANS STATS) ─── */
const servicesData = [
  {
    id: "dev-web",
    icon: <FaLaptopCode className="text-4xl text-[#D4AF37]" />,
    title: "Développement Web",
    description: "Sites vitrines, e-commerce, applications web sur mesure. Des solutions performantes, responsives et optimisées SEO.",
    features: ["Sites vitrines", "E-commerce", "Applications web", "CMS sur mesure"],
    color: "from-blue-500/20 to-cyan-500/20",
    gradient: "bg-gradient-to-br from-blue-600 to-cyan-600",
    path: "/services/developpement-web"
  },
  {
    id: "dev-mobile",
    icon: <FaMobileAlt className="text-4xl text-[#D4AF37]" />,
    title: "Développement Mobile",
    description: "Applications natives et hybrides pour iOS et Android. Des expériences utilisateur fluides et intuitives.",
    features: ["Apps iOS", "Apps Android", "Apps hybrides", "Maintenance"],
    color: "from-green-500/20 to-emerald-500/20",
    gradient: "bg-gradient-to-br from-green-600 to-emerald-600",
    path: "/services/developpement-mobile"
  },
  {
    id: "photographie",
    icon: <FaCamera className="text-4xl text-[#D4AF37]" />,
    title: "Photographie Professionnelle",
    description: "Séances photo pour vos produits, événements d'entreprise, portraits professionnels et reportages.",
    features: ["Shooting produit", "Événementiel", "Portraits", "Reportages"],
    color: "from-amber-500/20 to-orange-500/20",
    gradient: "bg-gradient-to-br from-amber-600 to-orange-600",
    path: "/services/photographie"
  },
  {
    id: "reseaux-sociaux",
    icon: <FaHashtag className="text-4xl text-[#D4AF37]" />,
    title: "Gestion des Réseaux Sociaux",
    description: "Community management, création de contenu, planning éditorial et campagne publicitaire.",
    features: ["Community management", "Création de contenu", "Publicités", "Analytics"],
    color: "from-purple-500/20 to-pink-500/20",
    gradient: "bg-gradient-to-br from-purple-600 to-pink-600",
    path: "/services/reseaux-sociaux"
  },
  {
    id: "evenements",
    icon: <FaRegCalendarCheck className="text-4xl text-[#D4AF37]" />,
    title: "Événements Digitaux",
    description: "Organisation de webinaires, conférences en ligne, événements hybrides et live streaming.",
    features: ["Webinaires", "Conférences en ligne", "Live streaming", "Événements hybrides"],
    color: "from-red-500/20 to-rose-500/20",
    gradient: "bg-gradient-to-br from-red-600 to-rose-600",
    path: "/services/evenements-digitaux"
  },
  {
    id: "design",
    icon: <FaPalette className="text-4xl text-[#D4AF37]" />,
    title: "Design Graphique",
    description: "Identité visuelle, chartes graphiques, supports print et digitaux pour une communication percutante.",
    features: ["Identité visuelle", "Charte graphique", "Supports print", "Design digital"],
    color: "from-indigo-500/20 to-violet-500/20",
    gradient: "bg-gradient-to-br from-indigo-600 to-violet-600",
    path: "/services/design-graphique"
  }
];

/* ─── Données du processus ─── */
const processSteps = [
  {
    step: 1,
    title: "Découverte",
    description: "Nous analysons vos besoins et définissons ensemble les objectifs à atteindre.",
    icon: <FiUsers className="text-3xl text-[#D4AF37]" />,
    details: [
      "Analyse de vos besoins",
      "Étude de la concurrence",
      "Définition des objectifs",
      "Proposition stratégique"
    ]
  },
  {
    step: 2,
    title: "Conception",
    description: "Nous élaborons une stratégie et des maquettes adaptées à votre projet.",
    icon: <FaLightbulb className="text-3xl text-[#D4AF37]" />,
    details: [
      "Création des maquettes",
      "Validation du design",
      "Architecture technique",
      "Planning détaillé"
    ]
  },
  {
    step: 3,
    title: "Développement",
    description: "Notre équipe technique donne vie à votre projet avec un code robuste.",
    icon: <FiCode className="text-3xl text-[#D4AF37]" />,
    details: [
      "Développement itératif",
      "Tests qualité",
      "Optimisations",
      "Revues de code"
    ]
  },
  {
    step: 4,
    title: "Livraison",
    description: "Nous vous formons et assurons un suivi post-lancement optimal.",
    icon: <FaRocket className="text-3xl text-[#D4AF37]" />,
    details: [
      "Déploiement",
      "Formation",
      "Support technique",
      "Maintenance évolutive"
    ]
  }
];

/* ─── Données des avantages (CORRIGÉ avec icônes disponibles) ─── */
const advantages = [
  {
    icon: <BsPencil className="text-2xl text-[#D4AF37]" />, // Remplacé MdOutlinePrecision
    title: "Sur-mesure",
    description: "Chaque solution est unique et adaptée à vos besoins spécifiques"
  },
  {
    icon: <BsSpeedometer2 className="text-2xl text-[#D4AF37]" />, // Remplacé MdOutlineSpeed
    title: "Performance",
    description: "Des solutions optimisées pour des résultats mesurables"
  },
  {
    icon: <FiHeart className="text-2xl text-[#D4AF37]" />,
    title: "Accompagnement",
    description: "Un suivi personnalisé à chaque étape de votre projet"
  },
  {
    icon: <FaRegGem className="text-2xl text-[#D4AF37]" />,
    title: "Expertise",
    description: "Une équipe passionnée et constamment formée aux dernières technologies"
  }
];

/* ─── Variants réutilisables ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay },
  }),
};

/* ─── ServiceCard sans stats et sans redirection ─── */
function ServiceCard({ service, index }: { service: typeof servicesData[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null!);
  const inView = useFramerInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group h-full"
    >
      <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden hover:border-[#D4AF37] transition-all duration-500 hover:shadow-2xl hover:shadow-[#D4AF37]/10 h-full flex flex-col relative">
        {/* En-tête avec icône */}
        <div className="p-6 pb-0">
          <div className="relative mb-6">

            {/* Icône avec animation */}
            <motion.div
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="relative w-16 h-16 bg-neutral-800 rounded-xl border border-neutral-700 flex items-center justify-center group-hover:border-[#D4AF37] transition-colors duration-300"
            >
              {service.icon}
            </motion.div>
          </div>

          {/* Titre */}
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
            {service.title}
          </h3>
        </div>

        {/* Contenu */}
        <div className="p-6 pt-0 flex-1 flex flex-col">
          <p className="text-gray-400 mb-6 line-clamp-3">
            {service.description}
          </p>

          {/* Fonctionnalités avec icônes de check */}
          <div className="mb-6 flex-1">
            <div className="space-y-2">
              {service.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <FiCheckCircle className="text-[#D4AF37] text-sm flex-shrink-0" />
                  <span className="text-sm text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Composant ProcessStep ─── */
function ProcessStep({ step, index }: { step: typeof processSteps[0]; index: number }) {
  const stepRef = useRef<HTMLDivElement>(null!);
  const inView = useFramerInView(stepRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={stepRef}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative flex flex-col md:flex-row items-start gap-6 pb-12 last:pb-0"
    >
      {/* Numéro et ligne de connexion */}
      <div className="relative flex-shrink-0">
        <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 border-2 border-[#D4AF37] flex items-center justify-center relative z-10">
          <span className="text-2xl font-bold text-[#D4AF37]">{step.step}</span>
        </div>
        {index < processSteps.length - 1 && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-[#D4AF37] to-transparent hidden md:block" />
        )}
      </div>

      {/* Contenu */}
      <div className="flex-1 bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 hover:border-[#D4AF37] transition-colors duration-300">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-[#D4AF37]/10 p-3 rounded-full">
            {step.icon}
          </div>
          <h3 className="text-2xl font-bold text-white">{step.title}</h3>
        </div>

        <p className="text-gray-400 mb-4 text-lg">
          {step.description}
        </p>

        {/* Détails */}
        <div className="grid grid-cols-2 gap-3">
          {step.details.map((detail, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
              <IoCheckmarkCircleOutline className="text-[#D4AF37] flex-shrink-0" />
              <span>{detail}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Composant AdvantageCard ─── */
function AdvantageCard({ advantage, index }: { advantage: typeof advantages[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null!);
  const inView = useFramerInView(cardRef, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex items-start gap-4 p-6 bg-neutral-900/30 border border-neutral-800 rounded-xl hover:border-[#D4AF37] transition-colors duration-300"
    >
      <div className="bg-[#D4AF37]/10 p-3 rounded-full flex-shrink-0">
        {advantage.icon}
      </div>
      <div>
        <h4 className="text-white font-bold mb-2">{advantage.title}</h4>
        <p className="text-gray-400 text-sm">{advantage.description}</p>
      </div>
    </motion.div>
  );
}

/* ─── Page principale ─── */
function Services() {
  const titleRef = useInView(0.3);
  const processRef = useInView(0.3);
  const [, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      <Navbar />

      {/* ── Hero Section ── */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-[100vh] bg-[url(/hero-service.jpg)] bg-cover bg-center pt-24 relative flex items-center"
      >
        <div className="absolute inset-0 bg-black/80 shadow-[inset_0_0_30px_5px_rgba(0,0,0,0.8)]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Nos Services <br />
              <span className="text-[#D4AF37] relative">d'Excellence</span>
            </h1>

            <p className="text-gray-300 text-lg sm:text-xl md:text-2xl mb-8 leading-relaxed">
              Chaque solution est conçue sur mesure pour répondre à vos besoins spécifiques
              et vous propulser vers le succès digital.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Section Services (NOUVEAU DESIGN SANS STATS) ── */}
      <section id="services" className="bg-black py-20 relative overflow-hidden">
        {/* Éléments décoratifs */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 border border-[#D4AF37]/20 rotate-45" />
          <div className="absolute bottom-20 right-10 w-40 h-40 border border-[#D4AF37]/20 rounded-full" />
          <div className="absolute top-40 right-20 w-20 h-20 bg-[#D4AF37]/5 blur-2xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={titleRef.ref}
            variants={fadeUp}
            initial="hidden"
            animate={titleRef.inView ? "visible" : "hidden"}
            className="text-center mb-16"
          >

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Nos <span className="text-[#D4AF37] relative">
                Expertises
              </span>
            </h2>

            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Des compétences variées au service de votre transformation digitale
            </p>

            {/* Séparateur décoratif */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={titleRef.inView ? { width: 200, opacity: 1 } : { width: 0, opacity: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-8"
            />
          </motion.div>

          {/* Grille des services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>

          {/* Message de fin de section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-gray-400">
              Chaque expertise est mise au service de votre réussite
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Section Processus ── */}
      <section className="bg-neutral-900 py-20 relative overflow-hidden">

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={processRef.ref}
            variants={fadeUp}
            initial="hidden"
            animate={processRef.inView ? "visible" : "hidden"}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Notre <span className="text-[#D4AF37]">Processus</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Une méthodologie éprouvée pour garantir la réussite de vos projets
            </p>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={processRef.inView ? { width: 120, opacity: 1 } : { width: 0, opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4"
            />
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {processSteps.map((step, index) => (
              <ProcessStep key={step.step} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section Avantages ── */}
      <section className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Pourquoi nous <span className="text-[#D4AF37]">choisir</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Des avantages qui font la différence pour vos projets
            </p>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 120, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
              className="h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {advantages.map((advantage, index) => (
              <AdvantageCard key={index} advantage={advantage} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Section Contact ── */}
      <section className="bg-black py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Prêt à <span className="text-[#D4AF37]">démarrer</span> votre projet ?
            </h2>

            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Contactez-nous pour discuter de vos besoins et obtenir un devis personnalisé.
              Notre équipe est à votre écoute pour donner vie à vos idées.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="relative inline-block border-2 border-[#D4AF37] text-white text-lg px-8 py-4 overflow-hidden group"
              >
                <span className="absolute inset-0 bg-[#D4AF37] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 transition-colors duration-500 group-hover:text-black whitespace-nowrap flex items-center gap-2">
                  <FiArrowRight className="text-xl" />
                  DEMANDER UN DEVIS
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .grid { gap: 1rem; }
        }
      `}</style>
    </>
  );
}

export default Services;