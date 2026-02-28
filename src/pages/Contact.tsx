/* eslint-disable react-hooks/refs */
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useRef, useState, useEffect } from "react";
import { motion, useInView as useFramerInView } from "framer-motion";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiCheckCircle,
  FiUser,
  FiMessageSquare,
  FiBriefcase,
  FiHelpCircle
} from "react-icons/fi";
import {
  FaWhatsapp,
} from "react-icons/fa";
import {
  IoLocationOutline,
  IoTimeOutline
} from "react-icons/io5";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";

/* ─── Custom hook (ne doit PAS être appelé dans une boucle) ─── */
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null!);
  const inView = useFramerInView(ref, { once: true, amount: threshold });
  return { ref, inView };
}

/* ─── Données ─── */
const contactMethods = [
  {
    icon: <FiMapPin className="text-[#D4AF37]" />,
    title: "Notre Adresse",
    details: ["Abidjan, Cocody", "Rue des Jardins, 01 BP 1234"],

  },
  {
    icon: <FiPhone className="text-[#D4AF37]" />,
    title: "Téléphone",
    details: ["+225 07 07 07 07 07", "+225 05 05 05 05 05"],

  },
  {
    icon: <FiMail className="text-[#D4AF37]" />,
    title: "Email",
    details: ["contact@black-agence.com", "support@black-agence.com"],

  },
  {
    icon: <FiClock className="text-[#D4AF37]" />,
    title: "Horaires",
    details: ["Lun - Ven: 9h - 18h", "Sam: 10h - 15h"],

  },
];

const socialLinks = [
  { icon: <FaWhatsapp className="text-2xl" />, link: "https://wa.me/2250778247599", label: "WhatsApp" },
  { icon: <FaLinkedinIn className="text-2xl" />, link: "https://linkedin.com/company/black-agence", label: "LinkedIn" },
  { icon: <FaFacebookF className="text-2xl" />, link: "https://www.facebook.com/people/Black-Agence/61578155935294/", label: "Facebook" },

];

