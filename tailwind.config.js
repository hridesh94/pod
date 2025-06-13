/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#102E50",
          foreground: "#FFFFFF",
          50: '#E6EDF4',
          100: '#CCDAE9',
          200: '#99B5D3',
          300: '#6690BD',
          400: '#336BA7',
          500: '#102E50', // New primary blue
          600: '#0D2541',
          700: '#0A1C32',
          800: '#071323',
          900: '#030914'
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "#BE3D2A",
          foreground: "#FFFFFF",
          50: '#F9E8E5',
          100: '#F3D1CC',
          200: '#E7A399',
          300: '#DB7566',
          400: '#CF4733',
          500: '#BE3D2A', // New accent orange
          600: '#983122',
          700: '#722519',
          800: '#4C1811',
          900: '#260C08'
        },
        neutral: {
          50: '#F9F9F9',
          100: '#F2F2F2',
          200: '#E6E6E6',
          300: '#D9D9D9',
          400: '#CCCCCC',
          500: '#B3B3B3',
          600: '#8C8C8C',
          700: '#666666',
          800: '#404040',
          900: '#1A1A1A'
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"]
      },
      fontSize: {
        'hero': ['4rem', { lineHeight: '1.1' }],
        'display': ['3rem', { lineHeight: '1.2' }],
        'heading': ['2rem', { lineHeight: '1.3' }],
        'subheading': ['1.25rem', { lineHeight: '1.4' }]
      },
      spacing: {
        section: '6rem',      // Between major sections
        component: '3rem',    // Between components
        element: '1.5rem',    // Between elements
        micro: '0.5rem'       // Small gaps
      }
    }
  },
  plugins: []
}
