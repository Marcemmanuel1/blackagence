import { useState, useEffect } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Gérer l'animation de fermeture
  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  // Gérer l'ouverture/fermeture
  const toggleMenu = () => {
    if (isOpen) {
      handleClose();
    } else {
      setIsOpen(true);
      setTimeout(() => {
        setIsAnimating(true);
      }, 10);
    }
  };

  // Fermer le menu si la fenêtre est redimensionnée au-dessus de md
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        handleClose();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <nav className="bg-black/90 fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between py-6 px-4 md:px-20">
        {/* Logo */}
        <div className="">
          <img src="/logo-black-agence.png" alt="Logo Black Agence" className="h-12 w-12" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-12 text-white uppercase tracking-wide">
          <a href="/" className="hover:text-gray-300 transition duration-300">ACCUEIL</a>
          <a href="/about" className="hover:text-gray-300 transition duration-300">À PROPOS</a>
          <a href="/services" className="hover:text-gray-300 transition duration-300">SERVICES</a>
          <a href="/realisations" className="hover:text-gray-300 transition duration-300">RÉALISATIONS</a>
          <a href="/contact" className="hover:text-gray-300 transition duration-300">CONTACT</a>
        </div>

        {/* Mobile Menu Button - Hamburger à 2 traits */}
        <button
          className="md:hidden text-white focus:outline-none relative z-50"
          onClick={toggleMenu}
          aria-label="Menu"
        >
          <div className="w-6 h-3 relative flex flex-col justify-between">
            <span
              className={`w-full h-0.5 bg-white transform transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}
            />
            <span
              className={`w-full h-0.5 bg-white transform transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''
                }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu avec animations */}
      {isOpen && (
        <>
          {/* Overlay avec fade */}
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'
              }`}
            onClick={handleClose}
          />

          {/* Menu avec slide */}
          <div
            className={`fixed top-0 right-0 h-full w-64 bg-black z-40 md:hidden shadow-2xl transform transition-transform duration-300 ease-in-out ${isAnimating ? 'translate-x-0' : 'translate-x-full'
              }`}
          >
            {/* Liens avec animations séquentielles */}
            <div className="flex flex-col items-start space-y-6 py-20 px-8 text-white uppercase tracking-wide">
              <a
                href="/"
                className={`hover:text-gray-300 transition-all duration-300 transform hover:translate-x-2 ${isAnimating ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  }`}
                style={{ transitionDelay: '50ms' }}
                onClick={handleClose}
              >
                ACCUEIL
              </a>

              <a
                href="/about"
                className={`hover:text-gray-300 transition-all duration-300 transform hover:translate-x-2 ${isAnimating ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  }`}
                style={{ transitionDelay: '200ms' }}
                onClick={handleClose}
              >
                À PROPOS
              </a>
              <a
                href="/services"
                className={`hover:text-gray-300 transition-all duration-300 transform hover:translate-x-2 ${isAnimating ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  }`}
                style={{ transitionDelay: '100ms' }}
                onClick={handleClose}
              >
                SERVICES
              </a>
              <a
                href="/realisations"
                className={`hover:text-gray-300 transition-all duration-300 transform hover:translate-x-2 ${isAnimating ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  }`}
                style={{ transitionDelay: '150ms' }}
                onClick={handleClose}
              >
                RÉALISATIONS
              </a>
              <a
                href="/contact"
                className={`hover:text-gray-300 transition-all duration-300 transform hover:translate-x-2 ${isAnimating ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  }`}
                style={{ transitionDelay: '250ms' }}
                onClick={handleClose}
              >
                CONTACT
              </a>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;