/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				dark: '#000000',
				accent: '#fbbf24', // Ámbar (equivalente a amber-400 en Tailwind)
				paraguay: '#dc2626', // Rojo Paraguay
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			spacing: {
				'safe-top': 'max(env(safe-area-inset-top), 1rem)',
				'safe-bottom': 'max(env(safe-area-inset-bottom), 1rem)',
			}
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
