/* eslint-disable react-hooks/refs */
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useRef, useState, useEffect } from "react";
import { motion, useInView as useFramerInView } from "framer-motion";
import {
  FiCpu,
  FiHeart,
  FiCalendar,
  FiTarget,
  FiUsers,
  FiTrendingUp,
  FiGlobe,
  FiStar
} from "react-icons/fi";
import {
  FaRocket,
  FaLightbulb,
} from "react-icons/fa";
import {
  IoDiamondOutline,
  IoSparklesSharp
} from "react-icons/io5";

/* ─── Custom hook (ne doit PAS être appelé dans une boucle) ─── */
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null!);
  const inView = useFramerInView(ref, { once: true, amount: threshold });
  return { ref, inView };
}

/* ─── Données ─── */
const timelineEvents = [
  {
    side: "right",
    title: "Année de création",
    description:
      "Création de l'entreprise avec pour objectif d'apporter une nouvelle dynamique dans le secteur digital.",
    icon: <FiCalendar className="text-[#D4AF37]" />,
  },
  {
    side: "left",
    title: "Première étape",
    description:
      "Début du parcours avec les premières idées, réflexions ou initiatives marquantes.",
    icon: <FiTarget className="text-[#D4AF37]" />,
  },
  {
    side: "right",
    title: "Expansion",
    description:
      "Phase marquée par l'ouverture à de nouvelles opportunités et l'élargissement de notre portée.",
    icon: <FiTrendingUp className="text-[#D4AF37]" />,
  },
  {
    side: "left",
    title: "Aujourd'hui",
    description:
      "Une équipe engagée au service de l'innovation et de la performance digitale.",
    icon: <FiUsers className="text-[#D4AF37]" />,
  },
];

const teamValues = [
  {
    icon: <FiCpu className="text-4xl text-[#D4AF37]" />,
    title: "Innovation",
    description:
      "Nous repoussons les limites du possible en combinant technologie de pointe et créativité sans contraintes",
  },
  {
    icon: <IoDiamondOutline className="text-4xl text-[#D4AF37]" />,
    title: "Excellence",
    description:
      "Chaque pixel, chaque ligne de code est le reflet de notre quête permanente de perfection",
  },
  {
    icon: <FiHeart className="text-4xl text-[#D4AF37]" />,
    title: "Passion",
    description:
      "Notre carburant ? Une passion dévorante pour le digital et ses possibilités infinies",
  },
];

const stats = [
  { value: "50+", label: "Projets réalisés", icon: <FaRocket className="text-[#D4AF37]" /> },
  { value: "15+", label: "Experts créatifs", icon: <FiUsers className="text-[#D4AF37]" /> },
  { value: "98%", label: "Clients satisfaits", icon: <FiStar className="text-[#D4AF37]" /> },
  { value: "24/7", label: "Support disponible", icon: <FiGlobe className="text-[#D4AF37]" /> },
];

const teamMembers = [
  {
    name: "Jean Kouassi",
    role: "Directeur Créatif",
    bio: "10 ans d'expérience dans le design digital et la direction artistique",
    icon: <FaLightbulb className="text-3xl text-[#D4AF37]" />,
  },
  {
    name: "Marie Konan",
    role: "Lead Développeur",
    bio: "Experte en développement web et architecture technique",
    icon: <FiCpu className="text-3xl text-[#D4AF37]" />,
  },
  {
    name: "Paul Yao",
    role: "Community Manager",
    bio: "Spécialiste en stratégie digitale et réseaux sociaux",
    icon: <FiUsers className="text-3xl text-[#D4AF37]" />,
  },
  {
    name: "Sarah Bamba",
    role: "Chef de Projet",
    bio: "Coordination et gestion des projets digitaux complexes",
    icon: <FiTarget className="text-3xl text-[#D4AF37]" />,
  },
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

const scaleIn = {
  hidden: { scale: 0, opacity: 0 },
  visible: (delay = 0) => ({
    scale: 1,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 200, delay },
  }),
};

