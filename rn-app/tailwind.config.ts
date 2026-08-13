import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "on-tertiary-container": "#be8b14",
        "on-error-container": "#93000a",
        "on-surface-variant": "#504442",
        "primary-fixed-dim": "#e3beb8",
        "surface-variant": "#e2e2e2",
        "secondary": "#546067",
        "on-background": "#1a1c1c",
        "on-primary": "#ffffff",
        "on-primary-container": "#ae8d87",
        "inverse-surface": "#2f3131",
        "on-primary-fixed": "#2b1613",
        "secondary-fixed-dim": "#bbc8d0",
        "surface": "#f9f9f9",
        "primary-fixed": "#ffdad4",
        "on-surface": "#1a1c1c",
        "primary-container": "#3e2723",
        "inverse-primary": "#e3beb8",
        "surface-tint": "#745853",
        "surface-container": "#eeeeee",
        "secondary-container": "#d7e4ec",
        "secondary-fixed": "#d7e4ec",
        "tertiary-fixed-dim": "#f7bd48",
        "tertiary-container": "#3c2900",
        "on-tertiary-fixed-variant": "#5d4200",
        "surface-dim": "#dadada",
        "on-secondary-fixed-variant": "#3c494f",
        "inverse-on-surface": "#f0f1f1",
        "on-tertiary": "#ffffff",
        "error-container": "#ffdad6",
        "surface-container-low": "#f3f3f3",
        "outline": "#827472",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#5a666d",
        "on-secondary-fixed": "#111d23",
        "on-tertiary-fixed": "#271900",
        "outline-variant": "#d3c3c0",
        "primary": "#271310",
        "surface-bright": "#f9f9f9",
        "tertiary-fixed": "#ffdea6",
        "tertiary": "#221600",
        "surface-container-high": "#e8e8e8",
        "background": "#f9f9f9",
        "error": "#ba1a1a",
        "on-error": "#ffffff",
        "surface-container-highest": "#e2e2e2",
        "surface-container-lowest": "#ffffff",
        "on-primary-fixed-variant": "#5b403c"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "gutter": "24px",
        "margin-mobile": "16px",
        "base": "8px",
        "margin-desktop": "64px",
        "max-width": "1440px"
      },
      fontFamily: {
        "headline-lg": ["var(--font-montserrat)", "sans-serif"],
        "body-lg": ["var(--font-inter)", "sans-serif"],
        "body-md": ["var(--font-inter)", "sans-serif"],
        "label-md": ["var(--font-inter)", "sans-serif"],
        "headline-display": ["var(--font-montserrat)", "sans-serif"],
        "headline-lg-mobile": ["var(--font-montserrat)", "sans-serif"],
        "headline-md": ["var(--font-montserrat)", "sans-serif"],
        "label-sm": ["var(--font-inter)", "sans-serif"]
      },
      fontSize: {
        "headline-lg": ["40px", { "lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "700" }],
        "body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "400" }],
        "body-md": ["16px", { "lineHeight": "1.6", "fontWeight": "400" }],
        "label-md": ["14px", { "lineHeight": "1.2", "letterSpacing": "0.05em", "fontWeight": "600" }],
        "headline-display": ["64px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "headline-lg-mobile": ["32px", { "lineHeight": "1.2", "fontWeight": "700" }],
        "headline-md": ["24px", { "lineHeight": "1.3", "fontWeight": "600" }],
        "label-sm": ["12px", { "lineHeight": "1.2", "fontWeight": "500" }]
      },
      keyframes: {
        'scale-up': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'fade-in-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      animation: {
        'scale-up': 'scale-up 1.5s ease-out forwards',
        'fade-in-up': 'fade-in-up 1s ease-out forwards',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
};
export default config;
