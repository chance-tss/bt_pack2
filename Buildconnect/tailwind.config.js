/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}",
        "!./node_modules",
    ],
    theme: {
        extend: {
            colors: {
                marron: {
                    50: '#fdf8f6',
                    100: '#f2e8e5',
                    200: '#eaddd7',
                    300: '#e0cec7',
                    400: '#d2bab0',
                    500: '#bfa094',
                    600: '#a18072',
                    700: '#846358',
                    800: '#432818',
                    900: '#2b1a10',
                },
                rouge: {
                    50: '#fef2f2',
                    DEFAULT: '#991b1b',
                    dark: '#7f1d1d',
                },
                champagne: {
                    DEFAULT: '#f7e7ce',
                    light: '#fff9f0',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
