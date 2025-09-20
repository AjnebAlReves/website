import { motion } from "framer-motion";
import type React from "react";
import { Link } from "react-router-dom";
import { ErrorBoundary, ErrorFallback } from "./ErrorBoundary";

interface BentoCardProps {
	className?: string;
	icon?: React.ReactNode | null;
	title: string;
	description?: string;
	href?: string;
	external?: boolean;
	isDark: boolean;
	onClick?: () => void;
	children?: React.ReactNode;
}

export const BentoCard: React.FC<BentoCardProps> = ({
	className = "",
	icon,
	title,
	description,
	href,
	external,
	isDark,
	onClick,
	children,
}) => {
	const Content = (
		<div className="flex items-start gap-4">
			{icon && (
				<motion.div
					whileHover={{ y: -3 }}
					transition={{ duration: 0.3 }}
					className={`p-2 rounded-xl ${
						isDark ? "bg-white/10" : "bg-gray-100"
					} group-hover:scale-110 transition-transform duration-300`}
				>
					{icon}
				</motion.div>
			)}
			<div className="flex-1">
				<h3 className="font-semibold text-base mb-1">{title}</h3>
				{description && (
					<p
						className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
					>
						{description}
					</p>
				)}
				{children}
			</div>
			{href && (
				<div
					className={`text-2xl opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 ${
						isDark ? "text-white" : "text-gray-600"
					}`}
				>
					→
				</div>
			)}
		</div>
	);

	if (href) {
		if (external) {
			return (
				<ErrorBoundary
					fallback={
						<ErrorFallback
							error={
								new Error("Hubo un error durante la compilación del código")
							}
						/>
					}
				>
					<motion.a
						href={href}
						target="_blank"
						rel="noopener noreferrer"
						className={`block p-4 h-full ${className}`}
						whileHover={{ scale: 1.02 }}
						transition={{ duration: 0.3 }}
					>
						{Content}
					</motion.a>
				</ErrorBoundary>
			);
		}
		return (
			<ErrorBoundary
				fallback={
					<ErrorFallback
						error={new Error("Hubo un error durante la compilación del código")}
					/>
				}
			>
				<Link to={href} className={`block p-4 h-full ${className}`}>
					<motion.div
						whileHover={{ scale: 1.02 }}
						transition={{ duration: 0.3 }}
					>
						{Content}
					</motion.div>
				</Link>
			</ErrorBoundary>
		);
	}

	return (
		<ErrorBoundary
			fallback={
				<ErrorFallback
					error={new Error("Hubo un error durante la compilación del código")}
				/>
			}
		>
			<motion.div
				onClick={onClick}
				className={`block p-4 h-full ${className}`}
				whileHover={{ scale: 1.02 }}
				transition={{ duration: 0.3 }}
			>
				{Content}
			</motion.div>
		</ErrorBoundary>
	);
};
