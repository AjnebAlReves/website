import { 
  AlertCircle,
  ArrowLeft, 
  CheckCircle,
  ExternalLink,
  Mail, 
  MessageSquare, 
  Moon, 
  Send,
  Star, 
  Sun, 
  User 
} from 'lucide-react';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '/workspaces/byalreves.lat/src/hooks/useI18n';
import { useI18n } from '../hooks/useI18n';

interface ContactProps {
  onNavigateHome: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

const Contact: React.FC<ContactProps> = ({ isDark, toggleTheme }) => {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
<<<<<<< HEAD
=======
  const { t } = useI18n();
>>>>>>> e8a498c (Add meta tags, update contact form, and restructure links and projects dat)
  const DRAFT_KEY = 'contactDraft:v1';

  // Refs for focusing fields on validation errors
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const subjectRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  // Keep last attempted payload to support retry
  const lastAttemptRef = useRef<typeof formData | null>(null);

  const MAX_RETRIES = 2; // number of automatic retries on transient failures

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t('contact.validation.nameRequired');
    } else if (formData.name.trim().length < 2) {
      newErrors.name = t('contact.validation.nameMinLength');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contact.validation.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.validation.emailInvalid');
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t('contact.validation.subjectRequired');
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = t('contact.validation.subjectMinLength');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contact.validation.messageRequired');
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('contact.validation.messageMinLength');
    }

    setErrors(newErrors);
    // If there are validation errors, focus the first invalid field for accessibility
    const keys = Object.keys(newErrors);
    if (keys.length > 0) {
      const first = keys[0];
      if (first === 'name') nameRef.current?.focus();
      else if (first === 'email') emailRef.current?.focus();
      else if (first === 'subject') subjectRef.current?.focus();
      else if (first === 'message') messageRef.current?.focus();
    }

