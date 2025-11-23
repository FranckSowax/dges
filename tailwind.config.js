/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gabon: {
          green: {
            DEFAULT: '#009A44',
            light: '#E6F5EB',
            dark: '#007A35'
          },
          yellow: {
            DEFAULT: '#FCD116',
            light: '#FFFAE6',
            dark: '#E5BC00'
          },
          blue: {
            DEFAULT: '#3A75C4',
            light: '#EBF2FA',
            dark: '#2A5A9E'
          }
        },
        neutral: {
          black: '#1A1A1A',
          'gray-dark': '#4A5568',
          'gray-light': '#E2E8F0',
          background: '#F9FAFB'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '16px',
        'card-lg': '24px',
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 10px 20px rgba(0, 0, 0, 0.1)',
      },
      spacing: {
        'section': '96px',
      }
    },
  },
  plugins: [],
}