/* ─── Composant TimelineItem (desktop) ─── */
function TimelineItem({
  event,
  index,
}: {
  event: (typeof timelineEvents)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null!);
  const inView = useFramerInView(ref, { once: true, amount: 0.3 });
  const isRight = event.side === "right";

  const cardVariants = {
    hidden: { opacity: 0, x: isRight ? 50 : -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, delay: index * 0.1 },
    },
  };

  return (
    <div ref={ref} className="relative flex items-center w-full mb-16 last:mb-0">
      {/* Côté gauche */}
      <div className="w-1/2 flex justify-end pr-12">
        {!isRight && (
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            whileHover={{ borderColor: "#D4AF37", transition: { duration: 0.2 } }}
            style={{ borderColor: "rgb(64 64 64)" }}
            className="bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 p-6 max-w-xs w-full text-center  transition-colors duration-300 group"
          >
            <div className="flex justify-center mb-3">
              <div className="bg-[#D4AF37]/10 p-3 rounded-full group-hover:bg-[#D4AF37]/20 transition-colors duration-300">
                {event.icon}
              </div>
            </div>
            <h3 className="text-white text-xl font-bold mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
              {event.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">{event.description}</p>
          </motion.div>
        )}
      </div>

      {/* Point central avec glow */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={index * 0.1 + 0.2}
          className="relative"
        >
          <div className="w-5 h-5 rounded-full border-2 border-[#D4AF37] bg-neutral-900" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[#D4AF37] rounded-full blur-md opacity-30" />
        </motion.div>
      </div>

      {/* Côté droit */}
      <div className="w-1/2 flex justify-start pl-12">
        {isRight && (
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            whileHover={{ borderColor: "#D4AF37", transition: { duration: 0.2 } }}
            style={{ borderColor: "rgb(64 64 64)" }}
            className="bg-neutral-800/80 backdrop-blur-sm border border-neutral-700 p-6 max-w-xs w-full  transition-colors duration-300 group"
          >
            <div className="flex justify-center mb-3">
              <div className="bg-[#D4AF37]/10 p-3 rounded-full group-hover:bg-[#D4AF37]/20 transition-colors duration-300">
                {event.icon}
              </div>
            </div>
            <h3 className="text-white text-xl font-bold mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
              {event.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">{event.description}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ─── Composant TimelineMobileItem (évite le hook dans .map) ─── */
function TimelineMobileItem({
  event,
  index,
}: {
  event: (typeof timelineEvents)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null!);
  const inView = useFramerInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="flex items-start gap-4 pl-4 relative"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
        className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-[#D4AF37] bg-neutral-900 mt-1 relative z-10"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#D4AF37] rounded-full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ delay: index * 0.1 + 0.15, duration: 0.5 }}
        className="bg-neutral-800 border border-neutral-700 p-5 flex-1  hover:border-[#D4AF37] transition-all duration-300"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-[#D4AF37]/10 p-2 rounded-full">{event.icon}</div>
          <h3 className="text-white font-bold text-lg">{event.title}</h3>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed pl-10">{event.description}</p>
      </motion.div>
    </motion.div>
  );
}

/* ─── Page principale ─── */
function About() {
  const titleRef = useInView(0.3);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen bg-[url(/hero-about.png)] bg-cover bg-center pt-24 relative flex items-center lg:items-end"
      >
        <div className="absolute inset-0 bg-black/50 shadow-[inset_0_0_30px_5px_rgba(0,0,0,0.8)]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-0 lg:mb-20">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              L'Âme de <br />
              <span className="text-[#D4AF37] relative">Black Agence</span>
            </h1>

            <p className="text-gray-300 text-lg sm:text-xl md:text-2xl mb-8 leading-relaxed">
              Nous tissons des connexions digitales qui marquent les esprits,
              en transformant vos idées en expériences numériques exceptionnelles.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="/realisations"
                whileTap={{ scale: 0.95 }}
                className="relative inline-block border-2 border-[#D4AF37] text-white text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 overflow-hidden group"
              >
                <span className="absolute inset-0 bg-[#D4AF37] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 transition-colors duration-500 group-hover:text-black whitespace-nowrap flex items-center gap-2">
                  DÉCOUVRIR NOS PROJETS
                </span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Notre Parcours ── */}
      <section id="parcours" className="bg-neutral-900 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Titre */}
          <motion.div
            ref={titleRef.ref}
            variants={fadeUp}
            initial="hidden"
            animate={titleRef.inView ? "visible" : "hidden"}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Notre <span className="text-[#D4AF37]">Parcours</span>
            </h2>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={titleRef.inView ? { width: 120, opacity: 1 } : { width: 0, opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"
            />
          </motion.div>

          {/* Timeline Desktop */}
          {!isMobile && (
            <div className="relative max-w-5xl mx-auto hidden md:block">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent" />
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-[#D4AF37] blur-md opacity-30" />
              {timelineEvents.map((event, index) => (
                <TimelineItem key={index} event={event} index={index} />
              ))}
            </div>
          )}

          {/* Timeline Mobile — chaque item a son propre hook dans un composant dédié */}
          <div className="md:hidden space-y-4 relative">
            <div className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#D4AF37] to-transparent" />
            {timelineEvents.map((event, index) => (
              <TimelineMobileItem key={index} event={event} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Notre ADN ── */}
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
              Notre <span className="text-[#D4AF37]">ADN</span>
            </h2>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 120, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
              className="h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-xl group transition-colors duration-300 text-center hover:border-[#D4AF37]"
              >
                <div className="flex justify-center mb-6">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-[#D4AF37]/10 p-4 rounded-full group-hover:bg-[#D4AF37]/20 transition-all duration-300"
                  >
                    {value.icon}
                  </motion.div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#D4AF37] transition-colors duration-300">
                  {value.title}
                </h3>

                <p className="text-gray-400 leading-relaxed">{value.description}</p>

                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "50%" }}
                  transition={{ duration: 0.3 }}
                  className="h-0.5 bg-[#D4AF37] mx-auto mt-6"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Chiffres clés ── */}
      <section className="bg-neutral-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 border border-neutral-800 hover:border-[#D4AF37] rounded-xl transition-colors duration-300 group cursor-default"
              >
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex justify-center mb-3"
                >
                  <div className="bg-[#D4AF37]/10 p-3 rounded-full group-hover:bg-[#D4AF37]/20 transition-colors duration-300">
                    {stat.icon}
                  </div>
                </motion.div>
                <div className="text-3xl md:text-4xl font-bold text-[#D4AF37] mb-2">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Notre Équipe ── */}
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
              Notre <span className="text-[#D4AF37]">Équipe</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Des experts passionnés réunis pour donner vie à vos projets digitaux
            </p>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 120, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
              className="h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4"
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-xl hover:border-[#D4AF37] transition-colors duration-300 text-center group"
              >
                <div className="flex justify-center mb-4">
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-neutral-800 flex items-center justify-center border-2 border-[#D4AF37] group-hover:border-4 transition-all duration-300"
                  >
                    {member.icon}
                  </motion.div>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#D4AF37] transition-colors duration-300">
                  {member.name}
                </h3>

                <p className="text-[#D4AF37] text-sm mb-3">{member.role}</p>

                <p className="text-gray-400 text-sm">{member.bio}</p>

                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                  className="h-0.5 bg-[#D4AF37] mt-4 origin-left"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Call to Action ── */}
      <section className="bg-neutral-900 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#D4AF37] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#D4AF37] rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <IoSparklesSharp className="text-5xl text-[#D4AF37] mx-auto mb-6" />
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Prêt à <span className="text-[#D4AF37]">collaborer</span> ?
            </h2>

            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Transformons ensemble vos idées en projets digitaux exceptionnels.
              Notre équipe est prête à relever vos défis les plus ambitieux.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <motion.a
                href="/contact"
                whileTap={{ scale: 0.95 }}
                className="relative inline-block border-2 border-[#D4AF37] text-white text-lg px-8 py-4 overflow-hidden group"
              >
                <span className="absolute inset-0 bg-[#D4AF37] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 transition-colors duration-500 group-hover:text-black whitespace-nowrap flex items-center gap-2">
                  COMMENCER L'AVENTURE
                </span>
              </motion.a>

              <motion.a
                href="/services"
                whileTap={{ scale: 0.95 }}
                className="relative inline-block border-2 border-white text-white text-lg px-8 py-4 overflow-hidden group"
              >
                <span className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 transition-colors duration-500 group-hover:text-black whitespace-nowrap">
                  NOS SERVICES
                </span>
              </motion.a>
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
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 768px) {
          .grid { gap: 1rem; }
        }
      `}</style>
    </>
  );
}

export default About;