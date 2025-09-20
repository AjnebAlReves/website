import { motion } from "framer-motion";
import type React from "react";

interface VerseBoxProps {
	isDark: boolean;
	verse: string;
	onCopy: () => void;
	copyLabel: string;
}

export const VerseBox: React.FC<VerseBoxProps> = ({
	isDark,
	verse,
	onCopy,
	copyLabel,
}) => {
	return (
		<motion.div
			className={`p-6 rounded-2xl transition-colors duration-300 ${
				isDark
					? "bg-emerald-500/10 border border-emerald-500/20"
					: "bg-emerald-50 border border-emerald-200"
			}`}
			whileHover={{ scale: 1.02 }}
			transition={{ duration: 0.3 }}
		>
			<p
				className={`text-sm italic leading-relaxed ${
					isDark ? "text-emerald-300" : "text-emerald-700"
				}`}
			>
				📖 {verse}
			</p>
			<button
				type="button"
				onClick={onCopy}
				className="text-xs mt-2 underline hover:opacity-80 transition-opacity duration-300"
			>
				{copyLabel}
			</button>
		</motion.div>
	);
};
