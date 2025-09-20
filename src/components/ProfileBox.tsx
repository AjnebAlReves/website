import { motion } from "framer-motion";
import type React from "react";

interface ProfileBoxProps {
	isDark: boolean;
	avatarUrl: string;
	title: string;
	description: string;
}

export const ProfileBox: React.FC<ProfileBoxProps> = ({
	isDark,
	avatarUrl,
	title,
	description,
}) => {
	return (
		<motion.div
			className={`col-span-2 p-6 rounded-2xl ${
				isDark
					? "bg-white/5 border border-white/10"
					: "bg-white border border-gray-200"
			}`}
			whileHover={{ scale: 1.01 }}
			transition={{ duration: 0.3 }}
		>
			<div className="flex items-center gap-6">
				<div className="relative">
					<div
						className={`absolute inset-0 rounded-full blur-xl opacity-30 ${
							isDark ? "bg-emerald-400" : "bg-emerald-500"
						}`}
					/>
					<motion.img
						src={avatarUrl}
						alt="Profile"
						className="relative w-32 h-32 rounded-full shadow-2xl border-4 border-white/20"
						whileHover={{ scale: 1.05 }}
						transition={{ duration: 0.3 }}
					/>
				</div>
				<div className="flex-1">
					<h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
						{title}
					</h1>
					<p
						className={`text-sm leading-relaxed ${
							isDark ? "text-gray-300" : "text-gray-600"
						}`}
					>
						{description}
					</p>
				</div>
			</div>
		</motion.div>
	);
};