    return keys.length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Autosave draft
    try {
      const next = { ...formData, [name]: value };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(next));
    } catch {
      // ignore localStorage errors (privacy mode etc.)
    }
  };

  // Load draft on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Only restore if form is empty (avoid overwriting intentional navigation)
        if (formData.name === '' && formData.email === '' && formData.subject === '' && formData.message === '') {
          setFormData(parsed);
        }
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper to actually send the message with retries
  const sendMessage = async (payload: typeof formData, attempt = 0): Promise<void> => {
    lastAttemptRef.current = payload;
    try {
      const res = await fetch('https://eok6mbw1n9jwv47.m.pipedream.net', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitStatus('success');
        setErrors({});
        setFormData({ name: '', email: '', subject: '', message: '' });
        try { localStorage.removeItem(DRAFT_KEY); } catch { /* ignore */ }
        return;
      }

      // Try to extract server-provided message
      let serverMsg = `Error ${res.status}`;
      try {
        const txt = await res.text();
        if (txt) {
          // try JSON then fallback to text
          try {
            const j = JSON.parse(txt);
            serverMsg = j.message || j.error || JSON.stringify(j);
          } catch {
            serverMsg = txt;
          }
        }
      } catch {
        // ignore
      }

      // For non-OK responses, treat as transient up to MAX_RETRIES
      if (attempt < MAX_RETRIES) {
        const backoff = 500 * 2 ** attempt;
        await new Promise(r => setTimeout(r, backoff));
        return sendMessage(payload, attempt + 1);
      }

      setErrors(prev => ({ ...prev, server: serverMsg }));
      throw new Error(serverMsg);
    } catch (err) {
      // If offline, provide a clearer message
      if (!navigator.onLine) {
        setErrors(prev => ({ ...prev, network: 'Parece que estás sin conexión. Intenta nuevamente cuando tengas conexión.' }));
      }
      // if there was a server error already set, keep it; otherwise set generic
      if (!errors.server && navigator.onLine) {
        setErrors(prev => ({ ...prev, server: 'Error al enviar el mensaje. Intenta nuevamente.' }));
      }
      setSubmitStatus('error');
      console.error('Error sending message:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
  setIsSubmitting(true);
  setSubmitStatus('idle');
  await sendMessage(formData, 0);
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
              <span className="text-sm font-medium">{t('navigation.back')}</span>
            </Link>

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
          </nav>

          {/* Title Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Mail className={`w-8 h-8 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
                {t('contact.title')}
              </h1>
            </div>
              <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {t('contact.description')}
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
                      <p className="font-medium">{t('contact.success.title')}</p>
                      <p className="text-sm opacity-90">{t('contact.success.description')}</p>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
                    isDark ? 'bg-red-500/20 border border-red-500/30 text-red-400' : 'bg-red-50 border border-red-200 text-red-700'
                  }`} role="status" aria-live="polite">
                    <AlertCircle className="w-5 h-5" />
                    <div className="flex-1">
                      <p className="font-medium">Error al enviar el mensaje</p>
                      <p className="text-sm opacity-90">
                        {errors.network || errors.server || 'Por favor intenta nuevamente.'}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <button
                        type="button"
                        onClick={async () => {
                          if (!lastAttemptRef.current) return;
                          setIsSubmitting(true);
                          setSubmitStatus('idle');
                          await sendMessage(lastAttemptRef.current, 0);
                        }}
                        className={`ml-2 inline-flex items-center gap-2 px-3 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-105 ${
                          isDark ? 'bg-red-600/20 border border-red-600/30 text-red-400' : 'bg-red-600 text-white hover:bg-red-700'
                        }`}
                      >
                        Reintentar
                      </button>
                    </div>
                  </div>
                )}

                {/* ARIA live region for general feedback */}
                <div aria-live="polite" className="sr-only">
                  {submitStatus === 'success' ? t('contact.success.title') : submitStatus === 'error' ? t('contact.error.title') : ''}
                </div>

                <form 
                  name="contact" 
                  method="POST" 
                  
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  noValidate
                >
                  {/* Netlify Form Detection */}
                  <input type="hidden" name="form-name" value="contact" />
                  
                  {/* Honeypot Field */}
                  <div className="hidden">
                    <label htmlFor="bot-field">{t('contact.form.honeypotLabel') || 'No llenar si eres humano:'}</label>
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
                      {t('contact.form.name')} *
                    </label>
                    <div className="relative">
                      <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        ref={nameRef}
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
                        placeholder={t('contact.form.namePlaceholder')}
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
                      {t('contact.form.email')} *
                    </label>
                    <div className="relative">
                      <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        ref={emailRef}
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
                        placeholder={t('contact.form.emailPlaceholder')}
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
                      {t('contact.form.subject')} *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      ref={subjectRef}
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
                      placeholder={t('contact.form.subjectPlaceholder')}
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
                      {t('contact.form.message')} *
                    </label>
                    <div className="relative">
                      <MessageSquare className={`absolute left-3 top-3 w-5 h-5 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <textarea
                        id="message"
                        name="message"
                        ref={messageRef}
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
                        placeholder={t('contact.form.messagePlaceholder')}
                        aria-describedby={errors.message ? "message-error" : undefined}
                      />
                    </div>
                    {errors.message && (
                      <p id="message-error" className={`mt-2 text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                        {errors.message}
                      </p>
                    )}
                    <p className={`mt-2 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t('contact.form.characterCount', { count: formData.message.length })}
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
                        <span>{t('contact.form.submitting')}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>{t('contact.form.submit')}</span>
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
  {t('contact.sidebar.prayerTitle')}
  </h3>
  
  <p className={`text-sm mb-4 leading-relaxed ${
    isDark ? 'text-purple-200' : 'text-purple-700'
  }`}>
  {t('contact.sidebar.prayerDescription')}
  </p>
  
  <a
    href="https://docs.google.com/forms/d/e/1FAIpQLSdMWZcRbUojQhNSrC2QUGxgW0D1_d_DBbjoPlQN-UeQflggow/viewform?usp=pp_url&entry.1162615029=Benja/byalreves.lat"
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${
      isDark
        ? 'bg-purple-500/30 text-purple-300 border border-purple-500/50 hover:bg-purple-500/40'
        : 'bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg'
    }`}
  >
  <span>{t('contact.sidebar.prayerButton')}</span>
    <ExternalLink className="w-4 h-4" />
  </a>
</div>
{/* Contact Info */}
              <div className={`rounded-2xl p-6 ${
                isDark 
                  ? 'bg-white/5 border border-white/10' 
                  : 'bg-white border border-gray-200 shadow-lg'
              }`}>
                <h3 className="text-lg font-bold mb-4">{t('contact.sidebar.contactInfo')}</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                    <div>
                      <p className="font-medium">{t('contact.sidebar.contactInfo')}</p>
                      <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {t('contact.sidebar.responseTime')}
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
                <h3 className="text-lg font-bold mb-4">{t('contact.sidebar.faq')}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-sm mb-1">{t('contact.sidebar.faqResponse')}</p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t('contact.sidebar.faqResponseAnswer')}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-sm mb-1">{t('contact.sidebar.faqProjects')}</p>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {t('contact.sidebar.faqProjectsAnswer')}
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
            &copy; 2025 AjnebAlReves · {t('contact.footer')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
