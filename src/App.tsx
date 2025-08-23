import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Github, Globe, Instagram, Briefcase, Heart } from 'lucide-react';
import { FaUserAstronaut } from "react-icons/fa";
import { Mail } from 'lucide-react';
import { useI18n } from './hooks/useI18n';
import LanguageSwitcher from './components/LanguageSwitcher';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import CristoTeAma from './components/CristoTeAma';
import { motion, AnimatePresence } from 'framer-motion';

// Componente principal de la página de inicio
function HomePage() {
  const [isDark, setIsDark] = useState(true);
  const [currentVerse, setCurrentVerse] = useState('');
  const { t, formatDate, isRTL } = useI18n();

  const verses = [
    "Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas. (Mateo 6:33)",
    "Todo lo puedo en Cristo que me fortalece. (Filipenses 4:13)",
    "El Señor es mi pastor; nada me faltará. (Salmos 23:1)",
    "Porque yo sé los planes que tengo para ustedes, declara el Señor. (Jeremías 29:11)",
    "Lámpara es a mis pies tu palabra, y lumbrera a mi camino. (Salmos 119:105)"
  ];

  useEffect(() => {
    // Verificar tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDark(false);
    }

    // Seleccionar versículo aleatorio
    const randomVerse = verses[Math.floor(Math.random() * verses.length)];
    setCurrentVerse(randomVerse);
  }, []);

  const copyVerse = () => {
    navigator.clipboard.writeText(currentVerse);
    alert("📋 Versículo copiado al portapapeles");
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const links = [
    {
      href: "https://github.com/ajnebalreves",
      icon: <Github className="w-5 h-5" />,
      text: "GitHub",
      description: t('github'),
      external: true
    },
    {
      href: "https://flyxnodes.xyz",
      icon: <FaUserAstronaut className="w-5 h-5" />,
      text: "FlyxNodes (Hosting)",
      description: t('hosting'),
      external: true
    },
    {
      href: "/portfolio",
      icon: <Briefcase className="w-5 h-5" />,
      text: t('navigation.portfolio'),
      description: t('portfolio.description'),
      external: false
    },
    {
      href: "/cristoteama",
      icon: <Heart className="w-5 h-5" />,
      text: t('navigation.cristoteama'),
      description: t('cristoteama.subtitle'),
      external: false
    },
    {
      href: "/contacto",
      icon: <Mail className="w-5 h-5" />,
      text: t('navigation.contact'),
      description: t('contact.description'),
      external: false
    },
    {
      href: "https://instagram.com/ajnebalreves",
      icon: <Instagram className="w-5 h-5" />,
      text: "Instagram",
      description: "Contenido visual y updates",
      external: true
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'
    }`}>
      <div className="flex flex-col items-center px-4 pt-16 pb-8">
        
        {/* Toggle Tema */}
        <div className={`absolute top-6 flex items-center gap-3 ${
          isRTL() ? 'left-6' : 'right-6'
        }`}>
          <LanguageSwitcher isDark={isDark} />
          <button
            onClick={toggleTheme}
            className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
              isDark 
                ? 'bg-white/10 border border-white/20 hover:bg-white/20' 
                : 'bg-gray-900/10 border border-gray-900/20 hover:bg-gray-900/20'
            }`}
            aria-label={t('navigation.toggleTheme')}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Avatar */}
        <div className="relative mb-6">
          <div className={`absolute inset-0 rounded-full blur-xl opacity-30 ${
            isDark ? 'bg-emerald-400' : 'bg-emerald-500'
          }`}></div>
          <img 
            src="https://avatars.githubusercontent.com/u/188276955" 
            alt="AjnebAlRevés" 
            className="relative w-32 h-32 rounded-full shadow-2xl border-4 border-white/20 hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Información Personal */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            {t('home.title')}
          </h1>
          <p className={`text-sm mb-4 max-w-sm leading-relaxed ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {t('home.description')}
          </p>
        </div>

        {/* Versículo */}
        <div className={`mb-8 p-4 rounded-xl max-w-md text-center ${
          isDark 
            ? 'bg-emerald-500/10 border border-emerald-500/20' 
            : 'bg-emerald-50 border border-emerald-200'
        }`}>
          <p className={`text-sm italic leading-relaxed ${
            isDark ? 'text-emerald-300' : 'text-emerald-700'
          }`}>
            📖 {currentVerse}
          </p>
          <button onClick={copyVerse} className="text-xs mt-2 underline hover:opacity-80">
            {t('home.copyVerse')}
          </button>
        </div>

        {/* Enlaces */}
        <div className="w-full max-w-md space-y-3">
          {links.map((link, index) => (
            link.external ? (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group block p-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl ${
                  isDark 
                    ? 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20' 
                    : 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl ${
                    isDark ? 'bg-white/10' : 'bg-gray-100'
                  } group-hover:scale-110 transition-transform duration-300`}>
                    {link.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-base">{link.text}</div>
                    <div className={`text-xs ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {link.description}
                    </div>
                  </div>
                  <div className={`text-2xl opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ${
                    isDark ? 'text-white' : 'text-gray-600'
                  }`}>
                    →
                  </div>
                </div>
              </a>
            ) : (
              <Link
                key={index}
                to={link.href}
                className={`group block p-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl ${
                  isDark 
                    ? 'bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20' 
                    : 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl ${
                    isDark ? 'bg-white/10' : 'bg-gray-100'
                  } group-hover:scale-110 transition-transform duration-300`}>
                    {link.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-base">{link.text}</div>
                    <div className={`text-xs ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {link.description}
                    </div>
                  </div>
                  <div className={`text-2xl opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ${
                    isDark ? 'text-white' : 'text-gray-600'
                  }`}>
                    →
                  </div>
                </div>
              </Link>
            )
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className={`text-xs ${
            isDark ? 'text-gray-500' : 'text-gray-400'
          }`}>
            {t('home.footer', { year: new Date().getFullYear() })}
          </p>
        </div>

      </div>
    </div>
  );
}

// Wrapper para componentes que necesitan tema
function ThemeWrapper({ children }: { children: (isDark: boolean, toggleTheme: () => void) => React.ReactNode }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return <>{children(isDark, toggleTheme)}</>;
}

// Componente principal de la aplicación
function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <HomePage />
            </motion.div>
          } 
        />
        <Route 
          path="/portfolio" 
          element={
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
            >
              <ThemeWrapper>
                {(isDark, toggleTheme) => (
                  <Portfolio 
                    onNavigateHome={() => window.history.back()} 
                    isDark={isDark} 
                    toggleTheme={toggleTheme} 
                  />
                )}
              </ThemeWrapper>
            </motion.div>
          } 
        />
        <Route 
          path="/contacto" 
          element={
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
            >
              <ThemeWrapper>
                {(isDark, toggleTheme) => (
                  <Contact 
                    onNavigateHome={() => window.history.back()} 
                    isDark={isDark} 
                    toggleTheme={toggleTheme} 
                  />
                )}
              </ThemeWrapper>
            </motion.div>
          } 
        />
        <Route 
          path="/cristoteama" 
          element={
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.4 }}
            >
              <ThemeWrapper>
                {(isDark, toggleTheme) => (
                  <CristoTeAma 
                    onNavigateHome={() => window.history.back()}
                    onNavigateContact={() => window.location.href = '/contacto'}
                    isDark={isDark} 
                    toggleTheme={toggleTheme} 
                  />
                )}
              </ThemeWrapper>
            </motion.div>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

// Wrapper principal con Router
export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}