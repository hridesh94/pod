<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Hridesh Sapkota's Podcast Producer Portfolio Website

This is a Next.js 14 project with TypeScript and Tailwind CSS for a podcast producer portfolio website.

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- Headless UI + Radix UI for components
- Sanity CMS for content management

## Design System
The design system follows these key specifications:

### Colors
```typescript
const colors = {
  primary: {
    50: '#f0f9ff',
    500: '#3b82f6',  // Main brand blue
    900: '#1e3a8a'
  },
  accent: {
    500: '#f59e0b',  // Audio wave orange
    600: '#d97706'
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    900: '#171717'
  }
}
```

### Typography
```typescript
const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    display: ['Poppins', 'system-ui', 'sans-serif']
  },
  fontSize: {
    'hero': ['4rem', { lineHeight: '1.1' }],
    'display': ['3rem', { lineHeight: '1.2' }],
    'heading': ['2rem', { lineHeight: '1.3' }],
    'subheading': ['1.25rem', { lineHeight: '1.4' }]
  }
}
```

### Spacing
```typescript
const spacing = {
  section: '6rem',      // Between major sections
  component: '3rem',    // Between components
  element: '1.5rem',    // Between elements
  micro: '0.5rem'       // Small gaps
}
```

## Animation Guidelines
- Use Framer Motion for all animations
- Implement smooth page transitions
- Use scroll-triggered animations for sections
- Add hover effects on interactive elements
- Include loading states with skeleton screens
- Implement micro-interactions on form elements
- Create audio waveform visualizations
- Use parallax scrolling effects where appropriate
