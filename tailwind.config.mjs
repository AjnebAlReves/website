/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				dark: '#050505',
				accent: '#ffcc00', // Ámbar Flyx
				paraguay: '#d52b1e', // Un rojo sutil para detalles
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			}
		},
	},
	plugins: [],
}
