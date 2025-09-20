// Animation utility classes for consistent transitions
export const pageTransitionClasses = {
	enter: "animate-fadeIn",
	exit: "animate-fadeOut",
};

export const hoverTransitionClasses = {
	scale: "transition-transform duration-300 hover:scale-105",
	glow: "transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20",
	lift: "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
};

export const scrollAnimationClasses = {
	fadeUp: "animate-fadeInUp",
	fadeIn: "animate-fadeIn",
	stagger: (index: number) =>
		`animate-fadeIn opacity-0 animation-delay-${index * 100}`,
};
