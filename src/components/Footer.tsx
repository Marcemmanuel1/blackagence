import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaPaperPlane
} from 'react-icons/fa';

function Footer() {
  const [email, setEmail] = React.useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici vous pouvez ajouter la logique d'inscription à la newsletter
    console.log('Inscription newsletter:', email);
    setEmail('');
    alert('Merci de vous être inscrit à notre newsletter !');
  };

  return (
    <footer className="bg-neutral-900 text-white border-t border-neutral-800">
      {/* Section principale du footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Colonne 1 - Logo et description */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img
                src="/logo-black-agence.png"
                alt="Black Agence"
                className="h-14 md:h-22 w-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.style.display = 'none';
                  // Afficher le texte de remplacement si l'image ne charge pas
                  const parent = target.parentElement;
                  if (parent) {
                    const fallback = document.createElement('div');
                    fallback.className = 'text-3xl font-bold text-[#D4AF37]';
                    fallback.textContent = 'BLACK';
                    parent.appendChild(fallback);
                  }
                }}
              />
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed">
              Nous transformons vos idées en expériences digitales mémorables.
              Design, développement et stratégie pour votre succès en ligne.
            </p>

            {/* Réseaux sociaux */}
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/people/Black-Agence/61578155935294/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-[#D4AF37] transition-colors duration-300 group"
              >
                <FaFacebookF className="text-gray-400 group-hover:text-black transition-colors duration-300" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-[#D4AF37] transition-colors duration-300 group"
              >
                <FaLinkedinIn className="text-gray-400 group-hover:text-black transition-colors duration-300" />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-xl font-bold text-[#D4AF37] mb-6">Liens Rapides</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/a-propos" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300">
                  à propos
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/realisations" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300">
                  Réalisations
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold text-[#D4AF37] mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-[#D4AF37] mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  Abidjan, II Cocody<br />2 plateau carrefour duncan
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-[#D4AF37] flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  <p>+225 07 78 24 75 99</p>
                  <p>+225 07 48 25 21 85</p>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-[#D4AF37] flex-shrink-0" />
                <a href="mailto:contact@blackagence.com" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 text-sm">
                  contact@blackagence.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold text-[#D4AF37] mb-6">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Inscrivez-vous pour recevoir nos dernières actualités et offres exclusives.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email"
                  required
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none transition-colors pr-12"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#D4AF37] hover:text-white transition-colors duration-300"
                >
                  <FaPaperPlane />
                </button>
              </div>
              <p className="text-xs text-gray-500">
                En vous inscrivant, vous acceptez de recevoir nos emails.
                Vous pouvez vous désinscrire à tout moment.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Barre du bas avec copyright */}
      <div className="border-t border-neutral-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Black Agence. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/mentions-legales" className="hover:text-[#D4AF37] transition-colors duration-300">
                Mentions légales
              </Link>
              <Link to="/politique-confidentialite" className="hover:text-[#D4AF37] transition-colors duration-300">
                Politique de confidentialité
              </Link>
              <Link to="/cookies" className="hover:text-[#D4AF37] transition-colors duration-300">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;