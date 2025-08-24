import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

// Hook personalizado para i18n con utilidades adicionales
export const useI18n = () => {
  const { t, i18n } = useTranslation();

  // Función para cambiar idioma
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // Actualizar dirección del documento para RTL
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lng;
  };

  // Función para formatear números
  const formatNumber = (value: number, options?: Intl.NumberFormatOptions) => {
    return new Intl.NumberFormat(i18n.language, options).format(value);
  };

  // Función para formatear moneda
  const formatCurrency = (value: number, currency?: string) => {
    const currencyCode = currency || (
      i18n.language === 'en' ? 'USD' :  
      'PYG'
    );
    
    return new Intl.NumberFormat(i18n.language, {
      style: 'currency',
      currency: currencyCode
    }).format(value);
  };

  // Función para formatear fechas
  const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(i18n.language, options).format(dateObj);
  };

  // Función para formatear fecha relativa
  const formatRelativeTime = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
    
    const rtf = new Intl.RelativeTimeFormat(i18n.language, { numeric: 'auto' });
    
    if (diffInSeconds < 60) {
      return rtf.format(-diffInSeconds, 'second');
    } else if (diffInSeconds < 3600) {
      return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
    } else if (diffInSeconds < 86400) {
      return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
    } else if (diffInSeconds < 2592000) {
      return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
    } else if (diffInSeconds < 31536000) {
      return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month');
    } else {
      return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year');
    }
  };

  // Función para obtener idiomas disponibles
  const getAvailableLanguages = () => [
    { code: 'es', name: 'Español', nativeName: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' }
  ];

  // Función para detectar si es RTL
  const isRTL = () => i18n.language === 'ar';

  // Configurar dirección del documento al cambiar idioma
  useEffect(() => {
    document.documentElement.dir = isRTL() ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return {
    t,
    i18n,
    currentLanguage: i18n.language,
    changeLanguage,
    formatNumber,
    formatCurrency,
    formatDate,
    formatRelativeTime,
    getAvailableLanguages,
    isRTL
  };
};