const faqs = [
  {
    question: "Quels sont vos délais de réponse ?",
    answer: "Nous nous engageons à répondre à toutes vos demandes sous 24h ouvrées."
  },
  {
    question: "Travaillez-vous avec des clients internationaux ?",
    answer: "Oui, nous collaborons avec des clients du monde entier grâce à nos outils de communication à distance."
  },
  {
    question: "Proposez-vous des rendez-vous en ligne ?",
    answer: "Absolument ! Nous pouvons organiser des visioconférences pour échanger sur vos projets."
  },
  {
    question: "Comment se déroule le premier échange ?",
    answer: "Lors d'un premier appel, nous discutons de vos besoins, objectifs et budget pour vous proposer une solution adaptée."
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


/* ─── Composant Formulaire ─── */
function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null!);
  const inView = useFramerInView(formRef, { once: true, amount: 0.3 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'envoi
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Réinitialiser le message de succès après 5 secondes
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <motion.div
      ref={formRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7 }}
      className="bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 p-8 rounded-xl"
    >
      <h3 className="text-2xl font-bold text-white mb-6">
        Envoyez-nous un <span className="text-[#D4AF37]">message</span>
      </h3>

      {isSubmitted && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-500/20 border border-green-500 text-green-400 px-4 py-3 rounded-lg mb-6 flex items-center gap-2"
        >
          <FiCheckCircle className="text-xl" />
          <span>Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-gray-400 text-sm mb-2">
              Nom complet <span className="text-[#D4AF37]">*</span>
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-neutral-800 border border-neutral-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-[#D4AF37] transition-colors duration-300"
                placeholder="Jean Kouassi"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-400 text-sm mb-2">
              Email <span className="text-[#D4AF37]">*</span>
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-neutral-800 border border-neutral-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-[#D4AF37] transition-colors duration-300"
                placeholder="jean@exemple.com"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="subject" className="block text-gray-400 text-sm mb-2">
            Sujet <span className="text-[#D4AF37]">*</span>
          </label>
          <div className="relative">
            <FiBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full bg-neutral-800 border border-neutral-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-[#D4AF37] transition-colors duration-300 appearance-none"
            >
              <option value="">Sélectionnez un sujet</option>
              <option value="projet">Nouveau projet</option>
              <option value="devis">Demande de devis</option>
              <option value="partenariat">Partenariat</option>
              <option value="support">Support technique</option>
              <option value="autre">Autre</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-gray-400 text-sm mb-2">
            Message <span className="text-[#D4AF37]">*</span>
          </label>
          <div className="relative">
            <FiMessageSquare className="absolute left-3 top-4 text-gray-500" />
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full bg-neutral-800 border border-neutral-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:border-[#D4AF37] transition-colors duration-300 resize-none"
              placeholder="Décrivez votre projet ou votre demande..."
            />
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileTap={{ scale: 0.95 }}
          className="relative w-full inline-block border-2 border-[#D4AF37] text-white text-lg px-8 py-4 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="absolute inset-0 bg-[#D4AF37] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
          <span className="relative z-10 transition-colors duration-500 group-hover:text-black whitespace-nowrap flex items-center justify-center gap-2">
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ENVOI EN COURS...
              </>
            ) : (
              <>
                ENVOYER LE MESSAGE
              </>
            )}
          </span>
        </motion.button>
      </form>
    </motion.div>
  );
}

/* ─── Composant FAQ Item ─── */
function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null!);
  const inView = useFramerInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="border border-neutral-800 rounded-lg overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-800/50 transition-colors duration-300"
      >
        <span className="text-white font-medium">{faq.question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[#D4AF37] text-xl"
        >
          <FiHelpCircle />
        </motion.span>
      </button>

      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-5 pt-0 text-gray-400 border-t border-neutral-800">
          {faq.answer}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Page principale ─── */
function Contact() {
  const titleRef = useInView(0.3);
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

      {/* ── Hero ── */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-[100vh] bg-[url(/hero-contact.jpg)] bg-cover bg-center pt-24 relative flex items-center"
      >
        <div className="absolute inset-0 bg-black/60 shadow-[inset_0_0_30px_5px_rgba(0,0,0,0.8)]" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Parlons de <br />
              <span className="text-[#D4AF37] relative">votre projet</span>
            </h1>

            <p className="text-gray-300 text-lg sm:text-xl md:text-2xl mb-8 leading-relaxed">
              Une idée ? Un projet ? Notre équipe est à votre écoute pour transformer
              vos ambitions en réalité digitale.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Coordonnées ── */}
      <section className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={titleRef.ref}
            variants={fadeUp}
            initial="hidden"
            animate={titleRef.inView ? "visible" : "hidden"}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Nos <span className="text-[#D4AF37]">coordonnées</span>
            </h2>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={titleRef.inView ? { width: 120, opacity: 1 } : { width: 0, opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto"
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-xl hover:border-[#D4AF37] transition-all duration-300 text-center group"
              >
                <div className="flex justify-center mb-4">
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-[#D4AF37]/10 p-4 rounded-full group-hover:bg-[#D4AF37]/20 transition-all duration-300"
                  >
                    <div className="text-3xl">{method.icon}</div>
                  </motion.div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">
                  {method.title}
                </h3>

                {method.details.map((detail, i) => (
                  <p key={i} className="text-gray-400 text-sm mb-1">{detail}</p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Formulaire et Carte ── */}
      <section id="contact-form" className="bg-neutral-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulaire */}
            <ContactForm />

            {/* Carte et réseaux sociaux */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Carte */}
              <div className="bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Nous <span className="text-[#D4AF37]">trouver</span>
                </h3>

                <div className="aspect-video bg-neutral-800 rounded-lg overflow-hidden mb-6">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.613315915036!2d-3.996437!3d5.324783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1eda3b8b0b0b1%3A0x1b3b3b3b3b3b3b3b!2sAbidjan%2C%20C%C3%B4te%20d&#39;Ivoire!5e0!3m2!1sfr!2sfr!4v1620000000000!5m2!1sfr!2sfr"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    className="rounded-lg"
                    title="Carte Google Maps"
                  />
                </div>

                <div className="flex items-center gap-2 text-gray-400">
                  <IoLocationOutline className="text-[#D4AF37] text-xl" />
                  <span>Abidjan, Cocody - Rue des Jardins</span>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div className="bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Suivez-nous sur les <span className="text-[#D4AF37]">réseaux</span>
                </h3>

                <p className="text-gray-400 mb-6">
                  Restez connecté avec nous pour suivre nos actualités et projets.
                </p>

                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-neutral-800 hover:bg-[#D4AF37] text-gray-400 hover:text-black p-4 rounded-full transition-all duration-300"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-neutral-800">
                  <div className="flex items-center gap-3 text-gray-400">
                    <IoTimeOutline className="text-[#D4AF37] text-xl" />
                    <span>Disponibilité: 24h/24 - 7j/7 sur rendez-vous</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
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
              Questions <span className="text-[#D4AF37]">fréquentes</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Retrouvez les réponses aux questions les plus courantes sur nos services
            </p>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 120, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
              className="h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-4"
            />
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
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
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Prêt à <span className="text-[#D4AF37]">démarrer</span> ?
            </h2>

            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Contactez-nous dès maintenant pour discuter de votre projet.
              Notre équipe vous répondra sous 24h.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <motion.a
                href="tel:+2250707070707"
                whileTap={{ scale: 0.95 }}
                className="relative inline-block border-2 border-[#D4AF37] text-white text-lg px-8 py-4 overflow-hidden group"
              >
                <span className="absolute inset-0 bg-[#D4AF37] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 transition-colors duration-500 group-hover:text-black whitespace-nowrap flex items-center gap-2">
                  <HiOutlinePhone className="text-xl" />
                  APPELER MAINTENANT
                </span>
              </motion.a>

              <motion.a
                href="mailto:contact@black-agence.com"
                whileTap={{ scale: 0.95 }}
                className="relative inline-block border-2 border-white text-white text-lg px-8 py-4 overflow-hidden group"
              >
                <span className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 transition-colors duration-500 group-hover:text-black whitespace-nowrap flex items-center gap-2">
                  <HiOutlineMail className="text-xl" />
                  NOUS ÉCRIRE
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

export default Contact;