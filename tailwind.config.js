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
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: '#f0f9ff',
          500: '#3b82f6', // Main brand blue
          900: '#1e3a8a'
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          500: '#f59e0b', // Audio wave orange
          600: '#d97706'
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          900: '#171717'
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
