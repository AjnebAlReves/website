import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Sun, 
  Moon, 
  Mail, 
  User, 
  MessageSquare, 
  Send,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Star
} from 'lucide-react';

interface ContactProps {
  onNavigateHome: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const Contact: React.FC<ContactProps> = ({ onNavigateHome, isDark, toggleTheme }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Por favor ingresa un email válido';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'El asunto es obligatorio';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'El asunto debe tener al menos 3 caracteres';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es obligatorio';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const form = e.target as HTMLFormElement;
      const formDataToSend = new FormData(form);

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formDataToSend as any).toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Error en el envío');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'
    }`}>
      
      {/* Header */}
      <header className="relative px-6 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Navigation */}
          <nav className="flex items-center justify-between mb-12">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 ${
                isDark 
                  ? 'bg-white/10 border border-white/20 hover:bg-white/20' 
                  : 'bg-gray-900/10 border border-gray-900/20 hover:bg-gray-900/20'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Volver</span>
            </Link>

            <button
              onClick={toggleTheme}
              className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                isDark 
                  ? 'bg-white/10 border border-white/20 hover:bg-white/20' 
                  : 'bg-gray-900/10 border border-gray-900/20 hover:bg-gray-900/20'
              }`}
              aria-label="Cambiar tema"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </nav>

          {/* Title Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mail className={`w-8 h-8 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                Contacto
              </h1>
            </div>
            <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              ¿Tienes alguna pregunta o propuesta? Me encantaría escucharte. Completa el formulario y te responderé lo antes posible.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className={`rounded-2xl p-8 ${
                isDark 
                  ? 'bg-white/5 border border-white/10' 
                  : 'bg-white border border-gray-200 shadow-lg'
              }`}>
                
                {/* Success Message */}
                {submitStatus === 'success' && (
                  <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                    isDark ? 'bg-green-500/20 border border-green-500/30 text-green-400' : 'bg-green-50 border border-green-200 text-green-700'
                  }`}>
                    <CheckCircle className="w-5 h-5" />
                    <div>
                      <p className="font-medium">¡Mensaje enviado exitosamente!</p>
                      <p className="text-sm opacity-90">Te responderé lo antes posible.</p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                    isDark ? 'bg-red-500/20 border border-red-500/30 text-red-400' : 'bg-red-50 border border-red-200 text-red-700'
                  }`}>
                    <AlertCircle className="w-5 h-5" />
                    <div>
                      <p className="font-medium">Error al enviar el mensaje</p>
                      <p className="text-sm opacity-90">Por favor intenta nuevamente.</p>
                    </div>
                  </div>
                )}

                <form 
                  name="contact" 
                  method="POST" 
                  data-netlify="true" 
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  noValidate
                >
                  {/* Netlify Form Detection */}
                  <input type="hidden" name="form-name" value="contact" />
                  
                  {/* Honeypot Field */}
                  <div className="hidden">
                    <label htmlFor="bot-field">No llenar si eres humano:</label>
                    <input id="bot-field" name="bot-field" />
                  </div>

                  {/* Name Field */}
                  <div>
                    <label 
                      htmlFor="name" 
                      className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-200' : 'text-gray-700'
                      }`}
                    >
                      Nombre completo *
                    </label>
                    <div className="relative">
                      <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        minLength={2}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                          errors.name
                            ? isDark
                              ? 'bg-red-500/10 border-red-500/50 text-white placeholder-red-300'
                              : 'bg-red-50 border-red-300 text-gray-900 placeholder-red-400'
                            : isDark
                              ? 'bg-white/5 border-white/20 text-white placeholder-gray-400 hover:border-white/30'
                              : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 hover:border-gray-400'
                        }`}
                        placeholder="Tu nombre completo"
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                    </div>
                    {errors.name && (
                      <p id="name-error" className={`mt-2 text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label 
                      htmlFor="email" 
                      className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-200' : 'text-gray-700'
                      }`}
                    >
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                          errors.email
                            ? isDark
                              ? 'bg-red-500/10 border-red-500/50 text-white placeholder-red-300'
                              : 'bg-red-50 border-red-300 text-gray-900 placeholder-red-400'
                            : isDark
                              ? 'bg-white/5 border-white/20 text-white placeholder-gray-400 hover:border-white/30'
                              : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 hover:border-gray-400'
                        }`}
                        placeholder="tu@email.com"
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                    </div>
                    {errors.email && (
                      <p id="email-error" className={`mt-2 text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label 
                      htmlFor="subject" 
                      className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-200' : 'text-gray-700'
                      }`}
                    >
                      Asunto *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      minLength={3}
                      className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                        errors.subject
                          ? isDark
                            ? 'bg-red-500/10 border-red-500/50 text-white placeholder-red-300'
                            : 'bg-red-50 border-red-300 text-gray-900 placeholder-red-400'
                          : isDark
                            ? 'bg-white/5 border-white/20 text-white placeholder-gray-400 hover:border-white/30'
                            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 hover:border-gray-400'
                      }`}
                      placeholder="¿De qué quieres hablar?"
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                    />
                    {errors.subject && (
                      <p id="subject-error" className={`mt-2 text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label 
                      htmlFor="message" 
                      className={`block text-sm font-medium mb-2 ${
                        isDark ? 'text-gray-200' : 'text-gray-700'
                      }`}
                    >
                      Mensaje *
                    </label>
                    <div className="relative">
                      <MessageSquare className={`absolute left-3 top-3 w-5 h-5 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        minLength={10}
                        rows={6}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-vertical ${
                          errors.message
                            ? isDark
                              ? 'bg-red-500/10 border-red-500/50 text-white placeholder-red-300'
                              : 'bg-red-50 border-red-300 text-gray-900 placeholder-red-400'
                            : isDark
                              ? 'bg-white/5 border-white/20 text-white placeholder-gray-400 hover:border-white/30'
                              : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 hover:border-gray-400'
                        }`}
                        placeholder="Cuéntame tu idea, proyecto o pregunta..."
                        aria-describedby={errors.message ? "message-error" : undefined}
                      />
                    </div>
                    {errors.message && (
                      <p id="message-error" className={`mt-2 text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                        {errors.message}
                      </p>
                    )}
                    <p className={`mt-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      Mínimo 10 caracteres. Actual: {formData.message.length}
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                      isDark
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Enviando...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Enviar Mensaje</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Featured Link - Stopify */}
<div className={`rounded-2xl p-6 relative overflow-hidden ${
  isDark 
    ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30' 
    : 'bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-200'
}`}>
  <div className={`absolute top-3 right-3 p-2 rounded-full ${
    isDark ? 'bg-yellow-400/20 text-yellow-400' : 'bg-yellow-100 text-yellow-600'
  }`}>
    <Star className="w-4 h-4 fill-current" />
  </div>
  
  <h3 className={`text-lg font-bold mb-3 ${
    isDark ? 'text-purple-300' : 'text-purple-800'
  }`}>
    🙌 ¿Puedo orar por ti?
  </h3>
  
  <p className={`text-sm mb-4 leading-relaxed ${
    isDark ? 'text-purple-200' : 'text-purple-700'
  }`}>
    Queremos acompañarte en lo que estés viviendo. Deja tu petición y un equipo estará orando por ti de forma confidencial.
  </p>
  
  <a
    href="https://forms.gle/qrfGtC5iNDu46XS57"
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
      isDark
        ? 'bg-purple-500/30 text-purple-300 border border-purple-500/50 hover:bg-purple-500/40'
        : 'bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg'
    }`}
  >
    <span>Link al Formulario</span>
    <ExternalLink className="w-4 h-4" />
  </a>
</div>
{/* Contact Info */}
              <div className={`rounded-2xl p-6 ${
                isDark 
                  ? 'bg-white/5 border border-white/10' 
                  : 'bg-white border border-gray-200 shadow-lg'
              }`}>
                <h3 className="text-lg font-bold mb-4">Información de Contacto</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Respuesta en 24-48 horas
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className={`rounded-2xl p-6 ${
                isDark 
                  ? 'bg-white/5 border border-white/10' 
                  : 'bg-white border border-gray-200 shadow-lg'
              }`}>
                <h3 className="text-lg font-bold mb-4">Preguntas Frecuentes</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-sm mb-1">¿Cuánto tardas en responder?</p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Normalmente respondo en 24-48 horas.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-1">¿Qué tipo de proyectos aceptas?</p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      Desarrollo web, hosting, diseño y consultoría.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            &copy; 2025 AjnebAlRevés · Formulario de Contacto
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;