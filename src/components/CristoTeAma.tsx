import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Sun, 
  Moon, 
  Heart, 
  MessageCircle, 
  Send,
  Star,
  Sparkles,
  ArrowRight,
  Check,
  Zap,
  Crown,
  Shield,
  RefreshCw,
  BookOpen,
  MailOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CristoTeAmaProps {
  onNavigateHome: () => void;
  onNavigateContact: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const CristoTeAma: React.FC<CristoTeAmaProps> = ({ 
  onNavigateHome, 
  onNavigateContact, 
  isDark, 
  toggleTheme 
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentVerse, setCurrentVerse] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // Frases juveniles cristianas actualizadas
  const messages = [
    {
      text: "Cristo te ama. Tu ex no. 😉",
      icon: <Heart className="w-6 h-6" />,
      color: "from-pink-500 to-red-500"
    },
    {
      text: "Su amor es 24/7, sin modo avión. 📶",
      icon: <Zap className="w-6 h-6" />,
      color: "from-blue-500 to-purple-500"
    },
    {
      text: "Con Él no hay ghosting, siempre responde. 💬",
      icon: <MessageCircle className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      text: "Lo que otros dejaron, Él lo restaura. 🔄",
      icon: <RefreshCw className="w-6 h-6" />,
      color: "from-yellow-500 to-orange-500"
    },
    {
      text: "Cristo no solo te ama… te cambia la vida. 🚀",
      icon: <Crown className="w-6 h-6" />,
      color: "from-purple-500 to-indigo-500"
    }
  ];

  // Versículos bíblicos
  const verses = [
    "Josué 1:9 — Sé fuerte y valiente. No tengas miedo ni te desanimes, porque el Señor tu Dios te acompañará dondequiera que vayas.",
    "Isaías 41:10 — No tengas miedo, porque yo estoy contigo; no te desanimes, porque yo soy tu Dios. Te daré fuerzas y te ayudaré; te sostendré con mi mano victoriosa.",
    "Jeremías 29:11 — Mis planes para ustedes son planes de bienestar y no de calamidad, para darles un futuro y una esperanza.",
    "Salmos 37:4 — Deléitate en el Señor, y él te concederá los deseos de tu corazón.",
    "Romanos 8:38-39 — Nada podrá separarnos del amor de Dios que está en Cristo Jesús nuestro Señor.",
    "Filipenses 4:13 — Todo lo puedo en Cristo que me fortalece.",
    "2 Corintios 5:17 — El que está unido a Cristo es una nueva creación; lo viejo ha pasado, ha llegado lo nuevo.",
    "Salmos 46:1 — Dios es nuestro amparo y nuestra fortaleza, nuestra ayuda segura en momentos de angustia."
  ];

  // Cambiar mensaje cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [messages.length]);

  // Seleccionar versículo aleatorio al cargar
  useEffect(() => {
    const randomVerse = verses[Math.floor(Math.random() * verses.length)];
    setCurrentVerse(randomVerse);
  }, []);

  // Función para obtener nuevo versículo
  const getNewVerse = () => {
    const randomVerse = verses[Math.floor(Math.random() * verses.length)];
    setCurrentVerse(randomVerse);
  };

  // Animación de entrada
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const glowVariants = {
    animate: {
      boxShadow: [
        "0 0 20px rgba(59, 130, 246, 0.3)",
        "0 0 40px rgba(59, 130, 246, 0.5)",
        "0 0 20px rgba(59, 130, 246, 0.3)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 overflow-hidden ${
      isDark 
        ? 'bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950 text-white' 
        : 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 text-gray-900'
    }`}>
      
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className={`absolute top-20 left-10 w-20 h-20 rounded-full opacity-20 ${
            isDark ? 'bg-pink-500' : 'bg-pink-300'
          }`}
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '1s' }}
          className={`absolute top-40 right-20 w-16 h-16 rounded-full opacity-20 ${
            isDark ? 'bg-blue-500' : 'bg-blue-300'
          }`}
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
          className={`absolute bottom-40 left-20 w-12 h-12 rounded-full opacity-20 ${
            isDark ? 'bg-yellow-500' : 'bg-yellow-300'
          }`}
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '0.5s' }}
          className={`absolute bottom-20 right-10 w-24 h-24 rounded-full opacity-20 ${
            isDark ? 'bg-green-500' : 'bg-green-300'
          }`}
        />
      </div>

      {/* Header */}
      <header className="relative px-6 py-8 z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Navigation */}
          <nav className="flex items-center justify-between mb-8">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 backdrop-blur-sm hover:scale-105 ${
                isDark 
                  ? 'bg-white/10 border border-white/20 hover:bg-white/20' 
                  : 'bg-white/70 border border-white/40 hover:bg-white/90 shadow-lg'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Volver</span>
            </Link>

            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              className={`p-3 rounded-full transition-all duration-300 backdrop-blur-sm ${
                isDark 
                  ? 'bg-white/10 border border-white/20 hover:bg-white/20' 
                  : 'bg-white/70 border border-white/40 hover:bg-white/90 shadow-lg'
              }`}
              aria-label="Cambiar tema"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 pb-16 relative z-10">
        <motion.div 
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            
            {/* Logo/Icon */}
            <motion.div 
              className="flex justify-center mb-8"
              variants={itemVariants}
            >
              <motion.div
                variants={pulseVariants}
                animate="animate"
                className={`relative p-6 rounded-3xl ${
                  isDark 
                    ? 'bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30' 
                    : 'bg-gradient-to-br from-pink-100 to-purple-100 border border-pink-200 shadow-xl'
                }`}
              >
                <Heart className={`w-16 h-16 ${
                  isDark ? 'text-pink-400' : 'text-pink-600'
                } fill-current`} />
                
                {/* Sparkles decorativos */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-2 -right-2"
                >
                  <Sparkles className={`w-6 h-6 ${
                    isDark ? 'text-yellow-400' : 'text-yellow-500'
                  }`} />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Título Principal Actualizado */}
            <motion.h1 
              className="text-5xl md:text-7xl font-black mb-6 leading-tight"
              variants={itemVariants}
            >
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Cristo Te Ama
              </span>
            </motion.h1>

            {/* Subtítulo Actualizado */}
            <motion.p 
              className={`text-xl md:text-2xl font-medium mb-12 max-w-3xl mx-auto leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}
              variants={itemVariants}
            >
              Un amor real, que no falla y siempre está de tu lado.
            </motion.p>
          </div>

          {/* Carrusel de Frases Actualizado */}
          <motion.div 
            className="mb-16"
            variants={itemVariants}
          >
            <div className="max-w-4xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMessageIndex}
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.8 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className={`relative p-8 md:p-12 rounded-3xl text-center backdrop-blur-sm ${
                    isDark 
                      ? 'bg-white/5 border border-white/10' 
                      : 'bg-white/80 border border-white/40 shadow-2xl'
                  }`}
                >
                  {/* Icono del mensaje */}
                  <div className="flex justify-center mb-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${messages[currentMessageIndex].color}`}>
                      {React.cloneElement(messages[currentMessageIndex].icon, {
                        className: "w-8 h-8 text-white"
                      })}
                    </div>
                  </div>

                  {/* Texto del mensaje */}
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                    {messages[currentMessageIndex].text}
                  </h2>

                  {/* Indicadores de progreso */}
                  <div className="flex justify-center gap-2 mt-8">
                    {messages.map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentMessageIndex
                            ? `bg-gradient-to-r ${messages[currentMessageIndex].color}`
                            : isDark ? 'bg-white/20' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

                      <motion.h2
              className="text-5xl py-4 md:text-7xl font-black mb-6 leading-tight text-center"
              variants={itemVariants}
            >
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Mirá lo que Dios te puede dar:
              </span>
            </motion.h2>

          {/* Sección de Tres Bloques Actualizada */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            variants={itemVariants}
          >
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Un Amor sin filtros",
                description: "No importa tu pasado, Dios te ama tal como eres",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Su poder te transforma",
                description: "No es teoría, es experiencia real que cambia tu vida",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: <Crown className="w-8 h-8" />,
                title: "Te da un propósito",
                description: "Descubre para qué fuiste creado y vive con sentido",
                color: "from-purple-500 to-pink-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 ${
                  isDark 
                    ? 'bg-white/5 border border-white/10 hover:bg-white/10' 
                    : 'bg-white/80 border border-white/40 shadow-lg hover:shadow-2xl'
                }`}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4`}>
                  {React.cloneElement(feature.icon, { className: "w-8 h-8 text-white" })}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Versículo Aleatorio */}
          <motion.div 
            className="mb-16"
            variants={itemVariants}
          >
            <div className="max-w-4xl mx-auto">
              <motion.div
                variants={glowVariants}
                animate="animate"
                className={`relative p-8 md:p-12 rounded-3xl text-center backdrop-blur-sm ${
                  isDark 
                    ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30' 
                    : 'bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 shadow-2xl'
                }`}
              >
                {/* Partículas decorativas */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl">
                  <motion.div
                    animate={{ 
                      x: [0, 100, 0],
                      y: [0, -50, 0],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className={`absolute top-4 left-4 w-2 h-2 rounded-full ${
                      isDark ? 'bg-blue-400' : 'bg-blue-500'
                    }`}
                  />
                  <motion.div
                    animate={{ 
                      x: [0, -80, 0],
                      y: [0, 60, 0],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    className={`absolute top-8 right-8 w-1.5 h-1.5 rounded-full ${
                      isDark ? 'bg-purple-400' : 'bg-purple-500'
                    }`}
                  />
                </div>

                {/* Título del versículo */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <BookOpen className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                  <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Versículo para vos hoy
                  </h3>
                </div>

                {/* Versículo */}
                <p className={`text-lg md:text-xl leading-relaxed mb-6 italic ${
                  isDark ? 'text-blue-200' : 'text-blue-800'
                }`}>
                  {currentVerse}
                </p>

                {/* Botón para nuevo versículo */}
                <motion.button
                  onClick={getNewVerse}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    isDark
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30'
                      : 'bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200'
                  }`}
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Dame otro versículo</span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Call to Action Actualizado */}
          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <div className={`max-w-2xl mx-auto p-8 md:p-12 rounded-3xl backdrop-blur-sm ${
              isDark 
                ? 'bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20' 
                : 'bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-200 shadow-2xl'
            }`}>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                💬 ¿Listo para conocer a Alguien que nunca te va a soltar?
              </h3>
              <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                No es religión, es relación real.
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <MailOpen />
                  <span>Quiero vivirlo</span>
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </motion.button>

              <p className={`text-sm mt-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Sin compromisos, solo una conversación real
              </p>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/10 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            &copy; 2025 AjnebAlRevés · CristoTeAma - Un mensaje de esperanza para ti ❤️
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CristoTeAma;