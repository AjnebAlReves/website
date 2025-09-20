import type { Variants } from "framer-motion";

export const fadeInUpVariants: Variants = {
	initial: {
		opacity: 0,
		y: 20,
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: "easeOut",
		},
	},
	exit: {
		opacity: 0,
		y: -20,
		transition: {
			duration: 0.3,
			ease: "easeIn",
		},
	},
};

export const floatVariants: Variants = {
	initial: { y: 0 },
	animate: {
		y: [-5, 5],
		transition: {
			y: {
				duration: 2,
				repeat: Infinity,
				repeatType: "reverse",
				ease: "easeInOut",
			},
		},
	},
};

export const pulseVariants: Variants = {
	initial: { scale: 1 },
	animate: {
		scale: [1, 1.05, 1],
		transition: {
			scale: {
				duration: 1.5,
				repeat: Infinity,
				repeatType: "reverse",
				ease: "easeInOut",
			},
		},
	},
};

export const staggerContainer: Variants = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

export const staggerItem: Variants = {
	initial: { opacity: 0, y: 20 },
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: "easeOut",
		},
	},
};

export const glowVariants: Variants = {
	initial: { opacity: 1 },
	animate: {
		boxShadow: [
			"0 0 20px rgba(59, 130, 246, 0.3)",
			"0 0 40px rgba(59, 130, 246, 0.5)",
			"0 0 20px rgba(59, 130, 246, 0.3)",
		],
		transition: {
			duration: 2,
			repeat: Infinity,
			repeatType: "mirror",
			ease: "easeInOut",
		},
	},
};
