import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import enTranslations from "./locales/en.json";
// Importar traducciones
import esTranslations from "./locales/es.json";

// Configuración de i18next
i18n
	// Detectar idioma del navegador
	.use(LanguageDetector)
	// Cargar traducciones desde archivos
	.use(Backend)
	// Conectar con React
	.use(initReactI18next)
	.init({
		// Idioma por defecto
		fallbackLng: "es",

		// Idiomas soportados
		supportedLngs: ["es", "en"],

		// Configuración de detección de idioma
		detection: {
			order: ["localStorage", "navigator", "htmlTag"],
			caches: ["localStorage"],
			lookupLocalStorage: "i18nextLng",
		},

		// Recursos de traducción inline (para desarrollo)
		resources: {
			es: {
				translation: esTranslations,
			},
			en: {
				translation: enTranslations,
			},
			ar: {
				translation: arTranslations,
			},
		},

		// Configuración de interpolación
		interpolation: {
			escapeValue: false, // React ya escapa por defecto
			formatSeparator: ",",
			format: (value, format, lng) => {
				// Formateo personalizado para números y fechas
				if (format === "number") {
					return new Intl.NumberFormat(lng).format(value);
				}
				if (format === "currency") {
					return new Intl.NumberFormat(lng, {
						style: "currency",
						currency: lng === "en" ? "USD" : lng === "ar" ? "SAR" : "PYG",
					}).format(value);
				}
				if (format === "date") {
					return new Intl.DateTimeFormat(lng).format(new Date(value));
				}
				if (format === "datetime") {
					return new Intl.DateTimeFormat(lng, {
						year: "numeric",
						month: "long",
						day: "numeric",
						hour: "2-digit",
						minute: "2-digit",
					}).format(new Date(value));
				}
				return value;
			},
		},

		// Configuración de backend para cargar traducciones
		backend: {
			loadPath: "/locales/{{lng}}.json",
		},

		// Configuración de desarrollo
		debug: process.env.NODE_ENV === "development",

		// Configuración de namespace
		defaultNS: "translation",
		ns: ["translation"],

		// Configuración de pluralización
		pluralSeparator: "_",
		contextSeparator: "_",

		// Configuración de RTL
		react: {
			useSuspense: false,
			bindI18n: "languageChanged loaded",
			bindI18nStore: "added removed",
			transEmptyNodeValue: "",
			transSupportBasicHtmlNodes: true,
			transKeepBasicHtmlNodesFor: ["br", "strong", "i", "em"],
		},
	});

export default i18n;
