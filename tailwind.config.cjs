/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},
	daisyui: {
		themes: [
			{
				light: {
					...require('daisyui/src/theming/themes')['[data-theme=light]'],
					primary: '#00AEFF',
					'primary-content': '#ffffff',
					secondary: '#00E5FF',
					'secondary-content': '#000000',
					accent: '#003F60',
					'accent-content': '#A6ADBB',
					neutral: '#777C82',
					'neutral-focus': '#242b33',
					'neutral-content': '#e9eaea',
					'base-100': '#ebfbe7',
					'base-200': '#F9FDF7',
					'base-300': '#ffffff',
					'base-content': '#282825'
				}
			}
		]
	},

	plugins: [require("daisyui")]
};

module.exports = config;
