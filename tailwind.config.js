import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    container: {
      center: true,
      screens: {
        md: "52.5rem"
      }
    },
    colors: {
      inherit: 'inherit',
      current: 'currentColor',
      transparent: 'transparent',
      white: 'hsl(0 0% 100% / 1)',
      black: 'hsl(0 0% 0% / 1)',
      accent: 'hsl(259deg 100% 65% / 1)',
      error: 'hsl(0deg 100% 67% / 1)',
      neutral: {
        DEFAULT: "hsl(0deg 0% 44% / 1)",
        100: "hsl(0deg 0% 94% / 1)",
        500: "hsl(0deg 0% 44% / 1)",
        900: "hsl(0deg 0% 8% / 1)",
      }
    },
    borderRadius: {
      "input": ".5rem",
      "container": "1.5rem",
      "container-big": "fluid(6.25rem,12.5rem)"
    },
    fontFamily: {
      sans: 'Poppins, system-ui, sans-serif',
      serif:
        "'Iowan Old Style', 'Palatino Linotype', 'URW Palladio L', P052, serif",
      mono: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace"
    },
    fontSize: {
      "label": ['fluid(.75rem,.875rem)', { letterSpacing: "0.025em", fontWeight: "700", lineHeight: "1.5" }],
      "label-error": ['fluid(.75rem,.875rem)', { lineHeight: "1.5", fontWeight: "400" }],
      "input": ['fluid(1.25rem,2rem)', { fontWeight: "700", lineHeight: "1" }],
      "output": ['fluid(3.375rem,6.25rem)', { lineHeight: "1.125", fontWeight: "800" }],
    },
    extend: {},
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('hocus', ['&:hover', '&:focus'])
      addVariant('hocus-visible', ['&:hover', '&:focus-visible'])
    }),
  ],
}