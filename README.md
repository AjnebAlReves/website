# Internacionalización (i18n) - Guía de Implementación

## 📋 Plan de Implementación Completo

### 🚀 **Stack Tecnológico**
- **react-i18next**: Librería principal para i18n en React
- **i18next**: Core de internacionalización
- **i18next-browser-languagedetector**: Detección automática de idioma
- **i18next-http-backend**: Carga de traducciones desde archivos
- **date-fns**: Formateo avanzado de fechas
- **Intl API**: APIs nativas del navegador para formateo

### 🌍 **Idiomas Soportados**
- **Español (es)** - Idioma por defecto
- **Inglés (en)** - Mercado internacional
- **Árabe (ar)** - Soporte RTL completo

## 🛠️ **Características Implementadas**

### **1. Traducción de Texto**
```typescript
// Hook personalizado useI18n
const { t } = useI18n();

// Uso básico
t('navigation.home') // "Inicio" / "Home" / "الرئيسية"

// Con interpolación
t('home.footer', { year: 2025 }) // "© 2025 AjnebAlRevés"

// Con pluralización
t('dates.daysAgo', { count: 5 }) // "hace 5 días" / "5 days ago"
```

### **2. Formateo de Fechas y Números**
```typescript
const { formatDate, formatNumber, formatCurrency } = useI18n();

// Fechas
formatDate(new Date(), { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
});

// Números
formatNumber(1234.56); // "1.234,56" (es) / "1,234.56" (en)

// Moneda
formatCurrency(99.99); // "$99.99" (en) / "99,99 ₲" (es)
```

### **3. Soporte RTL (Right-to-Left)**
```typescript
// Detección automática de RTL
const { isRTL } = useI18n();

// Clases CSS dinámicas
className={`flex ${isRTL() ? 'flex-row-reverse' : 'flex-row'}`}

// Utilidades RTL
import { rtlClasses, useRTLClasses } from '../utils/rtl';
```

### **4. Selector de Idioma**
- **Componente LanguageSwitcher** con dropdown animado
- **Banderas y nombres nativos** de idiomas
- **Persistencia en localStorage**
- **Detección automática** del idioma del navegador

## 📁 **Estructura de Archivos**

```
src/
├── i18n/
│   ├── config.ts              # Configuración principal
│   └── locales/
│       ├── es.json           # Traducciones español
│       ├── en.json           # Traducciones inglés
│       └── ar.json           # Traducciones árabe
├── hooks/
│   └── useI18n.ts            # Hook personalizado
├── components/
│   └── LanguageSwitcher.tsx  # Selector de idioma
├── utils/
│   └── rtl.ts                # Utilidades RTL
└── public/
    └── locales/              # Traducciones públicas
        ├── es.json
        ├── en.json
        └── ar.json
```

## 🎨 **Configuración RTL**

### **CSS/Tailwind**
```css
/* Soporte RTL automático */
.rtl { direction: rtl; }
.ltr { direction: ltr; }

/* Clases responsive RTL */
.ml-4.rtl\:mr-4.rtl\:ml-0 { /* margin adaptativo */ }
```

### **JavaScript**
```typescript
// Configuración automática del documento
useEffect(() => {
  document.documentElement.dir = isRTL() ? 'rtl' : 'ltr';
  document.documentElement.lang = i18n.language;
}, [i18n.language]);
```

## 🔧 **Herramientas Recomendadas**

### **Desarrollo**
- **i18next DevTools**: Extensión del navegador para debugging
- **react-i18next DevTools**: Herramientas de desarrollo React
- **i18next-parser**: Extracción automática de claves de traducción

### **Gestión de Traducciones**
- **Crowdin**: Plataforma colaborativa de traducción
- **Lokalise**: Gestión profesional de traducciones
- **Weblate**: Alternativa open-source

### **Testing**
```typescript
// Test de traducciones
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n/config';

const renderWithI18n = (component) => {
  return render(
    <I18nextProvider i18n={i18n}>
      {component}
    </I18nextProvider>
  );
};
```

## 📱 **Optimización Móvil**

### **Responsive RTL**
- **Flexbox adaptativo** para diferentes direcciones
- **Espaciado dinámico** según idioma
- **Iconos rotativos** para RTL (flechas, etc.)

### **Performance**
- **Lazy loading** de traducciones
- **Code splitting** por idioma
- **Caching** de traducciones en localStorage

## 🚀 **Próximos Pasos**

### **Fase 1: Básico** ✅
- [x] Configuración i18next
- [x] Traducciones básicas (es, en, ar)
- [x] Selector de idioma
- [x] Soporte RTL

### **Fase 2: Avanzado**
- [ ] Pluralización compleja
- [ ] Contextos de traducción
- [ ] Formateo de direcciones
- [ ] Zonas horarias

### **Fase 3: Profesional**
- [ ] Integración con CMS
- [ ] Traducciones automáticas (AI)
- [ ] A/B testing multiidioma
- [ ] Analytics por idioma

## 🔍 **Debugging**

### **Herramientas de Desarrollo**
```typescript
// Habilitar debug en desarrollo
i18n.init({
  debug: process.env.NODE_ENV === 'development',
  // ... otras opciones
});

// Logs de traducciones faltantes
i18n.on('missingKey', (lng, namespace, key) => {
  console.warn(`Missing translation: ${lng}.${namespace}.${key}`);
});
```

### **Validación de Traducciones**
```bash
# Script para validar completitud de traducciones
npm run i18n:validate

# Extraer nuevas claves de traducción
npm run i18n:extract
```

## 📊 **Métricas y Analytics**

### **Seguimiento de Uso**
```typescript
// Tracking de cambios de idioma
const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
  
  // Analytics
  gtag('event', 'language_change', {
    language: lng,
    previous_language: i18n.language
  });
};
```

Esta implementación proporciona una base sólida y escalable para internacionalización, con soporte completo para múltiples idiomas, formateo regional y layouts RTL.