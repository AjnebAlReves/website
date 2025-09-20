import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import {
	Route,
	BrowserRouter as Router,
	Routes,
	useLocation,
} from "react-router-dom";
import { BentoCard } from "./components/BentoCard";
import Contact from "./components/Contact";
import CristoTeAma from "./components/CristoTeAma";
import LanguageSwitcher from "./components/LanguageSwitcher";
import Portfolio from "./components/Portfolio";
import { ProfileBox } from "./components/ProfileBox";
import { VerseBox } from "./components/VerseBox";
import linksData from "./data/links.json";
import { useI18n } from "./hooks/useI18n";

// Removed redeclared Link interface

// Componente principal de la página de inicio
function HomePage() {
	const [isDark, setIsDark] = useState(true);
	const [currentVerse, setCurrentVerse] = useState("");
	const { t, isRTL } = useI18n();

	const verses = React.useMemo(
		() => [
			"Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas. (Mateo 6:33)",
			"Todo lo puedo en Cristo que me fortalece. (Filipenses 4:13)",
			"El Señor es mi pastor; nada me faltará. (Salmos 23:1)",
			"Porque yo sé los planes que tengo para ustedes, declara el Señor. (Jeremías 29:11)",
			"Lámpara es a mis pies tu palabra, y lumbrera a mi camino. (Salmos 119:105)",
		],
		[],
	);

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme === "light") {
			setIsDark(false);
		}

		const randomVerse = verses[Math.floor(Math.random() * verses.length)];
		setCurrentVerse(randomVerse);
	}, [verses]);

	const copyVerse = () => {
		navigator.clipboard.writeText(currentVerse);
		alert("📋 Versículo copiado al portapapeles");
	};

	const toggleTheme = () => {
		const newTheme = !isDark;
		setIsDark(newTheme);
		localStorage.setItem("theme", newTheme ? "dark" : "light");
	};

	const getIcon = (iconName: string) => {
		if (iconName === "FaUserAstronaut") {
			return <FaUserAstronaut className="w-5 h-5" />;
		}
		if (iconName === "Sun") return <Sun className="w-5 h-5" />;
		if (iconName === "Moon") return <Moon className="w-5 h-5" />;
		return null;
	};

	const mappedLinks = linksData.map((link: { href: string; icon: string; text: string; description?: string; descriptionKey?: string; external: boolean }) => ({
		...link,
		icon: getIcon(link.icon),
		description: link.descriptionKey
			? t(link.descriptionKey)
			: link.description,
	}));

	return (
		<div
			className={`min-h-screen transition-all duration-500 ${
				isDark
					? "bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white"
					: "bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900"
			}`}
		>
			<div className="container mx-auto px-4 pt-16 pb-8">
				{/* Theme Toggle & Language */}
				<div
					className={`absolute top-6 flex items-center gap-3 ${
						isRTL() ? "left-6" : "right-6"
					}`}
				>
					<LanguageSwitcher isDark={isDark} />
								<button
									type="button"
									onClick={toggleTheme}
									className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
										isDark
											? "bg-white/10 border border-white/20 hover:bg-white/20"
											: "bg-gray-900/10 border border-gray-900/20 hover:bg-gray-900/20"
									}`}
									aria-label={t("navigation.toggleTheme")}
								>
									{isDark ? (
										<Sun className="w-5 h-5" />
									) : (
										<Moon className="w-5 h-5" />
									)}
								</button>
				</div>

				{/* Bento Grid Layout */}
				<div className="max-w-4xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{/* Profile Box - Spans 2 columns */}
						<ProfileBox
							isDark={isDark}
							avatarUrl="https://avatars.githubusercontent.com/u/188276955"
							title={t("home.title")}
							description={t("home.description")}
						/>

						{/* Verse Box */}
						<VerseBox
							isDark={isDark}
							verse={currentVerse}
							onCopy={copyVerse}
							copyLabel={t("home.copyVerse")}
						/>

						{/* Link Cards */}
								{mappedLinks.map((link) => (
									<BentoCard
										key={link.href || link.text}
										isDark={isDark}
										icon={link.icon}
										title={link.text}
										description={link.description}
										href={link.href}
										external={link.external}
										// className logic can be improved if needed
									/>
								))}
					</div>

					{/* Footer */}
					<div className="mt-16 text-center">
						<p
							className={`text-xs ${
								isDark ? "text-gray-500" : "text-gray-400"
							}`}
						>
							{t("home.footer", { year: new Date().getFullYear() })}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

// Wrapper para componentes que necesitan tema
function ThemeWrapper({
	children,
}: {
	children: (isDark: boolean, toggleTheme: () => void) => React.ReactNode;
}) {
	const [isDark, setIsDark] = useState(true);

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme === "light") {
			setIsDark(false);
		}
	}, []);

	const toggleTheme = () => {
		const newTheme = !isDark;
		setIsDark(newTheme);
		localStorage.setItem("theme", newTheme ? "dark" : "light");
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
												onNavigateContact={() => {
													window.location.href = "/contacto";
												}}
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
