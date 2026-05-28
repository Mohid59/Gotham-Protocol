/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gotham: {
          void: "#050505",
          ink: "#0a0a0c",
          steel: "#15161a",
          fog: "#7a7d85",
        },
        bat: {
          neon: "#00e5ff",
          crimson: "#ff2a3d",
          toxic: "#9dff00",
          venom: "#ff1744",
          amber: "#ff8c1a",
          rose: "#ff4d8d",
          shadow: "#1e0a0f",
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'IBM Plex Mono', 'Menlo', 'monospace'],
        display: ['"Chakra Petch"', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 8s linear infinite',
        'flicker': 'flicker 2.5s linear infinite',
        'boot-blink': 'boot-blink 1.2s steps(2, start) infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '41.99%': { opacity: '1' },
          '42%': { opacity: '0' },
          '43%': { opacity: '1' },
          '47.99%': { opacity: '1' },
          '48%': { opacity: '0' },
          '49%': { opacity: '1' },
        },
        'boot-blink': {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
      },
      boxShadow: {
        'neon-blue': '0 0 12px rgba(0,229,255,0.65), 0 0 32px rgba(0,229,255,0.25)',
        'neon-red': '0 0 12px rgba(255,42,61,0.65), 0 0 32px rgba(255,42,61,0.25)',
        'neon-toxic': '0 0 12px rgba(157,255,0,0.65), 0 0 32px rgba(157,255,0,0.25)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
